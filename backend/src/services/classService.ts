import { prisma } from "./prisma";
import { livekitService } from "./livekitService";
import { recordingService } from "./recordingService";
import { notificationService } from "./notificationService";
import { settingService } from "./settingService";
import { NotFoundError, ForbiddenError, BadRequestError } from "../utils/errors";
import { Prisma } from "@prisma/client";
import { ClassStatus, Role } from "../types/enums";
import { logger } from "../utils/logger";

export class ClassService {
  /**
   * Schedules a new class session
   */
  async createClass(data: {
    title: string;
    description?: string;
    courseId: string;
    batchId: string;
    instructorId: string;
    startTime: Date;
    endTime: Date;
    timezone?: string;
    recordingEnabled?: boolean;
  }) {
    const tz = data.timezone || (await settingService.getAcademyTimezone());
    const uniqueSuffix = Math.random().toString(36).substring(2, 8);
    const roomName = `flight_${data.batchId.slice(-4)}_${Date.now()}_${uniqueSuffix}`;

    return prisma.classSession.create({
      data: {
        ...data,
        timezone: tz,
        roomName,
        status: ClassStatus.SCHEDULED,
        recordingEnabled: data.recordingEnabled ?? true,
      },
      include: {
        course: { select: { id: true, title: true, code: true } },
        batch: { select: { id: true, name: true } },
        instructor: { select: { id: true, name: true, email: true } },
      },
    });
  }

  /**
   * Starts a class (Instructor or Admin only)
   * Triggers LiveKit room activation and recording initialization
   */
  async startClass(classId: string, userId: string, role: Role) {
    const classSession = await prisma.classSession.findUnique({
      where: { id: classId },
      include: { course: true, batch: true, instructor: true },
    });

    if (!classSession) {
      throw new NotFoundError("Class session not found");
    }

    if (role === Role.INSTRUCTOR && classSession.instructorId !== userId) {
      throw new ForbiddenError("You are not the designated instructor for this class.");
    }

    if (classSession.status === ClassStatus.COMPLETED) {
      throw new BadRequestError("This class has already been completed.");
    }

    // 1. Update class status to LIVE
    const updatedClass = await prisma.classSession.update({
      where: { id: classId },
      data: { status: ClassStatus.LIVE },
    });

    // 2. If recording is enabled, initialize recording entry & trigger LiveKit Egress
    if (classSession.recordingEnabled) {
      try {
        const recording = await recordingService.initializeRecording(classId);
        if (recording.storageKey) {
          const egressId = await livekitService.startRoomRecording(
            classSession.roomName,
            recording.storageKey
          );
          if (egressId) {
            await prisma.recording.update({
              where: { id: recording.id },
              data: { externalRecordingId: egressId, status: "RECORDING" },
            });
          }
        }
      } catch (err) {
        logger.error("Failed to automatically start recording on class launch", err);
      }
    }

    // 3. Notify batch students that class is now LIVE
    await notificationService.notifyBatchStudents(
      classSession.batchId,
      "CLASS_STARTING",
      `Class is LIVE: ${classSession.title}`,
      `Your instructor ${classSession.instructor.name} has started "${classSession.title}". Join now!`,
      `/classroom/${classSession.id}`
    );

    return updatedClass;
  }

  /**
   * Ends a class (Instructor or Admin only)
   */
  async endClass(classId: string, userId: string, role: Role) {
    const classSession = await prisma.classSession.findUnique({
      where: { id: classId },
      include: { recordings: true },
    });

    if (!classSession) {
      throw new NotFoundError("Class session not found");
    }

    if (role === Role.INSTRUCTOR && classSession.instructorId !== userId) {
      throw new ForbiddenError("You are not authorized to end this class.");
    }

    // 1. Close LiveKit room
    await livekitService.closeRoom(classSession.roomName);

    // 2. Mark active recording as PROCESSING
    const activeRecording = classSession.recordings.find(
      (r) => r.status === "RECORDING" || r.status === "SCHEDULED"
    );
    if (activeRecording) {
      await prisma.recording.update({
        where: { id: activeRecording.id },
        data: { status: "PROCESSING" },
      });
    }

    // 3. Mark class as COMPLETED
    const updatedClass = await prisma.classSession.update({
      where: { id: classId },
      data: { status: ClassStatus.COMPLETED },
    });

    return updatedClass;
  }

  /**
   * Authorizes and generates LiveKit participant token for joining classroom
   */
  async getJoinToken(classId: string, user: { id: string; name: string; role: Role }) {
    const classSession = await prisma.classSession.findUnique({
      where: { id: classId },
      include: {
        batch: true,
        instructor: { select: { id: true, name: true } },
      },
    });

    if (!classSession) {
      throw new NotFoundError("Class session not found");
    }

    if (classSession.status === ClassStatus.CANCELLED) {
      throw new BadRequestError("This class has been cancelled.");
    }

    // Student authorization and join window check
    if (user.role === Role.STUDENT) {
      const enrollment = await prisma.enrollment.findUnique({
        where: {
          studentId_batchId: {
            studentId: user.id,
            batchId: classSession.batchId,
          },
        },
      });

      if (!enrollment || enrollment.status !== "ACTIVE") {
        throw new ForbiddenError("You are not enrolled in the batch for this class session.");
      }

      // Check Join Window (configurable, e.g. 15 mins prior)
      const joinWindowMinutes = parseInt(
        (await settingService.getAllSettings())["classJoinWindowMinutes"] || "15",
        10
      );
      const earliestJoinTime = new Date(
        classSession.startTime.getTime() - joinWindowMinutes * 60 * 1000
      );
      const now = new Date();

      if (classSession.status === ClassStatus.SCHEDULED && now < earliestJoinTime) {
        throw new BadRequestError(
          `Classroom opens ${joinWindowMinutes} minutes before scheduled start time.`
        );
      }
    } else if (user.role === Role.INSTRUCTOR) {
      if (classSession.instructorId !== user.id) {
        throw new ForbiddenError("You are not assigned as the instructor for this class.");
      }
    }

    // Generate participant token
    const token = await livekitService.createParticipantToken({
      roomName: classSession.roomName,
      participantIdentity: user.id,
      participantName: user.name,
      role: user.role,
      classSessionId: classSession.id,
    });

    return {
      token,
      roomName: classSession.roomName,
      livekitUrl: process.env.LIVEKIT_URL || "https://livekit.example.com",
      classSession: {
        id: classSession.id,
        title: classSession.title,
        status: classSession.status,
        recordingEnabled: classSession.recordingEnabled,
        instructorName: classSession.instructor.name,
      },
    };
  }

  /**
   * Retrieves class list with filters
   */
  async getClasses(params: {
    courseId?: string;
    batchId?: string;
    instructorId?: string;
    status?: ClassStatus;
    page?: number;
    limit?: number;
  }) {
    const page = params.page || 1;
    const limit = params.limit || 20;
    const skip = (page - 1) * limit;

    const where: Prisma.ClassSessionWhereInput = {};
    if (params.courseId) where.courseId = params.courseId;
    if (params.batchId) where.batchId = params.batchId;
    if (params.instructorId) where.instructorId = params.instructorId;
    if (params.status) where.status = params.status;

    const [total, classes] = await Promise.all([
      prisma.classSession.count({ where }),
      prisma.classSession.findMany({
        where,
        skip,
        take: limit,
        orderBy: { startTime: "asc" },
        include: {
          course: { select: { id: true, title: true, code: true } },
          batch: { select: { id: true, name: true } },
          instructor: { select: { id: true, name: true, email: true } },
          recordings: {
            select: {
              id: true,
              status: true,
              availableAt: true,
              expiresAt: true,
              durationSeconds: true,
            },
          },
        },
      }),
    ]);

    return {
      classes,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}

export const classService = new ClassService();
export default classService;
