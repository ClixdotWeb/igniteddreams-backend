import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Clock, ArrowRight, Video, Download, ShieldCheck, CheckCircle2, User } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // Course detailed curriculum mapping
  const courseData = {
    title: slug === "cpl-ground-school"
      ? "Commercial Pilot Ground School (CPL Theory)"
      : slug === "ppl-ground-school"
      ? "Private Pilot License Theory (PPL Ground)"
      : "Aviation Meteorology & Weather Radar",
    code: slug === "cpl-ground-school" ? "AV-CPL-101" : slug === "ppl-ground-school" ? "AV-PPL-101" : "AV-MET-201",
    duration: slug === "cpl-ground-school" ? "120 Hours" : slug === "ppl-ground-school" ? "60 Hours" : "45 Hours",
    description:
      "A rigorous, structured online ground school curriculum delivered directly by airline pilots. Students participate in live interactive theory sessions with slide sharing and navigation calculators, with complete recording access for 7 days post-class.",
    modules: [
      { name: "Air Navigation & Radio Aids", hours: "35 Hours", topics: "Dead reckoning, 1 in 60 rule, VOR, DME, ILS, GNSS flight management systems." },
      { name: "Aviation Meteorology", hours: "30 Hours", topics: "Atmosphere layers, pressure systems, jet streams, icing hazards, thunderstorm squall lines." },
      { name: "Air Regulations & Procedures", hours: "25 Hours", topics: "ICAO Annexes, airspace classifications, right of way, minimum flight altitudes." },
      { name: "Technical General & Aircraft Systems", hours: "30 Hours", topics: "Aerodynamic lift/drag, aircraft performance charts, turbine and piston engines, electrical busses." },
    ],
    instructor: {
      name: "Capt. Vikram Malhotra",
      title: "Chief Ground Instructor",
      experience: "Senior Airline Captain • 6,500+ Flight Hours",
    },
    batches: [
      { name: "Batch Alpha - Morning Session", time: "09:00 - 11:00 IST", status: "Active (Enrollment Open)" },
      { name: "Batch Bravo - Evening Session", time: "18:30 - 20:30 IST", status: "Upcoming Starting Next Week" },
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* Hero Header */}
      <section className="py-16 bg-aviation-offWhite border-b border-aviation-border">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="yellow" size="sm">
                Ground Theory
              </Badge>
              <span className="text-xs font-mono font-bold text-aviation-muted">
                {courseData.code}
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-aviation-black tracking-tight font-heading mb-4">
              {courseData.title}
            </h1>
            <p className="text-base text-aviation-muted leading-relaxed mb-6">
              {courseData.description}
            </p>
            <div className="flex flex-wrap items-center gap-6 text-sm text-aviation-charcoal font-semibold">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-aviation-yellowDeep" />
                <span>{courseData.duration} Total Instruction</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Video className="w-4 h-4 text-aviation-yellowDeep" />
                <span>Live Interactive Classes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Download className="w-4 h-4 text-aviation-yellowDeep" />
                <span>7-Day MP4 Replay & Download</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content Grid */}
      <section className="py-16 bg-white flex-1">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Content: Syllabus */}
            <div className="lg:col-span-8 space-y-10">
              <div>
                <h2 className="text-2xl font-bold text-aviation-black font-heading mb-6">
                  Detailed Syllabus & Modules
                </h2>
                <div className="space-y-4">
                  {courseData.modules.map((m, idx) => (
                    <Card key={idx} padding="md" variant="default">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-aviation-black font-heading">
                          Module {idx + 1}: {m.name}
                        </h3>
                        <span className="text-xs font-mono font-bold text-aviation-yellowDeep px-2 py-0.5 rounded bg-aviation-yellow/10">
                          {m.hours}
                        </span>
                      </div>
                      <p className="text-sm text-aviation-muted">
                        {m.topics}
                      </p>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Dedicated 7-day recording policy reminder */}
              <Card variant="accent" padding="md">
                <h3 className="text-base font-bold text-aviation-black font-heading mb-1 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-aviation-yellowDeep" />
                  Recording Lifecycle for this Course
                </h3>
                <p className="text-sm text-aviation-muted leading-relaxed">
                  Every lecture conducted under this curriculum is automatically captured in 720p HD. You can review flight plots and formulas on-demand or download MP4s directly to your device within 7 days from class completion.
                </p>
              </Card>
            </div>

            {/* Right Sidebar: Batches & Enrollment */}
            <div className="lg:col-span-4 space-y-6">
              <Card variant="default" padding="lg" className="border-2 border-aviation-border">
                <h3 className="text-xl font-bold text-aviation-black font-heading mb-4">
                  Active Batches
                </h3>
                <div className="space-y-4 mb-6">
                  {courseData.batches.map((b, i) => (
                    <div key={i} className="p-3.5 rounded-lg bg-aviation-offWhite border border-aviation-border">
                      <div className="font-bold text-sm text-aviation-black">{b.name}</div>
                      <div className="text-xs font-mono text-aviation-muted mt-1">{b.time}</div>
                      <Badge variant="yellow" size="sm" className="mt-2">
                        {b.status}
                      </Badge>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-aviation-border space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-aviation-black text-aviation-yellow flex items-center justify-center font-bold">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-aviation-black">{courseData.instructor.name}</div>
                      <div className="text-[11px] text-aviation-muted">{courseData.instructor.title}</div>
                    </div>
                  </div>

                  <Link href="/register" className="block pt-2">
                    <Button variant="primary" className="w-full" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                      Enroll in Batch
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
