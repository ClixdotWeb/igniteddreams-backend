import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import {
  Compass,
  ArrowRight,
  Video,
  Clock,
  Download,
  Shield,
  Layers,
  CheckCircle2,
  Users,
  Airplay,
  ChevronRight,
  Calendar,
  BookOpen,
  Sparkles,
} from "lucide-react";

export default function HomePage() {
  const courses = [
    {
      title: "Commercial Pilot Ground School (CPL Theory)",
      code: "AV-CPL-101",
      slug: "cpl-ground-school",
      duration: "120 Hours",
      description:
        "Comprehensive theoretical ground instruction covering Air Navigation, Meteorology, Air Regulations, and Technical General for aspiring commercial aviators.",
      badge: "Commercial Pilot",
    },
    {
      title: "Private Pilot License Theory (PPL Ground)",
      code: "AV-PPL-101",
      slug: "ppl-ground-school",
      duration: "60 Hours",
      description:
        "Foundational aviation ground school covering flight principles, cockpit instrumentation, weather basics, and flight safety for private aviators.",
      badge: "Private Pilot",
    },
    {
      title: "Aviation Meteorology & Weather Radar",
      code: "AV-MET-201",
      slug: "aviation-meteorology",
      duration: "45 Hours",
      description:
        "Master atmospheric dynamics, high-altitude jet streams, convective hazards, METAR/TAF decoding, and onboard radar interpretation.",
      badge: "Specialized Ground",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Register & Onboard",
      desc: "Create your student account and complete your academy enrollment verification.",
    },
    {
      number: "02",
      title: "Join Your Course",
      desc: "Get assigned to your dedicated batch and view your scheduled live class timetable.",
    },
    {
      number: "03",
      title: "Attend Live Class",
      desc: "Engage directly with airline captain instructors in high-definition virtual classrooms.",
    },
    {
      number: "04",
      title: "Watch Recording",
      desc: "Access the full session recording on your student dashboard immediately post-session.",
    },
    {
      number: "05",
      title: "Download Before Expiry",
      desc: "Download high-speed MP4 copies of the lecture to your local device within the 7-day window.",
    },
    {
      number: "06",
      title: "Continue Learning",
      desc: "Track your real attendance percentages and prepare for upcoming flight theory sessions.",
    },
  ];

  const faqs = [
    {
      q: "How do live online classes work?",
      a: "Classes are held live on our custom virtual classroom platform powered by LiveKit Cloud. You get real-time audio/video, instructor screen sharing, and interactive class chat directly in your browser without requiring third-party software.",
    },
    {
      q: "Where can I join my class?",
      a: "When a class is scheduled or active, you will see a 'LIVE NOW' banner on your Student Dashboard with a direct 1-click 'Join Live Class' button starting 15 minutes before scheduled departure.",
    },
    {
      q: "Will classes be recorded?",
      a: "Yes. All live classes conducted by instructors are automatically recorded in 720p HD composite layout capturing instructor video, shared navigation charts, and slides.",
    },
    {
      q: "How long are class recordings available?",
      a: "Recordings remain available in your Student Dashboard for exactly 7 days from the moment they are processed. A countdown ticker displays the exact hours remaining.",
    },
    {
      q: "Can I download the recording?",
      a: "Yes! Students can download the official class MP4 recording directly from the video player or recordings dashboard at any time during the active 7-day retention period.",
    },
    {
      q: "What happens after 7 days?",
      a: "After 7 days pass, playback and downloads are automatically disabled by the server, and the video object is permanently decommissioned from storage according to academy policy.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden border-b border-aviation-border">
        {/* Subtle decorative grid background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />

        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-aviation-offWhite border border-aviation-border text-xs font-semibold text-aviation-charcoal">
                <span className="w-2 h-2 rounded-full bg-aviation-yellow"></span>
                <span>Aviation Flight Ground School Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-aviation-black tracking-tight leading-[1.1]">
                Build Your <br />
                <span className="relative inline-block">
                  Aviation Future
                  <span className="absolute left-0 bottom-1 w-full h-3 bg-aviation-yellow/30 -z-10 rounded"></span>
                </span>
              </h1>

              <p className="text-base sm:text-lg text-aviation-muted max-w-xl leading-relaxed">
                Learn through structured aviation training with live interactive classes and on-demand class recordings available for 7 days.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link href="/courses">
                  <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                    Explore Courses
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="dark" size="lg">
                    Student Login
                  </Button>
                </Link>
              </div>

              {/* Trust Metric Strip */}
              <div className="pt-8 border-t border-aviation-border grid grid-cols-3 gap-6 max-w-lg">
                <div>
                  <div className="text-2xl font-extrabold text-aviation-black font-heading">
                    7-Day
                  </div>
                  <div className="text-xs text-aviation-muted font-medium mt-0.5">
                    Class Replay Window
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-aviation-black font-heading">
                    100%
                  </div>
                  <div className="text-xs text-aviation-muted font-medium mt-0.5">
                    Live Interactive WebRTC
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-aviation-black font-heading">
                    Full HD
                  </div>
                  <div className="text-xs text-aviation-muted font-medium mt-0.5">
                    MP4 Downloads
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual: Live Classroom Simulation Tile */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-aviation-black p-4 sm:p-5 shadow-elevated border border-aviation-charcoal">
                {/* Window top bar */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs">
                  <div className="flex items-center gap-2">
                    <Badge variant="live" size="sm" dot>
                      LIVE CLASSROOM
                    </Badge>
                    <span className="text-gray-400 font-mono text-[11px] truncate max-w-[140px]">
                      flight_cpl_live
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-400 text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>1080p WebRTC</span>
                  </div>
                </div>

                {/* Simulated Main Stage: Navigation Plotting */}
                <div className="relative aspect-video rounded-xl bg-aviation-charcoal overflow-hidden border border-white/5 flex flex-col justify-between p-4">
                  {/* Subtle runway grid visual background */}
                  <div className="absolute inset-0 bg-runway-dots opacity-20 pointer-events-none" />

                  {/* Flight radar mock visual */}
                  <div className="relative z-10 flex items-start justify-between">
                    <div className="bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[11px]">
                      <span className="text-aviation-yellow font-bold">COURSE:</span>{" "}
                      <span className="text-white font-medium">Air Navigation & Flight Planning</span>
                    </div>
                    <div className="bg-red-600/90 text-white font-bold px-2 py-0.5 rounded text-[10px] tracking-wider animate-live-pulse">
                      REC ● 00:24:18
                    </div>
                  </div>

                  {/* Central chart simulation representation */}
                  <div className="relative z-10 flex flex-col items-center justify-center py-6 text-center">
                    <div className="w-14 h-14 rounded-full bg-aviation-yellow/10 border border-aviation-yellow/30 flex items-center justify-center text-aviation-yellow mb-2">
                      <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: "20s" }} />
                    </div>
                    <div className="text-xs font-mono text-gray-300">
                      HEADING: 285° | ALT: 8,500 FT | TAS: 145 KTS
                    </div>
                  </div>

                  {/* Floating Instructor PIP */}
                  <div className="absolute bottom-3 right-3 w-32 aspect-video rounded-lg bg-aviation-softBlack border border-aviation-yellow/40 shadow-card overflow-hidden flex flex-col justify-between p-1.5">
                    <div className="text-[9px] font-semibold text-aviation-yellow px-1">
                      Capt. Vikram Malhotra
                    </div>
                    <div className="flex items-center justify-between text-[8px] text-gray-400 px-1">
                      <span>Instructor</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    </div>
                  </div>
                </div>

                {/* Control simulation bar */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-white">
                      <Video className="w-3.5 h-3.5 text-aviation-yellow" />
                    </div>
                    <span className="text-[11px]">Instructor Camera On</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="yellow" size="sm">
                      Egress Recording Active
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ACADEMY INTRODUCTION & PILLARS */}
      <section className="py-20 bg-aviation-offWhite border-b border-aviation-border">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <h2 className="text-xs uppercase font-bold tracking-widest text-aviation-yellowDeep mb-2 font-heading">
              Aviation Ground School Standard
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-aviation-black tracking-tight font-heading">
              Built for Aspiring Aviators & Airlines
            </h3>
            <p className="text-base text-aviation-muted mt-3">
              Ground theory is the foundation of aviation safety and piloting excellence. IgnitedDreams combines live online captain instruction with 7-day revision access.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card hoverEffect padding="lg" variant="default">
              <div className="w-12 h-12 rounded-xl bg-aviation-black text-aviation-yellow flex items-center justify-center mb-6">
                <Video className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-aviation-black mb-3 font-heading">
                Live Interactive Virtual Classrooms
              </h4>
              <p className="text-sm text-aviation-muted leading-relaxed">
                Real-time audio, video, slide presentations, and cross-country calculations conducted live with zero software installs.
              </p>
            </Card>

            <Card hoverEffect padding="lg" variant="accent">
              <div className="w-12 h-12 rounded-xl bg-aviation-yellow text-aviation-black flex items-center justify-center mb-6 font-bold">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-aviation-black mb-3 font-heading">
                7-Day Recording Lifecycle
              </h4>
              <p className="text-sm text-aviation-muted leading-relaxed">
                Every class session is recorded in 720p HD and available for exactly 7 days. Watch on-demand and download to retain your study materials.
              </p>
            </Card>

            <Card hoverEffect padding="lg" variant="default">
              <div className="w-12 h-12 rounded-xl bg-aviation-black text-aviation-yellow flex items-center justify-center mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-aviation-black mb-3 font-heading">
                Secure Cloudflare R2 Media
              </h4>
              <p className="text-sm text-aviation-muted leading-relaxed">
                Zero recording files are exposed publicly. Students access lectures through short-lived presigned URLs with strict server-side expiry.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* 3. COURSES SECTION */}
      <section className="py-20 bg-white border-b border-aviation-border">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-xs uppercase font-bold tracking-widest text-aviation-yellowDeep mb-2 font-heading">
                Curriculum
              </h2>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-aviation-black tracking-tight font-heading">
                Aviation Ground Courses
              </h3>
            </div>
            <Link href="/courses">
              <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View All Courses
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map((course) => (
              <Card key={course.slug} hoverEffect padding="none" className="overflow-hidden flex flex-col justify-between">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="yellow" size="sm">
                      {course.badge}
                    </Badge>
                    <span className="text-xs font-mono text-aviation-muted font-bold">
                      {course.duration}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-aviation-black mb-2 font-heading leading-snug">
                    {course.title}
                  </h4>
                  <p className="text-sm text-aviation-muted leading-relaxed mb-4">
                    {course.description}
                  </p>
                </div>
                <div className="px-6 py-4 bg-aviation-offWhite border-t border-aviation-border flex items-center justify-between">
                  <span className="text-xs font-mono text-aviation-charcoal font-semibold">
                    CODE: {course.code}
                  </span>
                  <Link href={`/courses/${course.slug}`}>
                    <span className="text-xs font-bold text-aviation-black hover:text-aviation-yellowDeep flex items-center gap-1 transition-colors">
                      Course Details <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 7-DAY RECORDING ADVANTAGE (HIGHLIGHT FEATURE) */}
      <section id="recordings" className="py-20 lg:py-28 bg-aviation-black text-white relative overflow-hidden">
        {/* Runway line background accent */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-aviation-yellow to-transparent" />

        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left explanation */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-aviation-yellow text-xs font-bold uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" />
                <span>Centralized 7-Day Lifecycle Policy</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading leading-tight">
                Your Class. <br />
                <span className="text-aviation-yellow">Available for 7 Days.</span>
              </h2>

              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                After each live class concludes, the composite recording is rendered and delivered directly to authorized student dashboards.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-aviation-yellow text-aviation-black flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Watch & Replay Anytime</h4>
                    <p className="text-sm text-gray-400">
                      High-definition classroom playback with seek controls, playback speeds up to 2x, and mobile compatibility.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-aviation-yellow text-aviation-black flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Direct MP4 Download</h4>
                    <p className="text-sm text-gray-400">
                      Download the complete session to your laptop or tablet for permanent offline aviation study before 7 days expire.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-aviation-yellow text-aviation-black flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Automated Expiry & Cleanup</h4>
                    <p className="text-sm text-gray-400">
                      After 7 days, access and downloads are disabled server-side, protecting storage costs and enforcing timely student review.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link href="/login">
                  <Button variant="primary" size="lg" rightIcon={<Download className="w-4 h-4" />}>
                    Student Recordings Portal
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right: Lifecycle Step Card */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl bg-aviation-charcoal/80 border border-white/10 p-6 sm:p-8 space-y-6">
                <h3 className="text-lg font-bold text-white font-heading flex items-center justify-between">
                  <span>Recording Lifecycle Pipeline</span>
                  <Badge variant="yellow" size="sm">
                    Automated
                  </Badge>
                </h3>

                <div className="space-y-4">
                  {/* Step 1 */}
                  <div className="p-4 rounded-xl bg-aviation-black/60 border border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-xs">
                        LIVE
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">LiveKit Composite Egress</div>
                        <div className="text-xs text-gray-400">720p @ 30fps room capture</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-gray-400">01</span>
                  </div>

                  {/* Step 2 */}
                  <div className="p-4 rounded-xl bg-aviation-black/60 border border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-aviation-yellow/20 text-aviation-yellow flex items-center justify-center font-bold text-xs">
                        R2
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Private Cloudflare R2 Upload</div>
                        <div className="text-xs text-gray-400">Zero VPS disk burden, webhook verified</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-gray-400">02</span>
                  </div>

                  {/* Step 3 */}
                  <div className="p-4 rounded-xl bg-aviation-yellow/10 border border-aviation-yellow/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-aviation-yellow text-aviation-black flex items-center justify-center font-bold text-xs">
                        7D
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Available For 7 Days</div>
                        <div className="text-xs text-aviation-yellow">Watch + Download enabled for batch students</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-aviation-yellow">ACTIVE</span>
                  </div>

                  {/* Step 4 */}
                  <div className="p-4 rounded-xl bg-aviation-black/60 border border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-700 text-gray-300 flex items-center justify-center font-bold text-xs">
                        DEL
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Hourly Automated Cron Deletion</div>
                        <div className="text-xs text-gray-400">R2 object deleted, playback disabled, audited</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-gray-400">04</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="py-20 bg-white border-b border-aviation-border">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs uppercase font-bold tracking-widest text-aviation-yellowDeep mb-2 font-heading">
              Flight Plan
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-aviation-black tracking-tight font-heading">
              How Academy Learning Works
            </h3>
            <p className="text-base text-aviation-muted mt-3">
              A structured operational workflow designed to take you from enrollment to theory mastery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative p-6 rounded-xl border border-aviation-border bg-white hover:border-aviation-charcoal/30 transition-colors shadow-subtle flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl font-extrabold font-mono text-aviation-yellow mb-4 block">
                    {step.number}
                  </span>
                  <h4 className="text-lg font-bold text-aviation-black mb-2 font-heading">
                    {step.title}
                  </h4>
                  <p className="text-sm text-aviation-muted leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section className="py-20 bg-aviation-offWhite border-b border-aviation-border">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs uppercase font-bold tracking-widest text-aviation-yellowDeep mb-2 font-heading">
              Answers
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-aviation-black tracking-tight font-heading">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqs.map((faq, idx) => (
              <Card key={idx} padding="md" variant="default">
                <h4 className="text-base font-bold text-aviation-black mb-2 font-heading">
                  {faq.q}
                </h4>
                <p className="text-sm text-aviation-muted leading-relaxed">
                  {faq.a}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA BANNER */}
      <section className="py-16 bg-white">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-aviation-black p-8 sm:p-12 lg:p-16 text-center text-white relative overflow-hidden border border-aviation-charcoal">
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading">
                Ready to Begin Your Aviation Theory?
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Join enrolled students in live classes, ask questions in real-time, and retain full 7-day replay and download access.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <Link href="/register">
                  <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                    Enroll as Student
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="dark" size="lg">
                    Contact Academy
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
