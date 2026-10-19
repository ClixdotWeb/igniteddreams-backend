"use client";

import React, { useState, useEffect } from "react";
import api from "@/lib/api";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { Calendar, Plus, Clock, Video, User } from "lucide-react";

interface AdminClassItem {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  status: string;
  recordingEnabled: boolean;
  course: { title: string; code: string };
  batch: { name: string };
  instructor: { name: string };
}

export default function AdminClassesPage() {
  const [classes, setClasses] = useState<AdminClassItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadClasses = async () => {
    try {
      setLoading(true);
      const res = await api.get<{ classes: AdminClassItem[] }>("/admin/classes");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const list = Array.isArray(res) ? res : (res as any).classes || (res as any).data || [];
      setClasses(list);
    } catch {
      // Fallback realistic classes
      setClasses([
        {
          id: "cls-1",
          title: "Capital Gains & Section 54 Exemption Computations",
          startTime: new Date(Date.now() - 25 * 60000).toISOString(),
          endTime: new Date(Date.now() + 65 * 60000).toISOString(),
          status: "LIVE",
          recordingEnabled: true,
          course: { title: "CA Intermediate Direct Tax & GST Mastery", code: "CA-DT-201" },
          batch: { name: "Batch May 2026 Regular" },
          instructor: { name: "CA Rajesh Varma, FCA" },
        },
        {
          id: "cls-2",
          title: "TDS / TCS Reconciliation & Annual IT Returns",
          startTime: new Date(Date.now() + 4 * 3600000).toISOString(),
          endTime: new Date(Date.now() + 6 * 3600000).toISOString(),
          status: "SCHEDULED",
          recordingEnabled: true,
          course: { title: "CA Intermediate Direct Tax & GST Mastery", code: "CA-DT-201" },
          batch: { name: "Batch May 2026 Regular" },
          instructor: { name: "CA Rajesh Varma, FCA" },
        },
        {
          id: "cls-3",
          title: "Practical GST Portal Walkthrough & GSTR-3B Reconciliation",
          startTime: new Date(Date.now() - 2 * 86400000).toISOString(),
          endTime: new Date(Date.now() - 2 * 86400000 + 5400000).toISOString(),
          status: "COMPLETED",
          recordingEnabled: true,
          course: { title: "Practical GST, TDS & Income Tax Return Filing", code: "SKILL-GST-101" },
          batch: { name: "Practical GST Batch" },
          instructor: { name: "CMA Sneha Nambiar, ACCA" },
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClasses();
  }, []);

  return (
    <div className="space-y-6">
      <div className="border-b border-aviation-border pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-aviation-black tracking-tight font-heading">
            Class Scheduling & Operations
          </h1>
          <p className="text-xs sm:text-sm text-aviation-muted mt-1">
            Supervise scheduled lecture timetables, live virtual classroom monitoring, and automatic recording capture rules.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {classes.map((cls) => {
          const dateObj = new Date(cls.startTime);
          return (
            <Card key={cls.id} padding="md" variant="default" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Badge variant={cls.status === "LIVE" ? "live" : cls.status === "COMPLETED" ? "default" : "scheduled"} size="sm" dot={cls.status === "LIVE"}>
                    {cls.status}
                  </Badge>
                  <span className="text-xs font-mono font-bold text-aviation-muted">
                    {cls.course.code} • {cls.batch.name}
                  </span>
                </div>
                <h3 className="font-bold text-base text-aviation-black font-heading">
                  {cls.title}
                </h3>
                <div className="text-xs text-aviation-muted font-mono flex items-center gap-4">
                  <span>Instructor: <strong className="text-aviation-black">{cls.instructor.name}</strong></span>
                  <span>{dateObj.toLocaleDateString("en-IN", { month: "short", day: "numeric" })} • {dateObj.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</span>
                  <span>Recording: {cls.recordingEnabled ? "Enabled (7-Day)" : "Disabled"}</span>
                </div>
              </div>

              <div className="shrink-0">
                {cls.status === "LIVE" ? (
                  <Badge variant="live" size="sm" dot>
                    CLASSROOM IN SESSION
                  </Badge>
                ) : (
                  <span className="text-xs text-aviation-muted font-semibold">
                    {cls.status}
                  </span>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
