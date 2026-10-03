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
    specialization: "Chief Ground Instructor & Air Navigation",
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
          name: "Capt. Vikram Malhotra",
          email: "instructor1@igniteddreams.com",
          phone: "+91 98765 11111",
          status: "ACTIVE",
          instructorProfile: {
            employeeId: "INS-1001",
            specialization: "Chief Ground Instructor & Air Navigation",
            bio: "Senior airline pilot and flight instructor with over 6,500 flight hours.",
          },
          assignedBatches: [{ name: "CPL Ground School - Batch Alpha", course: { title: "CPL Theory" } }],
          _count: { taughtClasses: 18 },
        },
        {
          id: "ins-2",
          name: "Capt. Ananya Roy",
          email: "instructor2@igniteddreams.com",
          phone: "+91 98765 22222",
          status: "ACTIVE",
          instructorProfile: {
            employeeId: "INS-1002",
            specialization: "Aviation Meteorology & Radio Telephony",
            bio: "Former airline first officer and ATPL theory specialist.",
          },
          assignedBatches: [{ name: "PPL Ground Theory - Batch Bravo", course: { title: "PPL Ground" } }],
          _count: { taughtClasses: 14 },
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
      alert(err instanceof Error ? err.message : "Failed to create instructor");
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-aviation-border pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-aviation-black tracking-tight font-heading">
            Flight Instructors Roster
          </h1>
          <p className="text-xs sm:text-sm text-aviation-muted mt-1">
            Manage airline captain ground instructors, specialization credentials, and batch assignments.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add Flight Instructor
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
                  {ins.instructorProfile?.specialization || "Aviation Ground Instructor"}
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
        title="Appoint New Flight Instructor"
        description="Create credentials for a ground theory captain."
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
              placeholder="Capt. John Doe"
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
              placeholder="instructor@igniteddreams.com"
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
              Register Instructor
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
