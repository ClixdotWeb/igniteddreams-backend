import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const Role = {
  ADMIN: "ADMIN",
  INSTRUCTOR: "INSTRUCTOR",
  STUDENT: "STUDENT",
} as const;

const UserStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  SUSPENDED: "SUSPENDED",
} as const;

const CourseStatus = {
  DRAFT: "DRAFT",
  PUBLISHED: "PUBLISHED",
  ARCHIVED: "ARCHIVED",
} as const;

const BatchStatus = {
  UPCOMING: "UPCOMING",
  ACTIVE: "ACTIVE",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;

const ClassStatus = {
  SCHEDULED: "SCHEDULED",
  LIVE: "LIVE",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;

const RecordingStatus = {
  SCHEDULED: "SCHEDULED",
  LIVE: "LIVE",
  RECORDING: "RECORDING",
  PROCESSING: "PROCESSING",
  READY: "READY",
  EXPIRING_SOON: "EXPIRING_SOON",
  EXPIRED: "EXPIRED",
  DELETING: "DELETING",
  DELETED: "DELETED",
  FAILED: "FAILED",
} as const;

const AttendanceStatus = {
  PRESENT: "PRESENT",
  ABSENT: "ABSENT",
  PARTIAL: "PARTIAL",
} as const;

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding IgnitedDreams Aviation Academy database...");

  // 1. Initialize Platform Settings
  await prisma.setting.upsert({
    where: { key: "recordingRetentionDays" },
    update: { value: "7" },
    create: { key: "recordingRetentionDays", value: "7", description: "Default recording retention period in days" },
  });

  await prisma.setting.upsert({
    where: { key: "academyName" },
    update: { value: "IgnitedDreams Aviation Academy" },
    create: { key: "academyName", value: "IgnitedDreams Aviation Academy", description: "Official academy brand name" },
  });

  await prisma.setting.upsert({
    where: { key: "academyTimezone" },
    update: { value: "Asia/Kolkata" },
    create: { key: "academyTimezone", value: "Asia/Kolkata", description: "Standard academy operational timezone" },
  });

  await prisma.setting.upsert({
    where: { key: "classJoinWindowMinutes" },
    update: { value: "15" },
    create: { key: "classJoinWindowMinutes", value: "15", description: "Minutes before scheduled start time students can join" },
  });

  // Common hashed passwords
  const adminPasswordHash = await bcrypt.hash("AdminPassword2026!", 12);
  const instructorPasswordHash = await bcrypt.hash("InstructorPass2026!", 12);
  const studentPasswordHash = await bcrypt.hash("StudentPass2026!", 12);

  // 2. Create Admin User
  const admin = await prisma.user.upsert({
    where: { email: "admin@igniteddreams.com" },
    update: {},
    create: {
      name: "Academy Director",
      email: "admin@igniteddreams.com",
      phone: "+91 98765 43210",
      passwordHash: adminPasswordHash,
      role: Role.ADMIN,
      status: UserStatus.ACTIVE,
    },
  });

  // 3. Create Instructors
  const instructor1 = await prisma.user.upsert({
    where: { email: "instructor1@igniteddreams.com" },
    update: {},
    create: {
      name: "Capt. Vikram Malhotra",
      email: "instructor1@igniteddreams.com",
      phone: "+91 98765 11111",
      passwordHash: instructorPasswordHash,
      role: Role.INSTRUCTOR,
      status: UserStatus.ACTIVE,
      instructorProfile: {
        create: {
          employeeId: "INS-1001",
          specialization: "Chief Ground Instructor & Air Navigation",
          bio: "Senior airline pilot and flight instructor with over 6,500 flight hours and 12 years of ground school instruction.",
        },
      },
    },
  });

  const instructor2 = await prisma.user.upsert({
    where: { email: "instructor2@igniteddreams.com" },
    update: {},
    create: {
      name: "Capt. Ananya Roy",
      email: "instructor2@igniteddreams.com",
      phone: "+91 98765 22222",
      passwordHash: instructorPasswordHash,
      role: Role.INSTRUCTOR,
      status: UserStatus.ACTIVE,
      instructorProfile: {
        create: {
          employeeId: "INS-1002",
          specialization: "Aviation Meteorology & Radio Telephony",
          bio: "Former commercial airline first officer and ATPL ground theory specialist.",
        },
      },
    },
  });

  // 4. Create Students
  const student1 = await prisma.user.upsert({
    where: { email: "rahul.sharma@example.com" },
    update: {},
    create: {
      name: "Rahul Sharma",
      email: "rahul.sharma@example.com",
      phone: "+91 91234 56789",
      passwordHash: studentPasswordHash,
      role: Role.STUDENT,
      status: UserStatus.ACTIVE,
      studentProfile: {
        create: {
          registrationNumber: "AV-2026-101",
        },
      },
    },
  });

  const student2 = await prisma.user.upsert({
    where: { email: "priya.patel@example.com" },
    update: {},
    create: {
      name: "Priya Patel",
      email: "priya.patel@example.com",
      phone: "+91 92345 67890",
      passwordHash: studentPasswordHash,
      role: Role.STUDENT,
      status: UserStatus.ACTIVE,
      studentProfile: {
        create: {
          registrationNumber: "AV-2026-102",
        },
      },
    },
  });

  const student3 = await prisma.user.upsert({
    where: { email: "rohan.verma@example.com" },
    update: {},
    create: {
      name: "Rohan Verma",
      email: "rohan.verma@example.com",
      phone: "+91 93456 78901",
      passwordHash: studentPasswordHash,
      role: Role.STUDENT,
      status: UserStatus.ACTIVE,
      studentProfile: {
        create: {
          registrationNumber: "AV-2026-103",
        },
      },
    },
  });

  // 5. Create Courses
  const courseCPL = await prisma.course.upsert({
    where: { slug: "cpl-ground-school" },
    update: {},
    create: {
      title: "Commercial Pilot Ground School (CPL Theory)",
      slug: "cpl-ground-school",
      code: "AV-CPL-101",
      description: "Comprehensive theoretical ground instruction covering Air Navigation, Meteorology, Air Regulations, and Technical General for aspiring commercial aviators.",
      status: CourseStatus.PUBLISHED,
      durationHours: 120,
    },
  });

  const coursePPL = await prisma.course.upsert({
    where: { slug: "ppl-ground-school" },
    update: {},
    create: {
      title: "Private Pilot License Theory (PPL Ground)",
      slug: "ppl-ground-school",
      code: "AV-PPL-101",
      description: "Foundational aviation ground school covering flight principles, cockpit instrumentation, weather basics, and flight safety for private aviators.",
      status: CourseStatus.PUBLISHED,
      durationHours: 60,
    },
  });

  const courseMET = await prisma.course.upsert({
    where: { slug: "aviation-meteorology" },
    update: {},
    create: {
      title: "Aviation Meteorology & Weather Radar",
      slug: "aviation-meteorology",
      code: "AV-MET-201",
      description: "Master atmospheric dynamics, high altitude jet streams, convective hazards, METAR/TAF decoding, and onboard radar interpretation.",
      status: CourseStatus.PUBLISHED,
      durationHours: 45,
    },
  });

  // 6. Create Batches
  const batchAlpha = await prisma.batch.upsert({
    where: { code: "CPL-2026-ALPHA" },
    update: {},
    create: {
      name: "CPL Ground School - Batch Alpha",
      code: "CPL-2026-ALPHA",
      courseId: courseCPL.id,
      instructorId: instructor1.id,
      startDate: new Date("2026-09-01"),
      endDate: new Date("2026-12-15"),
      status: BatchStatus.ACTIVE,
    },
  });

  const batchBravo = await prisma.batch.upsert({
    where: { code: "PPL-2026-BRAVO" },
    update: {},
    create: {
      name: "PPL Ground Theory - Batch Bravo",
      code: "PPL-2026-BRAVO",
      courseId: coursePPL.id,
      instructorId: instructor2.id,
      startDate: new Date("2026-09-15"),
      endDate: new Date("2026-11-30"),
      status: BatchStatus.ACTIVE,
    },
  });

  // 7. Enroll Students
  await prisma.enrollment.upsert({
    where: { studentId_batchId: { studentId: student1.id, batchId: batchAlpha.id } },
    update: {},
    create: {
      studentId: student1.id,
      batchId: batchAlpha.id,
      courseId: courseCPL.id,
      status: "ACTIVE",
    },
  });

  await prisma.enrollment.upsert({
    where: { studentId_batchId: { studentId: student2.id, batchId: batchAlpha.id } },
    update: {},
    create: {
      studentId: student2.id,
      batchId: batchAlpha.id,
      courseId: courseCPL.id,
      status: "ACTIVE",
    },
  });

  await prisma.enrollment.upsert({
    where: { studentId_batchId: { studentId: student3.id, batchId: batchBravo.id } },
    update: {},
    create: {
      studentId: student3.id,
      batchId: batchBravo.id,
      courseId: coursePPL.id,
      status: "ACTIVE",
    },
  });

  // 8. Create Class Sessions & Lifecycle Recordings
  const now = new Date();

  // A) Currently LIVE class
  const liveClass = await prisma.classSession.upsert({
    where: { roomName: "flight_cpl_live_alpha" },
    update: {},
    create: {
      title: "Air Navigation: Cross-Country Flight Planning & Dead Reckoning",
      description: "Interactive live calculation of track, true airspeed, wind drift corrections, and fuel burn reserves.",
      courseId: courseCPL.id,
      batchId: batchAlpha.id,
      instructorId: instructor1.id,
      startTime: new Date(now.getTime() - 25 * 60 * 1000), // Started 25 mins ago
      endTime: new Date(now.getTime() + 65 * 60 * 1000), // Ends in 65 mins
      timezone: "Asia/Kolkata",
      roomName: "flight_cpl_live_alpha",
      status: ClassStatus.LIVE,
      recordingEnabled: true,
      recordings: {
        create: {
          provider: "LIVEKIT_EGRESS",
          storageProvider: "CLOUDFLARE_R2",
          storageKey: `recordings/${courseCPL.id}/${batchAlpha.id}/live/cpl-nav-live.mp4`,
          fileName: "CPL_Air_Navigation_Live.mp4",
          status: RecordingStatus.RECORDING,
          durationSeconds: 1500,
        },
      },
    },
  });

  // B) Scheduled upcoming class today
  await prisma.classSession.upsert({
    where: { roomName: "flight_cpl_sched_today" },
    update: {},
    create: {
      title: "Radio Telephony & Transponder Squawk Procedures",
      description: "Standard ATC phraseology, non-controlled airfield reporting, and emergency frequency 121.500 protocols.",
      courseId: courseCPL.id,
      batchId: batchAlpha.id,
      instructorId: instructor2.id,
      startTime: new Date(now.getTime() + 4 * 60 * 60 * 1000), // in 4 hours
      endTime: new Date(now.getTime() + 6 * 60 * 60 * 1000),
      timezone: "Asia/Kolkata",
      roomName: "flight_cpl_sched_today",
      status: ClassStatus.SCHEDULED,
      recordingEnabled: true,
    },
  });

  // C) Completed class 2 days ago (READY recording - 5 days remaining before 7-day expiration)
  const completed2DaysAgo = await prisma.classSession.upsert({
    where: { roomName: "flight_cpl_comp_2days" },
    update: {},
    create: {
      title: "Principles of Flight: High Lift Devices & Stalls",
      description: "Boundary layer physics, trailing-edge flaps, leading-edge slats, and dynamic aerodynamic stall recovery.",
      courseId: courseCPL.id,
      batchId: batchAlpha.id,
      instructorId: instructor1.id,
      startTime: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
      endTime: new Date(now.getTime() - (2 * 24 * 60 - 90) * 60 * 1000),
      timezone: "Asia/Kolkata",
      roomName: "flight_cpl_comp_2days",
      status: ClassStatus.COMPLETED,
      recordingEnabled: true,
      recordings: {
        create: {
          provider: "LIVEKIT_EGRESS",
          storageProvider: "CLOUDFLARE_R2",
          storageKey: `recordings/${courseCPL.id}/${batchAlpha.id}/comp2/principles-of-flight.mp4`,
          fileName: "CPL_Principles_Of_Flight_Stalls.mp4",
          fileSize: BigInt(348120000), // ~332 MB
          durationSeconds: 5240,
          status: RecordingStatus.READY,
          availableAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
          // Available + 7 days
          expiresAt: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000),
          playbackEnabled: true,
          downloadEnabled: true,
        },
      },
      attendances: {
        create: [
          {
            studentId: student1.id,
            joinedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
            leftAt: new Date(now.getTime() - (2 * 24 * 60 - 90) * 60 * 1000),
            durationSeconds: 5400,
            status: AttendanceStatus.PRESENT,
          },
          {
            studentId: student2.id,
            joinedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
            leftAt: new Date(now.getTime() - (2 * 24 * 60 - 85) * 60 * 1000),
            durationSeconds: 5100,
            status: AttendanceStatus.PRESENT,
          },
        ],
      },
    },
  });

  // D) Completed class 6 days ago (EXPIRING SOON - less than 24 hours left before deletion!)
  await prisma.classSession.upsert({
    where: { roomName: "flight_cpl_comp_6days" },
    update: {},
    create: {
      title: "Meteorology: Convective Thunderstorms & Low-Level Windshear",
      description: "Microburst hazards, squall line development, airborne weather radar detection and escape maneuvers.",
      courseId: courseCPL.id,
      batchId: batchAlpha.id,
      instructorId: instructor2.id,
      startTime: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000),
      endTime: new Date(now.getTime() - (6 * 24 * 60 - 80) * 60 * 1000),
      timezone: "Asia/Kolkata",
      roomName: "flight_cpl_comp_6days",
      status: ClassStatus.COMPLETED,
      recordingEnabled: true,
      recordings: {
        create: {
          provider: "LIVEKIT_EGRESS",
          storageProvider: "CLOUDFLARE_R2",
          storageKey: `recordings/${courseCPL.id}/${batchAlpha.id}/comp6/met-thunderstorms.mp4`,
          fileName: "CPL_Met_Convective_Hazards.mp4",
          fileSize: BigInt(295000000), // ~281 MB
          durationSeconds: 4800,
          status: RecordingStatus.EXPIRING_SOON,
          availableAt: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000),
          // Expires in ~18 hours!
          expiresAt: new Date(now.getTime() + 18 * 60 * 60 * 1000),
          playbackEnabled: true,
          downloadEnabled: true,
        },
      },
      attendances: {
        create: [
          {
            studentId: student1.id,
            joinedAt: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000),
            leftAt: new Date(now.getTime() - (6 * 24 * 60 - 80) * 60 * 1000),
            durationSeconds: 4800,
            status: AttendanceStatus.PRESENT,
          },
        ],
      },
    },
  });

  // E) Completed class 9 days ago (EXPIRED & DELETED - R2 object cleaned up, playback disabled)
  await prisma.classSession.upsert({
    where: { roomName: "flight_cpl_comp_9days" },
    update: {},
    create: {
      title: "Altimetry & Pressure Settings (QNH, QFE, Standard 1013.25)",
      description: "Pressure altitude, density altitude calculation, transition altitude and altimeter sub-scale setting errors.",
      courseId: courseCPL.id,
      batchId: batchAlpha.id,
      instructorId: instructor1.id,
      startTime: new Date(now.getTime() - 9 * 24 * 60 * 60 * 1000),
      endTime: new Date(now.getTime() - (9 * 24 * 60 - 75) * 60 * 1000),
      timezone: "Asia/Kolkata",
      roomName: "flight_cpl_comp_9days",
      status: ClassStatus.COMPLETED,
      recordingEnabled: true,
      recordings: {
        create: {
          provider: "LIVEKIT_EGRESS",
          storageProvider: "CLOUDFLARE_R2",
          storageKey: `recordings/${courseCPL.id}/${batchAlpha.id}/comp9/altimetry.mp4`,
          fileName: "CPL_Altimetry_Pressure_Settings.mp4",
          fileSize: BigInt(260000000),
          durationSeconds: 4500,
          status: RecordingStatus.DELETED,
          availableAt: new Date(now.getTime() - 9 * 24 * 60 * 60 * 1000),
          expiresAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
          deletedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
          playbackEnabled: false,
          downloadEnabled: false,
        },
      },
    },
  });

  // 9. Initial Notifications
  await prisma.notification.create({
    data: {
      userId: student1.id,
      type: "CLASS_STARTING",
      title: "🔴 Class is LIVE: Air Navigation",
      message: "Capt. Vikram Malhotra has started the live session. Join the virtual classroom now.",
      link: `/classroom/${liveClass.id}`,
    },
  });

  await prisma.notification.create({
    data: {
      userId: student1.id,
      type: "RECORDING_EXPIRING",
      title: "⚠️ Recording Expires Within 24 Hours!",
      message: "The recording for 'Meteorology: Convective Thunderstorms' will be deleted in 18 hours. Please download it now if needed.",
      link: "/student/recordings",
    },
  });

  console.log("✅ Seed completed successfully with realistic aviation academy data!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
