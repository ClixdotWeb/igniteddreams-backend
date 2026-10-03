import express, { Router } from "express";
import { webhookController } from "../controllers/webhookController";

const router = Router();

// LiveKit Webhook Receiver (supports raw body text and JSON)
router.post(
  "/livekit",
  express.raw({ type: "*/*" }),
  webhookController.handleLiveKitWebhook
);

export default router;
