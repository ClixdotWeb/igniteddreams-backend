import { Request, Response, NextFunction } from "express";
import { authService } from "../services/authService";
import { registerSchema, loginSchema } from "../validators/auth.validator";
import { sendSuccess } from "../utils/apiResponse";
import { config } from "../config";

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = registerSchema.parse(req.body);
      const result = await authService.register(validated);

      // Set HTTP-only secure cookie
      res.cookie(config.auth.cookieName, result.token, {
        httpOnly: true,
        secure: config.isProduction,
        sameSite: "lax",
        maxAge: config.auth.cookieMaxAge,
      });

      return sendSuccess(res, result, "Account registered successfully", 201);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const validated = loginSchema.parse(req.body);
      const result = await authService.login(validated);

      // Set HTTP-only secure cookie
      res.cookie(config.auth.cookieName, result.token, {
        httpOnly: true,
        secure: config.isProduction,
        sameSite: "lax",
        maxAge: config.auth.cookieMaxAge,
      });

      return sendSuccess(res, result, "Login successful");
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie(config.auth.cookieName, {
        httpOnly: true,
        secure: config.isProduction,
        sameSite: "lax",
      });

      return sendSuccess(res, null, "Logged out successfully");
    } catch (error) {
      next(error);
    }
  }

  async me(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: "Unauthenticated" });
      }

      const user = await authService.getMe(req.user.id);
      return sendSuccess(res, user);
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
export default authController;
