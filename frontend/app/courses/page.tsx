import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { ArrowRight, Clock, BookOpen, ChevronRight } from "lucide-react";

export default function CoursesPage() {
  const courses = [
    {
      title: "Commercial Pilot Ground School (CPL Theory)",
      code: "AV-CPL-101",
      slug: "cpl-ground-school",
      duration: "120 Hours",
      status: "Active Batches",
      badge: "Commercial Pilot",
      description:
        "Comprehensive theoretical ground instruction covering Air Navigation, Meteorology, Air Regulations, and Technical General for aspiring commercial aviators.",
      modules: ["Air Navigation", "Aviation Meteorology", "Air Regulations", "Technical General", "Radio Telephony"],
    },
    {
      title: "Private Pilot License Theory (PPL Ground)",
      code: "AV-PPL-101",
      slug: "ppl-ground-school",
      duration: "60 Hours",
      status: "Active Batches",
      badge: "Private Pilot",
      description:
        "Foundational aviation ground school covering flight principles, cockpit instrumentation, weather basics, and flight safety for private aviators.",
      modules: ["Principles of Flight", "Cockpit Instruments", "Operational Procedures", "Human Performance"],
    },
    {
      title: "Aviation Meteorology & Weather Radar",
      code: "AV-MET-201",
      slug: "aviation-meteorology",
      duration: "45 Hours",
      status: "Enrolling Now",
      badge: "Specialized Theory",
      description:
        "Master atmospheric dynamics, high altitude jet streams, convective hazards, METAR/TAF decoding, and onboard radar interpretation.",
      modules: ["Atmospheric Physics", "Pressure Systems", "Convective Thunderstorms", "Terminal Aerodrome Forecasts"],
    },
    {
      title: "Radio Telephony Restricted (Aero) - RTR(A)",
      code: "AV-RTR-301",
      slug: "rtr-aero-prep",
      duration: "30 Hours",
      status: "Upcoming",
      badge: "Communications",
      description:
        "Standard ATC communications, radiotelephony phraseology, distress frequency protocols, and airspace transponder operations.",
      modules: ["ICAO Standard Phraseology", "Airfield Traffic Patterns", "Emergency Radio Calls", "HF/VHF Operations"],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <section className="py-16 bg-aviation-offWhite border-b border-aviation-border">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Badge variant="yellow" size="sm" className="mb-3">
              Official Ground Theory Curriculum
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-aviation-black tracking-tight font-heading">
              Aviation Ground Courses
            </h1>
            <p className="text-base text-aviation-muted mt-3">
              Structured theory programs conducted live by veteran airline pilots with 7-day recording access for rigorous exam preparation.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white flex-1">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courses.map((course) => (
              <Card key={course.slug} hoverEffect padding="none" className="flex flex-col justify-between overflow-hidden">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="yellow" size="sm">
                      {course.badge}
                    </Badge>
                    <span className="text-xs font-mono font-bold text-aviation-muted flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-aviation-yellow" />
                      {course.duration}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-aviation-black mb-3 font-heading">
                    {course.title}
                  </h2>

                  <p className="text-sm text-aviation-muted leading-relaxed mb-6">
                    {course.description}
                  </p>

                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-aviation-charcoal">
                      Key Modules:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {course.modules.map((m, i) => (
                        <span
                          key={i}
                          className="text-xs px-2.5 py-1 rounded bg-aviation-offWhite border border-aviation-border text-aviation-charcoal font-medium"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-8 py-5 bg-aviation-offWhite border-t border-aviation-border flex items-center justify-between">
                  <span className="text-xs font-mono text-aviation-muted font-bold">
                    CODE: {course.code}
                  </span>
                  <Link href={`/courses/${course.slug}`}>
                    <Button variant="dark" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                      View Syllabus & Batches
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
