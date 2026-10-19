import { prisma } from "./prisma";
import { config } from "../config";
import { logger } from "../utils/logger";

export const SETTING_KEYS = {
  RECORDING_RETENTION_DAYS: "recordingRetentionDays",
  ACADEMY_NAME: "academyName",
  ACADEMY_TIMEZONE: "academyTimezone",
  CLASS_JOIN_WINDOW_MINUTES: "classJoinWindowMinutes",
  DEFAULT_RECORDING_ENABLED: "defaultRecordingEnabled",
  DOWNLOAD_ENABLED: "downloadEnabled",
} as const;

export class SettingService {
  /**
   * Retrieves the centralized recording retention period in days (default: 7)
   */
  async getRecordingRetentionDays(): Promise<number> {
    try {
      const setting = await prisma.setting.findUnique({
        where: { key: SETTING_KEYS.RECORDING_RETENTION_DAYS },
      });
      if (setting && !isNaN(parseInt(setting.value, 10))) {
        return parseInt(setting.value, 10);
      }
    } catch (e) {
      logger.warn("Could not query recordingRetentionDays setting from DB, using config fallback", e);
    }
    return config.academy.recordingRetentionDays;
  }

  /**
   * Gets academy timezone
   */
  async getAcademyTimezone(): Promise<string> {
    try {
      const setting = await prisma.setting.findUnique({
        where: { key: SETTING_KEYS.ACADEMY_TIMEZONE },
      });
      if (setting && setting.value) {
        return setting.value;
      }
    } catch {
      // fallback
    }
    return config.academy.timezone;
  }

  /**
   * Gets all settings as a key-value dictionary
   */
  async getAllSettings() {
    const defaultSettings: Record<string, string> = {
      [SETTING_KEYS.RECORDING_RETENTION_DAYS]: String(config.academy.recordingRetentionDays),
      [SETTING_KEYS.ACADEMY_NAME]: config.academy.name,
      [SETTING_KEYS.ACADEMY_TIMEZONE]: config.academy.timezone,
      [SETTING_KEYS.CLASS_JOIN_WINDOW_MINUTES]: String(config.academy.classJoinWindowMinutes),
      [SETTING_KEYS.DEFAULT_RECORDING_ENABLED]: "true",
      [SETTING_KEYS.DOWNLOAD_ENABLED]: "true",
    };

    try {
      const dbSettings = await prisma.setting.findMany();
      dbSettings.forEach((s) => {
        defaultSettings[s.key] = s.value;
      });
    } catch (error) {
      logger.warn("Could not load settings from DB", error);
    }

    return defaultSettings;
  }

  /**
   * Updates or inserts a platform setting
   */
  async updateSetting(key: string, value: string, description?: string) {
    return prisma.setting.upsert({
      where: { key },
      update: { value, description },
      create: { key, value, description },
    });
  }
}

export const settingService = new SettingService();
export default settingService;
