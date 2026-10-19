import { prisma } from "./prisma";
import { Prisma } from "@prisma/client";
import { CourseStatus } from "../types/enums";
import { NotFoundError, ConflictError } from "../utils/errors";

export class CourseService {
  /**
   * Public list of published courses
   */
  async getPublishedCourses() {
    return prisma.course.findMany({
      where: { status: CourseStatus.PUBLISHED },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        code: true,
        description: true,
        thumbnail: true,
        durationHours: true,
        _count: {
          select: { batches: true },
        },
      },
    });
  }

  /**
   * Public course details by slug
   */
  async getCourseBySlug(slug: string) {
    const course = await prisma.course.findUnique({
      where: { slug },
      include: {
        batches: {
          where: { status: { in: ["ACTIVE", "UPCOMING"] } },
          select: {
            id: true,
            name: true,
            code: true,
            startDate: true,
            endDate: true,
            status: true,
            instructor: { select: { id: true, name: true } },
          },
        },
      },
    });

    if (!course) {
      throw new NotFoundError(`Course with slug "${slug}" not found.`);
    }

    return course;
  }

  /**
   * Admin course list with pagination and search
   */
  async getAdminCourses(params: {
    page?: number;
    limit?: number;
    search?: string;
    status?: CourseStatus;
  }) {
    const page = params.page || 1;
    const limit = params.limit || 20;
    const skip = (page - 1) * limit;

    const where: Prisma.CourseWhereInput = {};

    if (params.status) {
      where.status = params.status;
    }

    if (params.search) {
      where.OR = [
        { title: { contains: params.search } },
        { code: { contains: params.search } },
        { description: { contains: params.search } },
      ];
    }

    const [total, courses] = await Promise.all([
      prisma.course.count({ where }),
      prisma.course.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          _count: {
            select: { batches: true, enrollments: true, classSessions: true },
          },
        },
      }),
    ]);

    return {
      courses,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Create course
   */
  async createCourse(data: {
    title: string;
    slug: string;
    code: string;
    description: string;
    thumbnail?: string;
    status?: CourseStatus;
    durationHours?: number;
  }) {
    const existing = await prisma.course.findFirst({
      where: {
        OR: [{ slug: data.slug }, { code: data.code }],
      },
    });

    if (existing) {
      throw new ConflictError("Course with this slug or code already exists.");
    }

    return prisma.course.create({ data });
  }

  /**
   * Update course
   */
  async updateCourse(id: string, data: Partial<Prisma.CourseUpdateInput>) {
    const course = await prisma.course.findUnique({ where: { id } });
    if (!course) throw new NotFoundError("Course not found");

    return prisma.course.update({
      where: { id },
      data,
    });
  }

  /**
   * Delete course
   */
  async deleteCourse(id: string) {
    const course = await prisma.course.findUnique({ where: { id } });
    if (!course) throw new NotFoundError("Course not found");

    return prisma.course.delete({ where: { id } });
  }
}

export const courseService = new CourseService();
export default courseService;
