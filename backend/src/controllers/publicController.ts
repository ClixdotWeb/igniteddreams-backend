import { Request, Response, NextFunction } from "express";
import { courseService } from "../services/courseService";
import { settingService } from "../services/settingService";
import { sendSuccess } from "../utils/apiResponse";

export class PublicController {
  async getCourses(req: Request, res: Response, next: NextFunction) {
    try {
      const courses = await courseService.getPublishedCourses();
      return sendSuccess(res, courses);
    } catch (error) {
      next(error);
    }
  }

  async getCourseBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const slug = String(req.params.slug);
      const course = await courseService.getCourseBySlug(slug);
      return sendSuccess(res, course);
    } catch (error) {
      next(error);
    }
  }

  async getInfo(req: Request, res: Response, next: NextFunction) {
    try {
      const settings = await settingService.getAllSettings();
      return sendSuccess(res, {
        academyName: settings.academyName || "IgnitedDreams Aviation Academy",
        timezone: settings.academyTimezone || "Asia/Kolkata",
        recordingRetentionDays: settings.recordingRetentionDays || "7",
      });
    } catch (error) {
      next(error);
    }
  }
}

export const publicController = new PublicController();
export default publicController;
