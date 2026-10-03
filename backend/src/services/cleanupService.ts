import { prisma } from "./prisma";
import { storageService } from "./storageService";
import { auditService } from "./auditService";
import { notificationService } from "./notificationService";
import { logger } from "../utils/logger";
import { RecordingStatus } from "../types/enums";
import { config } from "../config";

export class CleanupService {
  private isRunning = false;

  /**
   * Hourly job to clean up expired recordings from Cloudflare R2 and update PostgreSQL
   */
  async cleanupExpiredRecordings(): Promise<{
    processed: number;
    deleted: number;
    failed: number;
  }> {
    if (this.isRunning) {
      logger.warn("Cleanup job already running. Skipping this cycle.");
      return { processed: 0, deleted: 0, failed: 0 };
    }

    this.isRunning = true;
    const now = new Date();
    let deletedCount = 0;
    let failedCount = 0;

    logger.info(`Starting hourly recording cleanup job at ${now.toISOString()}`);

    try {
      // 1. Fetch expired recordings in controlled batches
      const expiredRecordings = await prisma.recording.findMany({
        where: {
          expiresAt: { lte: now },
          status: {
            in: [
              RecordingStatus.READY,
              RecordingStatus.EXPIRING_SOON,
              RecordingStatus.EXPIRED,
            ],
          },
        },
        take: config.cleanup.batchSize,
        include: {
          classSession: { select: { title: true, id: true, batchId: true } },
        },
      });

      logger.info(`Found ${expiredRecordings.length} expired recordings to clean up.`);

      for (const recording of expiredRecordings) {
        try {
          // Mark as DELETING
          await prisma.recording.update({
            where: { id: recording.id },
            data: { status: RecordingStatus.DELETING },
          });

          // Delete object from Cloudflare R2
          if (recording.storageKey) {
            const deleteSuccess = await storageService.deleteObject(recording.storageKey);
            if (!deleteSuccess) {
              throw new Error(`R2 storage returned failure when deleting key: ${recording.storageKey}`);
            }
          }

          // Mark as DELETED in PostgreSQL
          await prisma.recording.update({
            where: { id: recording.id },
            data: {
              status: RecordingStatus.DELETED,
              deletedAt: new Date(),
              playbackEnabled: false,
              downloadEnabled: false,
            },
          });

          // Record audit log
          await auditService.log({
            action: "RECORDING_EXPIRED_CLEANUP",
            entity: "Recording",
            entityId: recording.id,
            metadata: {
              classSessionId: recording.classSessionId,
              classTitle: recording.classSession.title,
              storageKey: recording.storageKey,
              expiredAt: recording.expiresAt,
            },
          });

          deletedCount++;
          logger.info(`Successfully expired and deleted recording: ${recording.id} (${recording.fileName})`);
        } catch (error) {
          failedCount++;
          const errorMessage = error instanceof Error ? error.message : String(error);
          logger.error(`Failed to cleanup expired recording: ${recording.id}`, error);

          // Update retry count and record error
          await prisma.recording.update({
            where: { id: recording.id },
            data: {
              status: RecordingStatus.FAILED,
              retryCount: { increment: 1 },
              lastError: errorMessage,
            },
          });
        }
      }

      return {
        processed: expiredRecordings.length,
        deleted: deletedCount,
        failed: failedCount,
      };
    } catch (globalError) {
      logger.error("Unexpected error in cleanupExpiredRecordings job", globalError);
      return { processed: 0, deleted: deletedCount, failed: failedCount };
    } finally {
      this.isRunning = false;
    }
  }

  /**
   * Checks recordings nearing expiration (within 48h and 24h) and sends warning notifications to students
   */
  async checkExpiringSoonRecordings() {
    const now = new Date();
    const in48Hours = new Date(now.getTime() + 48 * 60 * 60 * 1000);

    try {
      const expiringRecordings = await prisma.recording.findMany({
        where: {
          status: { in: [RecordingStatus.READY, RecordingStatus.EXPIRING_SOON] },
          expiresAt: {
            gt: now,
            lte: in48Hours,
          },
        },
        include: {
          classSession: { select: { title: true, batchId: true } },
        },
      });

      for (const rec of expiringRecordings) {
        if (!rec.expiresAt) continue;

        const hoursLeft = Math.round((rec.expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60));

        // Mark as EXPIRING_SOON
        if (rec.status !== RecordingStatus.EXPIRING_SOON) {
          await prisma.recording.update({
            where: { id: rec.id },
            data: { status: RecordingStatus.EXPIRING_SOON },
          });
        }

        const warningTitle =
          hoursLeft <= 24
            ? "⚠️ Recording Expires Within 24 Hours!"
            : "⏳ Recording Expires Soon";

        const warningMsg = `The recording for "${rec.classSession.title}" will be automatically deleted in ${hoursLeft} hours. Please download it now if you wish to retain it.`;

        await notificationService.notifyBatchStudents(
          rec.classSession.batchId,
          hoursLeft <= 24 ? "RECORDING_EXPIRING_24H" : "RECORDING_EXPIRING_48H",
          warningTitle,
          warningMsg,
          `/student/recordings/${rec.id}`
        );
      }
    } catch (error) {
      logger.error("Error in checkExpiringSoonRecordings", error);
    }
  }
}

export const cleanupService = new CleanupService();
export default cleanupService;
