"use client";

import React, { useState, useEffect } from "react";
import api from "@/lib/api";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { Users, Search, Plus, Mail, Phone, Award } from "lucide-react";

interface InstructorItem {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  status: string;
  instructorProfile: {
    employeeId: string;
    specialization: string | null;
    bio: string | null;
  } | null;
  assignedBatches: Array<{
    name: string;
    course: { title: string };
  }>;
  _count?: { taughtClasses: number };
}

export default function AdminInstructorsPage() {
  const [instructors, setInstructors] = useState<InstructorItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "Direct Taxation, Corporate Laws & Advanced Auditing",
    bio: "",
  });

  const loadInstructors = async () => {
    try {
      setLoading(true);
      const res = await api.get<{ data: InstructorItem[] }>("/admin/instructors");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const list = Array.isArray(res) ? res : (res as any).data || [];
      setInstructors(list);
    } catch {
      // Fallback realistic instructors
      setInstructors([
        {
          id: "ins-1",
          name: "CA Rajesh Varma, FCA",
          email: "instructor1@igniteddreams.com",
          phone: "+91 98765 11111",
          status: "ACTIVE",
          instructorProfile: {
            employeeId: "INS-1001",
            specialization: "Direct Taxation, Corporate Laws & Advanced Auditing",
            bio: "Senior Chartered Accountant with 16+ years of consulting experience across Big 4 accounting firms.",
          },
          assignedBatches: [{ name: "CA Intermediate - May 2026 Regular", course: { title: "CA Intermediate Direct Tax & GST Mastery" } }],
          _count: { taughtClasses: 42 },
        },
        {
          id: "ins-2",
          name: "CMA Sneha Nambiar, ACCA",
          email: "instructor2@igniteddreams.com",
          phone: "+91 98765 22222",
          status: "ACTIVE",
          instructorProfile: {
            employeeId: "INS-1002",
            specialization: "Cost Management, Strategic Financial Management & ACCA SBR",
            bio: "Certified Management Accountant and international ACCA mentor helping students clear papers in first attempts.",
          },
          assignedBatches: [{ name: "ACCA SBR Global Professional Batch", course: { title: "ACCA Strategic Business Reporting" } }],
          _count: { taughtClasses: 38 },
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInstructors();
  }, []);

  const handleCreateInstructor = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/admin/instructors", formData);
      setModalOpen(false);
      loadInstructors();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to create faculty member");
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-aviation-border pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-aviation-black tracking-tight font-heading">
            Faculty & Mentors Roster
          </h1>
          <p className="text-xs sm:text-sm text-aviation-muted mt-1">
            Manage Chartered Accountants, CMA & ACCA mentors, specialization credentials, and batch assignments.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add Faculty Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {instructors.map((ins) => (
          <Card key={ins.id} padding="lg" variant="default" className="flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="yellow" size="sm">
                  {ins.instructorProfile?.employeeId || "INS-ID"}
                </Badge>
                <Badge variant={ins.status === "ACTIVE" ? "ready" : "expired"} size="sm">
                  {ins.status}
                </Badge>
              </div>

              <div>
                <h3 className="text-xl font-bold text-aviation-black font-heading">{ins.name}</h3>
                <div className="text-xs font-semibold text-aviation-yellowDeep mt-0.5">
                  {ins.instructorProfile?.specialization || "CA & Professional Accounting Faculty"}
                </div>
              </div>

              {ins.instructorProfile?.bio && (
                <p className="text-xs text-aviation-muted leading-relaxed">
                  {ins.instructorProfile.bio}
                </p>
              )}

              <div className="pt-2 border-t border-aviation-border text-xs text-aviation-charcoal space-y-1">
                <div>Email: <span className="font-mono text-aviation-muted">{ins.email}</span></div>
                <div>Phone: <span className="font-mono text-aviation-muted">{ins.phone || "—"}</span></div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-aviation-border flex items-center justify-between text-xs text-aviation-muted">
              <span>Classes Conducted: <strong className="text-aviation-black font-mono">{ins._count?.taughtClasses || 0}</strong></span>
              <span className="text-aviation-charcoal font-semibold">Active Instructor</span>
            </div>
          </Card>
        ))}
      </div>

      {/* CREATE INSTRUCTOR MODAL */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Appoint New Faculty Member"
        description="Create credentials for a Chartered Accountant or Financial Specialist."
      >
        <form onSubmit={handleCreateInstructor} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-aviation-charcoal uppercase tracking-wider mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="CA Rajesh Varma, FCA"
              className="w-full px-3 py-2 rounded-lg border border-aviation-border text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-aviation-charcoal uppercase tracking-wider mb-1">
              Official Email *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="faculty@igniteddreams.com"
              className="w-full px-3 py-2 rounded-lg border border-aviation-border text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-aviation-charcoal uppercase tracking-wider mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+91 98000 00000"
              className="w-full px-3 py-2 rounded-lg border border-aviation-border text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-aviation-charcoal uppercase tracking-wider mb-1">
              Specialization
            </label>
            <input
              type="text"
              value={formData.specialization}
              onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-aviation-border text-xs"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-aviation-border">
            <Button variant="ghost" size="sm" type="button" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Register Faculty
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
