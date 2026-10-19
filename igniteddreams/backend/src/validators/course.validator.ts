import { z } from "zod";
import { CourseStatus } from "../types/enums";

export const createCourseSchema = z.object({
  title: z.string().min(3).max(200),
  slug: z.string().min(2).max(100).regex(/^[a-z0-9-]+$/, "Slug must only contain lowercase alphanumeric characters and hyphens"),
  code: z.string().min(2).max(20).toUpperCase(),
  description: z.string().min(10),
  thumbnail: z.string().url().optional().or(z.literal("")),
  status: z.nativeEnum(CourseStatus).optional().default(CourseStatus.DRAFT),
  durationHours: z.number().int().positive().default(40),
});

export const updateCourseSchema = createCourseSchema.partial();
