import { z } from "zod";
import { BatchStatus } from "../types/enums";

export const createBatchSchema = z.object({
  name: z.string().min(2).max(100),
  code: z.string().min(2).max(30).toUpperCase(),
  courseId: z.string().min(1),
  instructorId: z.string().min(1),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  status: z.nativeEnum(BatchStatus).optional().default(BatchStatus.UPCOMING),
});

export const updateBatchSchema = createBatchSchema.partial();

export const assignEnrollmentSchema = z.object({
  studentId: z.string().min(1),
  batchId: z.string().min(1),
  courseId: z.string().min(1),
});
