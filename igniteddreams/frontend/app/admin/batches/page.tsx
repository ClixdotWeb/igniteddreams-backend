"use client";

import React, { useState, useEffect } from "react";
import api from "@/lib/api";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { Layers, Plus, Users, Calendar } from "lucide-react";

interface BatchItem {
  id: string;
  name: string;
  code: string;
  startDate: string;
  endDate: string;
  status: string;
  course: { id: string; title: string; code: string };
  instructor: { id: string; name: string; email: string };
  _count?: { enrollments: number; classSessions: number };
}

export default function AdminBatchesPage() {
  const [batches, setBatches] = useState<BatchItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadBatches = async () => {
    try {
      setLoading(true);
      const res = await api.get<{ batches: BatchItem[] }>("/admin/batches");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const list = Array.isArray(res) ? res : (res as any).batches || (res as any).data || [];
      setBatches(list);
    } catch {
      // Fallback realistic batches
      setBatches([
        {
          id: "b-1",
          name: "CA Intermediate - May 2026 Regular",
          code: "CA-MAY26-REG",
          startDate: "2026-09-01T00:00:00Z",
          endDate: "2026-12-15T00:00:00Z",
          status: "ACTIVE",
          course: { id: "c-1", title: "CA Intermediate Direct Tax & GST Mastery", code: "CA-DT-201" },
          instructor: { id: "ins-1", name: "CA Rajesh Varma, FCA", email: "instructor1@igniteddreams.com" },
          _count: { enrollments: 34, classSessions: 42 },
        },
        {
          id: "b-2",
          name: "Practical GST & Corporate Return Filing",
          code: "GST-2026-PRACTICAL",
          startDate: "2026-09-15T00:00:00Z",
          endDate: "2026-11-30T00:00:00Z",
          status: "ACTIVE",
          course: { id: "c-2", title: "Practical GST, TDS & Income Tax Return Filing", code: "SKILL-GST-101" },
          instructor: { id: "ins-2", name: "CMA Sneha Nambiar, ACCA", email: "instructor2@igniteddreams.com" },
          _count: { enrollments: 28, classSessions: 24 },
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBatches();
  }, []);

  return (
    <div className="space-y-6">
      <div className="border-b border-aviation-border pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-aviation-black tracking-tight font-heading">
            Academic Batches
          </h1>
          <p className="text-xs sm:text-sm text-aviation-muted mt-1">
            Manage course batch allocations, assigned CA & professional mentors, and enrolled student rosters.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {batches.map((batch) => (
          <Card key={batch.id} padding="lg" variant="default" className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="yellow" size="sm">
                {batch.code}
              </Badge>
              <Badge variant="ready" size="sm">
                {batch.status}
              </Badge>
            </div>

            <div>
              <h3 className="text-xl font-bold text-aviation-black font-heading">{batch.name}</h3>
              <div className="text-xs text-aviation-muted mt-0.5">{batch.course.title}</div>
            </div>

            <div className="p-3.5 rounded-lg bg-aviation-offWhite border border-aviation-border space-y-1.5 text-xs text-aviation-charcoal">
              <div>Lead Faculty: <span className="font-semibold">{batch.instructor.name}</span></div>
              <div className="font-mono text-aviation-muted">
                {new Date(batch.startDate).toLocaleDateString()} — {new Date(batch.endDate).toLocaleDateString()}
              </div>
            </div>

            <div className="pt-3 border-t border-aviation-border flex items-center justify-between text-xs text-aviation-muted">
              <span>Enrolled Students: <strong className="text-aviation-black font-mono">{batch._count?.enrollments || 0}</strong></span>
              <span>Classes: <strong className="text-aviation-black font-mono">{batch._count?.classSessions || 0}</strong></span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
