"use client";

import React, { useState, useMemo, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Search,
  Bookmark,
  Calendar,
  CheckCircle2,
  Download,
  Play,
  Pause,
  X,
  Clock,
  ShieldCheck,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Layers,
  FileText,
  Check,
  Lock,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface Chapter {
  time: string;
  seconds: number;
  title: string;
}

interface Recording {
  id: string;
  title: string;
  category: string;
  categoryTag: string;
  date: string;
  duration: string;
  durationSeconds: number;
  instructor: {
    name: string;
    avatar: string;
    role: string;
  };
  progress: number; // 0 to 100
  isSaved: boolean;
  thumbnail: string;
  previewVideoUrl?: string;
  daysRemaining: number;
  fileSize: string;
  chapters: Chapter[];
  description: string;
}

const RECORDINGS_DATA: Recording[] = [
  {
    id: "rec-1",
    title: "Multimodal Freight Operations & Container Logistics Execution",
    category: "Transportation & Logistics",
    categoryTag: "LOGISTICS CORE (6-MONTH BATCH)",
    date: "Oct 8, 2026",
    duration: "1:58:45",
    durationSeconds: 7125,
    instructor: {
      name: "Justin Burnard Dias",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      role: "Project Coordinator & Lead Mentor (16 Yrs Experience)",
    },
    progress: 72,
    isSaved: true,
    thumbnail: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=85",
    daysRemaining: 6,
    fileSize: "1.2 GB",
    chapters: [
      { time: "00:00", seconds: 0, title: "Multimodal Logistics Network Architecture & IncoTerms 2020" },
      { time: "28:10", seconds: 1690, title: "Container Freight Stations (CFS) & Port Terminal Flow" },
      { time: "55:30", seconds: 3330, title: "Bill of Lading (B/L) Validation & Customs Manifest" },
      { time: "1:22:45", seconds: 4965, title: "Live Doubt Clearing & Student Case Discussion" },
    ],
    description:
      "Interactive 3-hour live masterclass covering container freight routing, multimodal shipping documentation, and freight forwarder operations across Indian and global ports.",
  },
  {
    id: "rec-2",
    title: "SAP S/4HANA Logistics Execution: VL01N Delivery & Transfer Orders",
    category: "ERP & Technology",
    categoryTag: "SAP LOGISTICS LAB",
    date: "Oct 7, 2026",
    duration: "1:54:12",
    durationSeconds: 6852,
    instructor: {
      name: "Justin Burnard Dias & Trainers",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      role: "Lead Mentor & Specialized ERP Trainers",
    },
    progress: 35,
    isSaved: false,
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=85",
    daysRemaining: 5,
    fileSize: "1.1 GB",
    chapters: [
      { time: "00:00", seconds: 0, title: "SAP S/4HANA Enterprise Structure in Logistics" },
      { time: "32:10", seconds: 1930, title: "Creating Outbound Delivery (VL01N) & Picking Orders" },
      { time: "1:05:40", seconds: 3940, title: "Post Goods Issue (PGI) & Inventory Movement Simulation" },
      { time: "1:35:00", seconds: 5700, title: "Doubt Clearance & Student Terminal Practice" },
    ],
    description:
      "Hands-on SAP ERP module demonstrating real-time transaction processing for warehouse dispatches, transfer orders, and automated stock reconciliation.",
  },
  {
    id: "rec-3",
    title: "Aviation Management & Airport Ground Handling Operations",
    category: "Aviation Management",
    categoryTag: "AIRPORT OPERATIONS",
    date: "Oct 5, 2026",
    duration: "2:02:15",
    durationSeconds: 7335,
    instructor: {
      name: "Justin Burnard Dias",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      role: "16 Years Logistics & Aviation Specialist",
    },
    progress: 100,
    isSaved: true,
    thumbnail: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=85",
    daysRemaining: 4,
    fileSize: "1.3 GB",
    chapters: [
      { time: "00:00", seconds: 0, title: "Airport Ramp Management, Safety Envelopes & Marshalling" },
      { time: "35:20", seconds: 2120, title: "Air Cargo Palletization, Unit Load Devices (ULD) & DGR" },
      { time: "1:15:10", seconds: 4510, title: "Airline Customer Service & Terminal Baggage Tracing" },
      { time: "1:40:00", seconds: 6000, title: "1-Hour Interactive Doubt Clearing Q&A" },
    ],
    description:
      "Airport operations and ground handling masterclass focusing on ramp safety, baggage sorting systems, air cargo airway bills (AWB), and turnaround coordination.",
  },
  {
    id: "rec-4",
    title: "FMCG Supply Chain: Warehousing & Transport for Production Units",
    category: "Integrated Projects",
    categoryTag: "CO-OPERATIVE PRODUCTION LINK",
    date: "Oct 4, 2026",
    duration: "1:48:30",
    durationSeconds: 6510,
    instructor: {
      name: "Justin Burnard Dias",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      role: "Project Coordinator • ID Integrated",
    },
    progress: 15,
    isSaved: false,
    thumbnail: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=85",
    daysRemaining: 3,
    fileSize: "980 MB",
    chapters: [
      { time: "00:00", seconds: 0, title: "Connecting Village Production Units to Central Distribution" },
      { time: "28:15", seconds: 1695, title: "Packaging Standards for Confectionery, Toffees & Chocolates" },
      { time: "58:40", seconds: 3520, title: "Primary Route Optimization & 10%-20% Co-op Logistics" },
      { time: "1:25:00", seconds: 5100, title: "Student Questions & Transport Scheduling" },
    ],
    description:
      "Operational case study on how Skill Academy logistics trainees manage the warehousing, quality packaging, and dispatch of goods produced by ID Co-operative units.",
  },
  {
    id: "rec-5",
    title: "Professional Business English & Interactive Viva Training",
    category: "Soft Skills & English",
    categoryTag: "INTERACTIVE VIVA LAB",
    date: "Oct 3, 2026",
    duration: "1:52:40",
    durationSeconds: 6760,
    instructor: {
      name: "Specialized English Faculty",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      role: "Corporate Language & Viva Coach",
    },
    progress: 45,
    isSaved: false,
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=85",
    daysRemaining: 2,
    fileSize: "1.05 GB",
    chapters: [
      { time: "00:00", seconds: 0, title: "Corporate Logistics Vocabulary & Email Etiquette" },
      { time: "30:40", seconds: 1840, title: "Client Handling & Freight Negotiation Conversations" },
      { time: "1:05:10", seconds: 3910, title: "Viva Mock Interview Board & Student Roleplay" },
      { time: "1:35:00", seconds: 5700, title: "Individual Pronunciation & Fluency Feedback" },
    ],
    description:
      "Interactive English communication module sourced from premier Indian providers, training students for multinational logistics viva exams and corporate interviews.",
  },
  {
    id: "rec-6",
    title: "Customs Clearing, EXIM Documentation & Port Freight Regulations",
    category: "Transportation & Logistics",
    categoryTag: "EXIM & CUSTOMS",
    date: "Oct 2, 2026",
    duration: "1:56:15",
    durationSeconds: 6975,
    instructor: {
      name: "Justin Burnard Dias",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      role: "16 Years Logistics & Aviation Specialist",
    },
    progress: 90,
    isSaved: true,
    thumbnail: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=85",
    daysRemaining: 1,
    fileSize: "1.15 GB",
    chapters: [
      { time: "00:00", seconds: 0, title: "Customs Act, ICEGATE Portal Filing & Shipping Bills" },
      { time: "34:10", seconds: 2050, title: "Duty Drawback, EPCG Scheme & Bonded Warehouses" },
      { time: "1:10:45", seconds: 4245, title: "Cocoa & Agri Export Regulatory Compliance" },
      { time: "1:38:00", seconds: 5880, title: "Final Doubt Clearing & Weekend Project Prompt" },
    ],
    description:
      "Deep dive into export/import procedures, ICEGATE filing, customs duties, bonded warehouse operations, and export clearance protocols.",
  },
];


export default function RecordingsPage() {
  const [recordings, setRecordings] = useState<Recording[]>(RECORDINGS_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [activeModalRecording, setActiveModalRecording] = useState<Recording | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Subscription gating state
  const [isSubscribed, setIsSubscribed] = useState<boolean>(true);
  const [showSubscriptionGate, setShowSubscriptionGate] = useState<boolean>(false);

  // Video player modal state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState(false);

  // Toast notification timer
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModalRecording(null);
        setIsPlaying(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Saved count
  const savedCount = useMemo(() => {
    return recordings.filter((r) => r.isSaved).length;
  }, [recordings]);

  // Filter pills list matching Professional Curriculum
  const filterTabs = [
    { id: "All", label: "All Masterclasses" },
    { id: "Recent", label: "Recent (7-Day)" },
    { id: "Saved", label: `Saved (${savedCount})` },
    { id: "CA", label: "CA Intermediate" },
    { id: "GST", label: "GST & Tax" },
    { id: "Finance", label: "Financial Modeling" },
    { id: "ACCA", label: "ACCA & Costing" },
  ];

  // Toggle bookmark
  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRecordings((prev) =>
      prev.map((rec) => {
        if (rec.id === id) {
          const nextSaved = !rec.isSaved;
          setToastMessage(
            nextSaved
              ? `Saved "${rec.title.slice(0, 32)}..." to your library.`
              : `Removed from saved recordings.`
          );
          return { ...rec, isSaved: nextSaved };
        }
        return rec;
      })
    );
  };

  // Open modal - Guarded by subscription
  const openRecordingModal = (rec: Recording) => {
    if (!isSubscribed) {
      setShowSubscriptionGate(true);
      return;
    }
    setActiveModalRecording(rec);
    setCurrentPlaybackTime(Math.floor((rec.durationSeconds * rec.progress) / 100));
    setIsPlaying(true);
  };

  // Handle download - Guarded by subscription
  const handleDownload = (rec: Recording, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!isSubscribed) {
      setShowSubscriptionGate(true);
      return;
    }
    setToastMessage(`✓ Authorized 7-Day Download: Master HD MP4 "${rec.title.slice(0, 28)}..." (${rec.fileSize}) initiated.`);
  };

  // Filtered recordings
  const filteredRecordings = useMemo(() => {
    return recordings.filter((item) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.categoryTag.toLowerCase().includes(query) ||
        item.instructor.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query);

      if (!matchesSearch) return false;

      if (activeFilter === "All") return true;
      if (activeFilter === "Recent") return item.daysRemaining >= 5;
      if (activeFilter === "Saved") return item.isSaved;
      if (activeFilter === "CA") return item.categoryTag.includes("CA") || item.title.includes("CA");
      if (activeFilter === "GST") return item.categoryTag.includes("GST") || item.category.includes("Tax");
      if (activeFilter === "Finance") return item.categoryTag.includes("FINANCIAL") || item.category.includes("Valuation");
      if (activeFilter === "ACCA") return item.categoryTag.includes("ACCA") || item.categoryTag.includes("COST") || item.category.includes("Cost");

      return true;
    });
  }, [recordings, searchQuery, activeFilter]);

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] flex flex-col font-sans text-[#0A0A0A]">
      <Navbar />

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0e271d] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-white/10 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="w-6 h-6 rounded-full bg-[#F5C400] text-[#0e271d] flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-gray-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Container - Unified Width for Perfect Edge-to-Edge Alignment */}
      <main className="flex-1 max-w-[1360px] w-full mx-auto px-5 sm:px-8 lg:px-10 pt-8 sm:pt-12 pb-24">
        {/* Header Section */}
        <section className="mb-8 sm:mb-10">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFBEB] border border-[#FDE68A] text-[#92400E] text-[11px] font-bold uppercase tracking-wider mb-3.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#F5C400] animate-pulse" />
            <span>ON-DEMAND REPOSITORY</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#0e271d] font-heading tracking-tight leading-tight">
            Watch Whenever You&apos;re Ready
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-[15.5px] text-slate-600 max-w-2xl mt-2.5 leading-relaxed">
            Every live class is mastered into an HD recording with chapter timestamps, downloadable project assets, and persistent watch progress.
          </p>
        </section>

        {/* Search & Filter Controls Section */}
        <section className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
            {/* Search Box */}
            <div className="relative w-full sm:w-80 md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search recordings by topic or instructor..."
                className="w-full pl-10 pr-9 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-[#0e271d] placeholder-slate-400 focus:outline-none focus:border-[#F5C400] focus:ring-2 focus:ring-[#F5C400]/25 transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5 rounded-full cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Right: Subscription Status Badge & Test Toggle */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setIsSubscribed(!isSubscribed)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                  isSubscribed
                    ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                    : "bg-amber-50 border-amber-200 text-amber-800"
                }`}
                title="Click to toggle between Subscribed Cadet and Guest view"
              >
                {isSubscribed ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Cadet Pass: Active (Replay & Download Unlocked)</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3 h-3 text-amber-600" />
                    <span>Cadet Pass: Inactive (Guest Preview)</span>
                  </>
                )}
              </button>

              <div className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200/80 text-xs text-slate-600 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5C400]" />
                <span>{filteredRecordings.length} Available</span>
              </div>
            </div>
          </div>

          {/* Filter Pills with Flex-Wrap so they NEVER cut off */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-1">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#F5C400] text-[#0e271d] font-bold shadow-xs scale-[1.02]"
                      : "bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-600 hover:text-[#0e271d]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* Recordings Grid */}
        {filteredRecordings.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-2xl border border-dashed border-slate-200 my-6">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-[#B45309] border border-amber-200/60 flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-[#F5C400]" />
            </div>
            <h3 className="text-base font-semibold text-[#0e271d]">No recordings match your search</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-5">
              Try adjusting your search terms or selecting a different filter category.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("All");
              }}
              className="px-4 py-2 rounded-xl bg-[#0e271d] hover:bg-black text-white text-xs font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 items-stretch">
            {filteredRecordings.map((recording) => (
              <div
                key={recording.id}
                className="relative rounded-[24px] sm:rounded-[28px] overflow-hidden group flex flex-col justify-end h-[500px] sm:h-[520px] p-5 sm:p-6 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-300 border border-slate-200/90 w-full"
              >
                {/* Full-bleed Background Thumbnail Image */}
                <img
                  src={recording.thumbnail}
                  alt={recording.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Top Badges (Category Tag on Left + Duration on Right) */}
                <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-[#F5C400] text-[#0e271d] text-[10.5px] font-extrabold uppercase tracking-wider shadow-sm">
                    {recording.categoryTag}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-white text-xs font-bold font-mono shadow-sm flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-[#F5C400]" />
                    {recording.duration}
                  </span>
                </div>

                {/* Smooth Gradient Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(to top, #ffffff 0%, #ffffff 32%, rgba(255, 255, 255, 0.96) 44%, rgba(255, 255, 255, 0.6) 55%, rgba(255, 255, 255, 0.1) 68%, transparent 80%)",
                  }}
                />

                {/* Hover Play Button */}
                <div
                  onClick={() => openRecordingModal(recording)}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer pointer-events-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                >
                  <div className="w-14 h-14 rounded-full bg-[#F5C400] text-[#0e271d] flex items-center justify-center shadow-[0_4px_25px_rgba(245,196,0,0.5)] group-hover:scale-110 active:scale-95 transition-all duration-300">
                    <Play className="w-6 h-6 fill-[#0e271d] text-[#0e271d] ml-0.5" />
                  </div>
                </div>

                {/* Card Content in lower half - Guaranteed Visible & Aligned */}
                <div className="relative z-10 flex flex-col justify-end">
                  {/* Title (2-line clamp, clean and readable without ugly single-line truncation) */}
                  <h3
                    onClick={() => openRecordingModal(recording)}
                    className="text-base sm:text-[17px] font-bold text-[#0e271d] font-heading tracking-tight line-clamp-2 min-h-[44px] sm:min-h-[48px] leading-snug mb-2 hover:text-[#b45309] transition-colors cursor-pointer"
                    title={recording.title}
                  >
                    {recording.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed line-clamp-2 h-[38px] mb-4">
                    {recording.description}
                  </p>

                  {/* Action Row: Watch Button + 7-Day Download Button */}
                  <div className="flex items-center gap-2">
                    {isSubscribed ? (
                      <>
                        <button
                          type="button"
                          onClick={() => openRecordingModal(recording)}
                          className="flex-1 py-3 px-5 rounded-full bg-[#0e271d] hover:bg-[#F5C400] text-white hover:text-[#0e271d] font-bold text-xs sm:text-sm tracking-tight flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-[0_8px_25px_rgba(245,196,0,0.35)] active:scale-[0.98] cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Watch Recording</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) => handleDownload(recording, e)}
                          className="w-11 h-11 rounded-full bg-slate-100 hover:bg-[#F5C400] text-[#0e271d] flex items-center justify-center shrink-0 transition-all shadow-sm active:scale-95 cursor-pointer"
                          title="Download HD MP4 Master Session (7-Day Privilege)"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setShowSubscriptionGate(true)}
                        className="w-full py-3 px-5 rounded-full bg-slate-900 hover:bg-[#0e271d] text-white font-bold text-xs sm:text-sm tracking-tight flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98] cursor-pointer border border-slate-700"
                      >
                        <Lock className="w-3.5 h-3.5 text-[#F5C400]" />
                        <span>Subscription Required to Watch & Download</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 7-Day Storage Policy Info Banner */}
        <section className="mt-14 bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#B45309] flex items-center justify-center shrink-0 border border-amber-200/60">
              <Clock className="w-6 h-6 text-[#F5C400]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0e271d]">
                Automated 7-Day Storage & Replay Policy
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                All live sessions are automatically processed into full HD streamable master files with multi-track audio and downloadable material packages. Each recording remains available for exactly 7 calendar days after the session broadcast.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="px-3.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-semibold text-slate-700 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Full DRM Security</span>
            </div>
          </div>
        </section>
      </main>

      {/* Video Player Modal */}
      {activeModalRecording && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-[#111111] text-white w-full max-w-4xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between gap-4 bg-[#181818]">
              <div className="min-w-0">
                <span className="text-[11px] font-bold text-[#F5C400] uppercase tracking-wider">
                  {activeModalRecording.categoryTag}
                </span>
                <h2 className="text-sm sm:text-base font-semibold text-white truncate mt-0.5">
                  {activeModalRecording.title}
                </h2>
              </div>
              <button
                onClick={() => {
                  setActiveModalRecording(null);
                  setIsPlaying(false);
                }}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors shrink-0 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Player Canvas */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center group/video overflow-hidden">
              <img
                src={activeModalRecording.thumbnail}
                alt={activeModalRecording.title}
                className="w-full h-full object-cover opacity-80"
              />

              {/* Player Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 flex flex-col justify-between p-4 sm:p-6">
                {/* Expiry Pill */}
                <div className="self-start px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs font-semibold text-[#F5C400] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Available for {activeModalRecording.daysRemaining} more days</span>
                </div>

                {/* Big Center Toggle Play - Brand Yellow */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="self-center w-16 h-16 rounded-full bg-[#F5C400] hover:bg-[#FFD21F] text-[#0A0A0A] flex items-center justify-center shadow-[0_4px_25px_rgba(255,196,0,0.5)] transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                >
                  {isPlaying ? (
                    <Pause className="w-7 h-7 fill-[#0A0A0A] text-[#0A0A0A]" />
                  ) : (
                    <Play className="w-7 h-7 fill-[#0A0A0A] text-[#0A0A0A] ml-1" />
                  )}
                </button>

                {/* Bottom Controls Bar */}
                <div className="space-y-2 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10">
                  {/* Scrubber Bar */}
                  <div className="w-full flex items-center gap-2">
                    <span className="text-[11px] font-mono text-gray-300">
                      {formatSeconds(currentPlaybackTime)}
                    </span>
                    <input
                      type="range"
                      min="0"
                      max={activeModalRecording.durationSeconds}
                      value={currentPlaybackTime}
                      onChange={(e) => setCurrentPlaybackTime(Number(e.target.value))}
                      className="flex-1 accent-[#F5C400] h-1.5 bg-white/20 rounded-lg cursor-pointer"
                    />
                    <span className="text-[11px] font-mono text-gray-400">
                      {activeModalRecording.duration}
                    </span>
                  </div>

                  {/* Buttons Toolbar */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="hover:text-[#F5C400] transition-colors cursor-pointer"
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="hover:text-[#F5C400] transition-colors cursor-pointer"
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => {
                          const speeds = [1, 1.25, 1.5, 2];
                          const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
                          setPlaybackSpeed(speeds[nextIdx]);
                        }}
                        className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[11px] font-mono font-bold text-white transition-colors cursor-pointer"
                      >
                        {playbackSpeed}x
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          setToastMessage(
                            `Downloading lecture slides & project assets for ${activeModalRecording.title}`
                          )
                        }
                        className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Materials</span>
                      </button>

                      <button
                        onClick={() =>
                          setToastMessage(
                            `Initiating HD MP4 download (${activeModalRecording.fileSize})...`
                          )
                        }
                        className="px-3 py-1 rounded-lg bg-[#F5C400] hover:bg-[#FFD21F] text-xs font-bold text-[#0A0A0A] flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                      >
                        <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Download HD</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chapter Timestamps & Details Drawer */}
            <div className="p-5 overflow-y-auto max-h-48 bg-[#141414] border-t border-white/5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#F5C400]" />
                  <span>Interactive Chapter Markers</span>
                </span>
                <span className="text-[11px] text-gray-500">
                  Instructor: {activeModalRecording.instructor.name} ({activeModalRecording.instructor.role})
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeModalRecording.chapters.map((ch, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentPlaybackTime(ch.seconds);
                      setIsPlaying(true);
                      setToastMessage(`Jumped to chapter: ${ch.title}`);
                    }}
                    className="flex items-center gap-2.5 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-left transition-colors text-xs group cursor-pointer"
                  >
                    <span className="font-mono text-[#F5C400] font-bold text-[11px] shrink-0">
                      {ch.time}
                    </span>
                    <span className="text-gray-200 group-hover:text-white truncate">
                      {ch.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subscription Gate Modal */}
      {showSubscriptionGate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-[#0e271d] text-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#163a2b] text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#F5C400]/15 text-[#F5C400] flex items-center justify-center mx-auto border border-[#F5C400]/40">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#F5C400] bg-white/10 px-3 py-1 rounded-full">
                7-Day Cadet Access Only
              </span>
              <h2 className="text-2xl font-bold text-white mt-3 font-heading">
                Subscription Required to Watch & Download
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                Replay and offline HD MP4 downloads are exclusively available to enrolled cadets during the 7-day retention window. On Day 7, each session is automatically archived to our secure 2-year server vault.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-left text-xs space-y-2 text-slate-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#F5C400] shrink-0" />
                <span>Unlimited 1080p HD Streaming with Chapter Marks</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#F5C400] shrink-0" />
                <span>Download Master MP4 Files for Offline Study</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#F5C400] shrink-0" />
                <span>Includes Full Access to Live Google Meet Classroom</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/checkout?course=transportation-logistics-sap"
                className="flex-1 py-3 px-6 rounded-full bg-[#F5C400] hover:bg-amber-300 text-[#0e271d] font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
              >
                <span>Enroll Now via Razorpay</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                type="button"
                onClick={() => {
                  setIsSubscribed(true);
                  setShowSubscriptionGate(false);
                  setToastMessage("Cadet test pass activated. You can now watch and download recordings.");
                }}
                className="py-3 px-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                Test Preview
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowSubscriptionGate(false)}
              className="text-xs text-slate-400 hover:text-white underline pt-1 block mx-auto"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
