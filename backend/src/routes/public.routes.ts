import { Router } from "express";
import { publicController } from "../controllers/publicController";

const router = Router();

router.get("/courses", publicController.getCourses);
router.get("/courses/:slug", publicController.getCourseBySlug);
router.get("/info", publicController.getInfo);

export default router;
