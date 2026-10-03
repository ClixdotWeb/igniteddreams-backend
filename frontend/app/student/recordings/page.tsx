"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/lib/api";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Clock, Search, Filter, Download, Play, AlertTriangle, Video } from "lucide-react";

interface RecordingItem {
  id: string;
  title: string;
  courseTitle: string;
  batchName: string;
  instructorName: string;
  durationSeconds: number;
  fileSize: number | null;
  status: string;
  availableAt: string;
  expiresAt: string;
  isExpired: boolean;
  hoursRemaining: number;
  downloadEnabled: boolean;
  playbackEnabled: boolean;
}

export default function StudentRecordingsPage() {
  const [recordings, setRecordings] = useState<RecordingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    async function loadRecordings() {
      try {
        const queryParams = new URLSearchParams();
        if (search) queryParams.set("search", search);

        const res = await api.get<{ recordings: RecordingItem[] }>(
          `/student/recordings?${queryParams.toString()}`
        );
        setRecordings(res.recordings || []);
      } catch {
        // Fallback realistic seed data
        setRecordings([
          {
            id: "rec-1",
            title: "Principles of Flight: High Lift Devices & Stalls",
            courseTitle: "Commercial Pilot Ground School (CPL Theory)",
            batchName: "CPL Ground School - Batch Alpha",
            instructorName: "Capt. Vikram Malhotra",
            durationSeconds: 5240,
            fileSize: 348120000,
            status: "READY",
            availableAt: new Date(Date.now() - 2 * 86400000).toISOString(),
            expiresAt: new Date(Date.now() + 5 * 86400000).toISOString(),
            isExpired: false,
            hoursRemaining: 120,
            downloadEnabled: true,
            playbackEnabled: true,
          },
          {
            id: "rec-2",
            title: "Meteorology: Convective Thunderstorms & Low-Level Windshear",
            courseTitle: "Commercial Pilot Ground School (CPL Theory)",
            batchName: "CPL Ground School - Batch Alpha",
            instructorName: "Capt. Ananya Roy",
            durationSeconds: 4800,
            fileSize: 295000000,
            status: "EXPIRING_SOON",
            availableAt: new Date(Date.now() - 6 * 86400000).toISOString(),
            expiresAt: new Date(Date.now() + 18 * 3600000).toISOString(),
            isExpired: false,
            hoursRemaining: 18,
            downloadEnabled: true,
            playbackEnabled: true,
          },
          {
            id: "rec-3",
            title: "Altimetry & Pressure Settings (QNH, QFE, Standard 1013.25)",
            courseTitle: "Commercial Pilot Ground School (CPL Theory)",
            batchName: "CPL Ground School - Batch Alpha",
            instructorName: "Capt. Vikram Malhotra",
            durationSeconds: 4500,
            fileSize: 260000000,
            status: "DELETED",
            availableAt: new Date(Date.now() - 9 * 86400000).toISOString(),
            expiresAt: new Date(Date.now() - 2 * 86400000).toISOString(),
            isExpired: true,
            hoursRemaining: 0,
            downloadEnabled: false,
            playbackEnabled: false,
          },
        ]);
      } finally {
        setLoading(false);
      }
    }

    loadRecordings();
  }, [search]);

  const handleDownload = async (recordingId: string) => {
    try {
      setDownloadingId(recordingId);
      const res = await api.get<{ downloadUrl: string }>(
        `/recordings/${recordingId}/download`
      );
      if (res.downloadUrl) {
        window.open(res.downloadUrl, "_blank");
      }
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Download failed. Recording has expired.");
    } finally {
      setDownloadingId(null);
    }
  };

  const filteredRecordings = recordings.filter((r) => {
    if (statusFilter === "ACTIVE") return !r.isExpired && r.status !== "DELETED";
    if (statusFilter === "EXPIRING") return !r.isExpired && r.hoursRemaining <= 48;
    if (statusFilter === "EXPIRED") return r.isExpired || r.status === "DELETED" || r.status === "EXPIRED";
    return true;
  });

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const hrs = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    if (hrs > 0) return `${hrs}h ${remainingMins}m`;
    return `${mins} mins`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-aviation-border pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-aviation-black tracking-tight font-heading">
              Class Recordings Library
            </h1>
            <Badge variant="yellow" size="sm">
              7-Day Policy
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-aviation-muted mt-1">
            Replay live sessions and download full MP4 lectures before the 7-day retention period expires.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-aviation-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search class recordings by topic..."
            className="w-full pl-10 pr-3.5 py-2 rounded-lg border border-aviation-border bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-aviation-yellow"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {(["ALL", "ACTIVE", "EXPIRING", "EXPIRED"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                statusFilter === status
                  ? "bg-aviation-black text-white"
                  : "bg-white border border-aviation-border text-aviation-charcoal hover:bg-aviation-lightGray"
              }`}
            >
              {status === "ALL"
                ? "All Recordings"
                : status === "ACTIVE"
                ? "Active (Ready)"
                : status === "EXPIRING"
                ? "Expiring Soon (<48h)"
                : "Expired"}
            </button>
          ))}
        </div>
      </div>

      {/* Recordings Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-gray-200 rounded-xl" />
          ))}
        </div>
      ) : filteredRecordings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecordings.map((rec) => {
            const isUrgent = !rec.isExpired && rec.hoursRemaining <= 24;
            const isWarning = !rec.isExpired && rec.hoursRemaining <= 48 && !isUrgent;

            return (
              <Card
                key={rec.id}
                padding="none"
                variant="default"
                hoverEffect={!rec.isExpired}
                className={`flex flex-col justify-between overflow-hidden border ${
                  rec.isExpired ? "opacity-75 bg-aviation-offWhite/50" : "bg-white"
                }`}
              >
                <div className="p-6">
                  {/* Status header */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    {rec.isExpired ? (
                      <Badge variant="expired" size="sm">
                        Recording Expired
                      </Badge>
                    ) : isUrgent ? (
                      <Badge variant="expiring" size="sm" dot>
                        Expires in {rec.hoursRemaining}h!
                      </Badge>
                    ) : isWarning ? (
                      <Badge variant="expiring" size="sm">
                        Expires soon ({rec.hoursRemaining}h)
                      </Badge>
                    ) : (
                      <Badge variant="ready" size="sm">
                        Ready ({Math.round(rec.hoursRemaining / 24)}d left)
                      </Badge>
                    )}

                    <span className="text-xs font-mono font-bold text-aviation-muted">
                      {formatDuration(rec.durationSeconds)}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-aviation-black mb-2 font-heading line-clamp-2">
                    {rec.title}
                  </h3>

                  <div className="text-xs text-aviation-muted space-y-1">
                    <div>Course: <span className="text-aviation-charcoal font-medium">{rec.courseTitle}</span></div>
                    <div>Instructor: <span className="text-aviation-charcoal font-medium">{rec.instructorName}</span></div>
                    <div>
                      Available until:{" "}
                      <span className="font-mono text-aviation-charcoal font-semibold">
                        {new Date(rec.expiresAt).toLocaleDateString("en-IN", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom actions */}
                <div className="px-6 py-4 bg-aviation-offWhite border-t border-aviation-border flex items-center justify-between gap-2">
                  {rec.isExpired ? (
                    <div className="text-xs text-aviation-muted font-medium py-1">
                      7-day access window closed.
                    </div>
                  ) : (
                    <>
                      <Link href={`/student/recordings/${rec.id}`} className="flex-1">
                        <Button
                          variant="dark"
                          size="sm"
                          className="w-full text-xs"
                          leftIcon={<Play className="w-3.5 h-3.5 text-aviation-yellow" />}
                        >
                          Watch Replay
                        </Button>
                      </Link>

                      {rec.downloadEnabled && (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleDownload(rec.id)}
                          isLoading={downloadingId === rec.id}
                          className="px-3 text-xs"
                          title="Download MP4"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card padding="lg" className="text-center py-16">
          <Clock className="w-10 h-10 text-aviation-muted mx-auto mb-3" />
          <h3 className="text-lg font-bold text-aviation-black font-heading">
            No Recordings Match Your Filter
          </h3>
          <p className="text-xs text-aviation-muted mt-1">
            Adjust your search keywords or status filter to see recorded classes.
          </p>
        </Card>
      )}
    </div>
  );
}
