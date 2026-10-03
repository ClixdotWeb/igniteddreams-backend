import { Router } from "express";
import { authController } from "../controllers/authController";
import { authLimiter } from "../middleware/rateLimiter";
import { authenticateUser } from "../middleware/auth";

const router = Router();

router.post("/register", authLimiter, authController.register);
router.post("/login", authLimiter, authController.login);
router.post("/logout", authController.logout);
router.get("/me", authenticateUser, authController.me);

export default router;
