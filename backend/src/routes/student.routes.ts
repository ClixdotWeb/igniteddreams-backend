import { Router } from "express";
import { studentController } from "../controllers/studentController";
import { authenticateUser, requireRole } from "../middleware/auth";
import { Role } from "../types/enums";

const router = Router();

// Student-only guard
router.use(authenticateUser, requireRole([Role.STUDENT, Role.ADMIN]));

router.get("/dashboard", studentController.getDashboard);
router.get("/courses", studentController.getCourses);
router.get("/recordings", studentController.getRecordings);
router.get("/attendance", studentController.getAttendance);
router.get("/notifications", studentController.getNotifications);
router.patch("/notifications/:id/read", studentController.markNotificationRead);

export default router;
