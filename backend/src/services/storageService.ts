import {
  S3Client,
  GetObjectCommand,
  DeleteObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { config } from "../config";
import { logger } from "../utils/logger";

export interface IStorageService {
  getPlaybackUrl(key: string, expiresInSeconds?: number): Promise<string>;
  getDownloadUrl(key: string, fileName: string, expiresInSeconds?: number): Promise<string>;
  deleteObject(key: string): Promise<boolean>;
  checkObjectExists(key: string): Promise<boolean>;
}

class CloudflareR2StorageService implements IStorageService {
  private client: S3Client | null = null;
  private bucket: string;
  private isConfigured: boolean;

  constructor() {
    this.bucket = config.r2.bucketName;
    
    // Check if R2 credentials are provided
    if (
      config.r2.accountId &&
      config.r2.accessKeyId &&
      config.r2.secretAccessKey
    ) {
      const endpoint =
        config.r2.endpoint ||
        `https://${config.r2.accountId}.r2.cloudflarestorage.com`;

      this.client = new S3Client({
        region: "auto",
        endpoint,
        credentials: {
          accessKeyId: config.r2.accessKeyId,
          secretAccessKey: config.r2.secretAccessKey,
        },
      });
      this.isConfigured = true;
      logger.info(`Cloudflare R2 Storage initialized for bucket: ${this.bucket}`);
    } else {
      this.isConfigured = false;
      logger.warn(
        "Cloudflare R2 credentials not configured. Operating in development mock/preview mode."
      );
    }
  }

  /**
   * Generates a short-lived signed URL for student playback (e.g., valid for 15 minutes)
   */
  async getPlaybackUrl(key: string, expiresInSeconds = 900): Promise<string> {
    if (!this.isConfigured || !this.client) {
      // In dev without R2 credentials, provide simulated demo stream
      logger.debug(`[MOCK R2] Generating playback URL for: ${key}`);
      return `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4?mockKey=${encodeURIComponent(
        key
      )}&expires=${Date.now() + expiresInSeconds * 1000}`;
    }

    try {
      const command = new GetObjectCommand({
        Bucket: this.bucket,
        Key: key,
      });

      const signedUrl = await getSignedUrl(this.client, command, {
        expiresIn: expiresInSeconds,
      });

      return signedUrl;
    } catch (error) {
      logger.error(`Failed to generate signed playback URL for key ${key}`, error);
      throw error;
    }
  }

  /**
   * Generates a short-lived signed URL for downloading the MP4 with Content-Disposition attachment header
   */
  async getDownloadUrl(
    key: string,
    fileName: string,
    expiresInSeconds = 300
  ): Promise<string> {
    if (!this.isConfigured || !this.client) {
      logger.debug(`[MOCK R2] Generating download URL for: ${key}`);
      return `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4?download=true&filename=${encodeURIComponent(
        fileName
      )}&expires=${Date.now() + expiresInSeconds * 1000}`;
    }

    try {
      const safeFilename = fileName.replace(/[^a-zA-Z0-9_.-]/g, "_");
      const command = new GetObjectCommand({
        Bucket: this.bucket,
        Key: key,
        ResponseContentDisposition: `attachment; filename="${safeFilename}"`,
        ResponseContentType: "video/mp4",
      });

      const signedUrl = await getSignedUrl(this.client, command, {
        expiresIn: expiresInSeconds,
      });

      return signedUrl;
    } catch (error) {
      logger.error(`Failed to generate download URL for key ${key}`, error);
      throw error;
    }
  }

  /**
   * Deletes recording MP4 object from Cloudflare R2
   */
  async deleteObject(key: string): Promise<boolean> {
    if (!this.isConfigured || !this.client) {
      logger.info(`[MOCK R2] Deleted object from storage: ${key}`);
      return true;
    }

    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key,
      });

      await this.client.send(command);
      logger.info(`Successfully deleted R2 object: ${key}`);
      return true;
    } catch (error) {
      logger.error(`Failed to delete R2 object: ${key}`, error);
      throw error;
    }
  }

  /**
   * Verifies if an object exists in Cloudflare R2
   */
  async checkObjectExists(key: string): Promise<boolean> {
    if (!this.isConfigured || !this.client) {
      return true;
    }

    try {
      const command = new HeadObjectCommand({
        Bucket: this.bucket,
        Key: key,
      });
      await this.client.send(command);
      return true;
    } catch {
      return false;
    }
  }
}

export const storageService = new CloudflareR2StorageService();
export default storageService;
