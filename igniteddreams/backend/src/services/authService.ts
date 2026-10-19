import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "./prisma";
import { config } from "../config";
import { BadRequestError, UnauthorizedError, ConflictError } from "../utils/errors";
import { Role } from "../types/enums";

export class AuthService {
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  generateToken(user: { id: string; email: string; name: string; role: Role | string }): string {
    return jwt.sign(
      {
        userId: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      config.auth.jwtSecret,
      { expiresIn: "7d" }
    );
  }

  async register(data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    registrationNumber?: string;
  }) {
    const existing = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existing) {
      throw new ConflictError("An account with this email address already exists.");
    }

    const passwordHash = await this.hashPassword(data.password);
    const regNum =
      data.registrationNumber ||
      `AV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        passwordHash,
        role: Role.STUDENT,
        studentProfile: {
          create: {
            registrationNumber: regNum,
          },
        },
      },
      include: {
        studentProfile: true,
      },
    });

    const token = this.generateToken(user);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        registrationNumber: user.studentProfile?.registrationNumber,
      },
      token,
    };
  }

  async login(data: { email: string; password: string }) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
      include: {
        studentProfile: true,
        instructorProfile: true,
      },
    });

    if (!user) {
      throw new UnauthorizedError("Invalid email or password.");
    }

    const isValid = await this.verifyPassword(data.password, user.passwordHash);
    if (!isValid) {
      throw new UnauthorizedError("Invalid email or password.");
    }

    if (user.status !== "ACTIVE") {
      throw new BadRequestError(`Your account is ${user.status.toLowerCase()}. Please contact administration.`);
    }

    const token = this.generateToken(user);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatarUrl,
        studentProfile: user.studentProfile,
        instructorProfile: user.instructorProfile,
      },
      token,
    };
  }

  async getMe(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        studentProfile: true,
        instructorProfile: true,
      },
    });

    if (!user) {
      throw new UnauthorizedError("User session not found.");
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      avatarUrl: user.avatarUrl,
      studentProfile: user.studentProfile,
      instructorProfile: user.instructorProfile,
    };
  }
}

export const authService = new AuthService();
export default authService;
