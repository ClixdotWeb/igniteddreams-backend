import { Router } from "express";
import { adminController } from "../controllers/adminController";
import { authenticateUser, requireRole } from "../middleware/auth";
import { Role } from "../types/enums";

const router = Router();

router.use(authenticateUser, requireRole([Role.ADMIN]));

router.get("/dashboard", adminController.getDashboard);

// Students
router.get("/students", adminController.getStudents);
router.patch("/students/:id/status", adminController.updateStudentStatus);

// Instructors
router.get("/instructors", adminController.getInstructors);
router.post("/instructors", adminController.createInstructor);

// Courses
router.get("/courses", adminController.getCourses);
router.post("/courses", adminController.createCourse);
router.patch("/courses/:id", adminController.updateCourse);

// Batches
router.get("/batches", adminController.getBatches);
router.post("/batches", adminController.createBatch);
router.post("/batches/enroll", adminController.assignStudent);

// Classes
router.get("/classes", adminController.getClasses);
router.post("/classes", adminController.createClass);

// Recordings Management
router.get("/recordings", adminController.getRecordings);
router.delete("/recordings/:id", adminController.deleteRecording);
router.patch("/recordings/:id/expiry", adminController.extendRecordingExpiry);

// System
router.get("/settings", adminController.getSettings);
router.patch("/settings", adminController.updateSettings);
router.get("/audit-logs", adminController.getAuditLogs);

export default router;
