import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || "5000", 10),
  nodeEnv: process.env.NODE_ENV || "development",
  isProduction: process.env.NODE_ENV === "production",
  databaseUrl: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/igniteddreams?schema=public",
  
  auth: {
    jwtSecret: process.env.JWT_SECRET || "igniteddreams-super-secure-production-jwt-secret-key-2026",
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
    cookieName: process.env.COOKIE_NAME || "ignited_session",
    cookieMaxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
  },

  cors: {
    frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
  },

  livekit: {
    url: process.env.LIVEKIT_URL || "https://livekit.example.com",
    apiKey: process.env.LIVEKIT_API_KEY || "devkey",
    apiSecret: process.env.LIVEKIT_API_SECRET || "secret",
    emptyTimeout: 300, // 5 min room timeout when empty
    maxParticipants: 100,
  },

  r2: {
    accountId: process.env.R2_ACCOUNT_ID || "",
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
    bucketName: process.env.R2_BUCKET_NAME || "igniteddreams-recordings",
    endpoint: process.env.R2_ENDPOINT || "",
  },

  academy: {
    name: process.env.ACADEMY_NAME || "IgnitedDreams Skill Academy",
    timezone: process.env.ACADEMY_TIMEZONE || "Asia/Kolkata",
    // CENTRALIZED RECORDING RETENTION POLICY (7 DAYS)
    recordingRetentionDays: parseInt(process.env.RECORDING_RETENTION_DAYS || "7", 10),
    classJoinWindowMinutes: parseInt(process.env.CLASS_JOIN_WINDOW_MINUTES || "15", 10),
  },

  cleanup: {
    secret: process.env.CLEANUP_SECRET || "cleanup-internal-cron-key-secure",
    batchSize: 25,
  }
};
