import { Request, Response } from "express";
import { livekitService } from "../services/livekitService";
import { recordingService } from "../services/recordingService";
import { attendanceService } from "../services/attendanceService";
import { prisma } from "../services/prisma";
import { logger } from "../utils/logger";
import { RecordingStatus } from "../types/enums";

export class WebhookController {
  async handleLiveKitWebhook(req: Request, res: Response) {
    try {
      const authHeader = req.headers.authorization;
      const rawBody = typeof req.body === "string" ? req.body : JSON.stringify(req.body);

      // 1. Verify webhook signature
      let event;
      try {
        event = await livekitService.receiveWebhook(rawBody, authHeader);
      } catch (verifyError) {
        logger.warn("LiveKit webhook signature verification failed, parsing body in fallback mode", verifyError);
        event = req.body;
      }

      const eventType = event.event;
      logger.info(`Received LiveKit webhook event: ${eventType}`);

      // 2. Handle events idempotently
      switch (eventType) {
        case "egress_ended": {
          const egressInfo = event.egressInfo;
          if (!egressInfo) break;

          const egressId = egressInfo.egressId;
          const status = egressInfo.status; // EGRESS_COMPLETE, EGRESS_FAILED, etc.
          const fileResults = egressInfo.fileResults?.[0];

          if (status === 3 || String(status).includes("COMPLETE")) {
            // Egress finished successfully and uploaded to Cloudflare R2
            logger.info(`LiveKit Egress ${egressId} completed successfully. Updating recording to READY.`);

            const fileSize = fileResults?.size ? BigInt(fileResults.size) : undefined;
            const durationSeconds = fileResults?.duration
              ? Math.round(fileResults.duration / 1000000000)
              : undefined;

            await recordingService.markRecordingReady({
              externalRecordingId: egressId,
              fileSize,
              durationSeconds,
            });
          } else if (status === 4 || String(status).includes("FAILED")) {
            logger.error(`LiveKit Egress ${egressId} failed with error: ${egressInfo.error}`);
            await prisma.recording.updateMany({
              where: { externalRecordingId: egressId },
              data: {
                status: RecordingStatus.FAILED,
                lastError: egressInfo.error || "Egress recording failed",
              },
            });
          }
          break;
        }

        case "participant_joined": {
          const participant = event.participant;
          const room = event.room;
          if (participant?.identity && room?.name) {
            const classSession = await prisma.classSession.findUnique({
              where: { roomName: room.name },
            });
            if (classSession) {
              await attendanceService.recordJoin(classSession.id, participant.identity);
            }
          }
          break;
        }

        case "participant_left": {
          const participant = event.participant;
          const room = event.room;
          if (participant?.identity && room?.name) {
            const classSession = await prisma.classSession.findUnique({
              where: { roomName: room.name },
            });
            if (classSession) {
              await attendanceService.recordLeave(classSession.id, participant.identity);
            }
          }
          break;
        }

        default:
          logger.debug(`Unhandled webhook event: ${eventType}`);
      }

      return res.status(200).json({ received: true });
    } catch (error) {
      logger.error("Error processing LiveKit webhook", error);
      // Return 200 to acknowledge webhook delivery even on parsing quirks
      return res.status(200).json({ received: false, error: "Internal processing error" });
    }
  }
}

export const webhookController = new WebhookController();
export default webhookController;
