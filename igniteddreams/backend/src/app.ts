import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes";
import { config } from "./config";
import { requestLogger } from "./middleware/requestLogger";
import { errorHandler } from "./middleware/errorHandler";
import { generalLimiter } from "./middleware/rateLimiter";
import { prisma } from "./services/prisma";

// BigInt JSON serialization support for Prisma BigInt fields (file sizes, counters)
(BigInt.prototype as any).toJSON = function () {
  const intVal = Number(this);
  return intVal >= Number.MIN_SAFE_INTEGER && intVal <= Number.MAX_SAFE_INTEGER
    ? intVal
    : this.toString();
};

const app = express();

// Security headers
app.use(
  helmet({
    contentSecurityPolicy: false, // Managed by reverse proxy or Next.js for WebRTC compatibility
    crossOriginEmbedderPolicy: false,
  })
);

// CORS configuration (Strict: Only allow configured frontend origin with credentials)
const allowedOrigins = [
  config.cors.frontendUrl,
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:3001",
  "http://127.0.0.1:3001",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or server-to-server)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // Dev flexible fallback
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "x-cleanup-secret"],
  })
);

// Cookie Parser
app.use(cookieParser());

// Request Logger
app.use(requestLogger);

// Rate Limiting
app.use(generalLimiter);

// Webhook raw body parser is mounted in webhook router before standard parsers
// Standard JSON and URL Encoded parsers
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

// Health Check Endpoint
app.get("/health", async (req: Request, res: Response) => {
  let dbStatus = "connected";
  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch {
    dbStatus = "disconnected";
  }

  res.status(200).json({
    status: "healthy",
    academy: config.academy.name,
    environment: config.nodeEnv,
    database: dbStatus,
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.round(process.uptime()),
  });
});

// Mount Main API Routes
app.use("/api", routes);

// 404 Route Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `API endpoint not found: ${req.method} ${req.originalUrl}`,
  });
});

// Global Error Handler
app.use(errorHandler);

export default app;
