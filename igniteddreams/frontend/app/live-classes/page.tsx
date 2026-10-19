"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Radio,
  Users,
  Clock,
  Calendar,
  Bell,
  Check,
  Play,
  Search,
  X,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  MessageSquare,
  Send,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  Compass,
  ArrowRight,
  Video,
  Download,
  Share2,
} from "lucide-react";

interface Instructor {
  name: string;
  role: string;
  avatar: string;
}

interface LiveSession {
  id: string;
  status: "LIVE" | "UPCOMING" | "COMPLETED";
  durationMinutes: number;
  category: string;
  title: string;
  scheduleText: string;
  description: string;
  instructor: Instructor;
  attendeesCount?: number;
  hasReminder?: boolean;
  recordingId?: string;
  previewImage?: string;
  tags?: string[];
}

const FEATURED_LIVE_SESSION: LiveSession = {
  id: "live-session-hero",
  status: "LIVE",
  durationMinutes: 75,
  category: "DIRECT TAXATION & CORPORATE LAW",
  title: "Capital Gains & Section 54 Exemption Computations",
  scheduleText: "Broadcasting Right Now",
  description:
    "Interactive live calculation of short & long-term capital gains, indexation benefits, cost of improvement adjustments, and case law problem solving.",
  instructor: {
    name: "CA Rajesh Varma, FCA",
    role: "Chief Faculty — Corporate Accounting & Tax",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
  },
  attendeesCount: 148,
  previewImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=85",
};

const INITIAL_SCHEDULE_DATA: LiveSession[] = [
  {
    id: "session-upcoming-1",
    status: "UPCOMING",
    durationMinutes: 60,
    category: "DIGITAL MARKETING ESSENTIALS",
    title: "High-Converting Landing Page Teardowns & Live CRO Lab",
    scheduleText: "Tomorrow • 6:00 PM EST",
    description:
      "Marcus Thorne conducts live split-test audits on real SaaS and e-commerce hero sections, examining copy clarity, CTA placement, and above-the-fold engagement loops.",
    instructor: {
      name: "Marcus Thorne",
      role: "Growth Marketing Director",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
    hasReminder: true,
  },
  {
    id: "session-upcoming-2",
    status: "UPCOMING",
    durationMinutes: 90,
    category: "BUSINESS COMMUNICATION",
    title: "The Executive Presence Clinic: Leading High-Stakes Syncs",
    scheduleText: "Thursday • 7:30 PM EST",
    description:
      "Interactive speaking clinic where students volunteer for 2-minute elevator pitches followed by direct constructive critique on vocal tonality, pacing, and persuasive narrative arcs.",
    instructor: {
      name: "Maya Lin",
      role: "Executive Communications Coach",
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    },
    hasReminder: false,
  },
  {
    id: "session-upcoming-3",
    status: "UPCOMING",
    durationMinutes: 80,
    category: "CREATIVE DESIGN MASTERCLASS",
    title: "Type Craft: Sculpting Expressive Variable Fonts",
    scheduleText: "Saturday • 11:00 AM EST",
    description:
      "A deep session into bespoke typography design, kinetic variable axes, and harmonizing headline aesthetics with responsive layout boundaries across multi-device screens.",
    instructor: {
      name: "David Kross",
      role: "Creative Director & Typographer",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    },
    hasReminder: false,
  },
  {
    id: "session-completed-1",
    status: "COMPLETED",
    durationMinutes: 85,
    category: "CAREER READINESS PROGRAM",
    title: "Salary Negotiation Simulations & Total Compensation Benchmarks",
    scheduleText: "Yesterday • Completed",
    description:
      "Comprehensive walkthrough on handling competitive job offers, understanding restricted stock units (RSUs), and phrasing counter-proposals with poise and strategic leverage.",
    instructor: {
      name: "Sarah Chen",
      role: "Talent Strategist & Career Advisor",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    },
    hasReminder: false,
    recordingId: "rec-3",
  },
];

export default function LiveClassesPage() {
  const [sessions, setSessions] = useState<LiveSession[]>(INITIAL_SCHEDULE_DATA);
  const [activeTab, setActiveTab] = useState<"all" | "upcoming" | "past">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLiveModalOpen, setIsLiveModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [viewerCount, setViewerCount] = useState(148);
  const [isMuted, setIsMuted] = useState(false);
  const [chatMessages, setChatMessages] = useState<
    { sender: string; text: string; time: string; avatar?: string; isCurrentUser?: boolean }[]
  >([
    {
      sender: "Salina G.",
      text: "I have doubt at no. 47",
      time: "09:23 AM",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
      isCurrentUser: false,
    },
    {
      sender: "Khairul",
      text: "I have doubt at no. 47",
      time: "09:23 AM",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
      isCurrentUser: false,
    },
    {
      sender: "You",
      text: "How to solve no. 57",
      time: "09:23 AM",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
      isCurrentUser: true,
    },
    {
      sender: "Jhon Abraham",
      text: "I have doubt at no. 47",
      time: "09:23 AM",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
      isCurrentUser: false,
    },
    {
      sender: "Jhon Abraham",
      text: "How to solve no. 47",
      time: "09:24 AM",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
      isCurrentUser: false,
    },
  ]);
  const [chatInput, setChatInput] = useState("");

  // Slight realistic fluctuation in live viewer count
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.max(140, Math.min(160, prev + delta));
      });
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Auto-dismiss toast
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Fullscreen Modal Controls & HTML5 API
  const modalRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(true);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        if (modalRef.current?.requestFullscreen) {
          await modalRef.current.requestFullscreen();
        } else if ((modalRef.current as any)?.webkitRequestFullscreen) {
          await (modalRef.current as any).webkitRequestFullscreen();
        }
        setIsFullscreen(true);
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
        setIsFullscreen(false);
      }
    } catch {
      // Fallback to CSS fullscreen
      setIsFullscreen((prev) => !prev);
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    document.addEventListener("webkitfullscreenchange", onFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", onFullscreenChange);
    };
  }, []);

  // Keyboard shortcut listener: F for fullscreen, Esc to exit
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLiveModalOpen) return;
      const targetTag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (targetTag === "input" || targetTag === "textarea") return;

      if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === "Escape" && isFullscreen && !document.fullscreenElement) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLiveModalOpen, isFullscreen]);

  // Handle toggling reminder
  const toggleReminder = (id: string, title: string) => {
    setSessions((prev) =>
      prev.map((session) => {
        if (session.id === id) {
          const nextState = !session.hasReminder;
          setToastMessage(
            nextState
              ? `🔔 Reminder set for "${title.slice(0, 32)}..." We will notify you 15m prior.`
              : `Reminder removed for "${title.slice(0, 32)}..."`
          );
          return { ...session, hasReminder: nextState };
        }
        return session;
      })
    );
  };

  // Add a live chat message in modal
  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setChatMessages((prev) => [
      ...prev,
      {
        sender: "You",
        text: chatInput.trim(),
        time: timeStr,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
        isCurrentUser: true,
      },
    ]);
    setChatInput("");
  };

  // Filtered upcoming and past sessions
  const upcomingSessions = useMemo(() => {
    return sessions.filter((s) => s.status === "UPCOMING");
  }, [sessions]);

  const pastSessions = useMemo(() => {
    return sessions.filter((s) => s.status === "COMPLETED");
  }, [sessions]);

  const allFilteredSessions = useMemo(() => {
    return sessions.filter((s) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        s.title.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.instructor.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
      );
    });
  }, [sessions, searchQuery]);

  const displayedUpcoming = useMemo(() => {
    return allFilteredSessions.filter((s) => s.status === "UPCOMING");
  }, [allFilteredSessions]);

  const displayedPast = useMemo(() => {
    return allFilteredSessions.filter((s) => s.status === "COMPLETED");
  }, [allFilteredSessions]);

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-[#111827] flex flex-col font-sans selection:bg-[#F5C400] selection:text-[#0B0B0B]">
      {/* Top Navbar */}
      <Navbar />

      {/* Floating Action Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-[#0B0B0B] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="w-8 h-8 rounded-full bg-[#F5C400]/20 border border-[#F5C400]/40 text-[#F5C400] flex items-center justify-center shrink-0">
            <Bell className="w-4 h-4" />
          </div>
          <span className="text-xs sm:text-sm font-medium leading-snug">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-gray-400 hover:text-white p-1 ml-auto cursor-pointer"
            aria-label="Dismiss toast"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Page Content */}
      <main className="flex-1 max-w-[1360px] w-full mx-auto px-5 sm:px-8 lg:px-12 pt-8 sm:pt-12 pb-24">
        {/* ============================================================ */}
        {/* HEADER SECTION (Brand Colors: Aviation Yellow & Deep Navy)    */}
        {/* ============================================================ */}
        <section className="mb-10 sm:mb-12">
          {/* Page Main Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold text-[#111827] font-heading tracking-tight leading-[1.28] sm:leading-[1.24]">
            Live Learning Rooms
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-[15.5px] text-[#6B7280] max-w-2xl mt-3 leading-relaxed font-normal">
            Direct access to interactive sessions with real-time screen sharing, peer collaboration, and live instructor answers.
          </p>
        </section>

        {/* ============================================================ */}
        {/* HERO BROADCAST SECTION (Brand Yellow Accent)                 */}
        {/* ============================================================ */}
        {(activeTab === "all" || activeTab === "upcoming") && (
          <section className="mb-14 sm:mb-16 relative rounded-[32px] sm:rounded-[36px] overflow-hidden bg-[#161214] p-6 sm:p-10 lg:p-12 shadow-2xl border border-white/10">
            {/* Ambient Background Glow and Soft Learner Silhouette matching Image 2 */}
            <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-gradient-to-bl from-rose-500/10 via-amber-500/10 to-transparent blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-gradient-to-tr from-purple-900/15 via-rose-950/10 to-transparent blur-[100px] pointer-events-none" />
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none mix-blend-luminosity"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1600&q=80')",
              }}
            />

            {/* Section Header Text from Image 2 */}
            <div className="relative z-10 max-w-2xl mb-8 sm:mb-10">
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight font-heading leading-tight mb-3">
                Attend Live class
              </h2>
              <p className="text-xs sm:text-sm lg:text-[14.5px] text-gray-300/90 leading-relaxed font-normal">
                Ignited Dreams includes a feature that allows students to attend live classes, providing a real-time interactive learning experience. This feature enables educators to conduct live sessions, fostering a dynamic and engaging educational environment.
              </p>
            </div>

            {/* Floating White App Window Card from Image 2 */}
            <div className="relative z-10 bg-white rounded-[26px] sm:rounded-[32px] shadow-[0_25px_70px_rgba(0,0,0,0.5)] border border-white/80 p-5 sm:p-7 max-w-[1040px] w-full mx-auto text-[#111827]">
              {/* App Card Header: Search Pill + Notification Icons + User Profile */}
              <div className="flex items-center justify-between pb-5 mb-5 border-b border-gray-100 gap-3 flex-wrap">
                {/* Search pill */}
                <div className="flex items-center justify-between bg-[#F4F5F7] rounded-full px-4 py-2 sm:py-2.5 w-52 sm:w-64 border border-gray-150">
                  <input
                    type="text"
                    placeholder="Search"
                    className="bg-transparent text-xs sm:text-sm text-gray-700 placeholder-gray-400 focus:outline-none w-full"
                  />
                  <Search className="w-4 h-4 text-gray-400 shrink-0 ml-2" />
                </div>

                {/* Right Top Icons & User Profile Pill */}
                <div className="flex items-center gap-2 sm:gap-2.5">
                  {/* Chat Icon Button */}
                  <button
                    onClick={() => setIsLiveModalOpen(true)}
                    className="w-9 h-9 rounded-full bg-[#F4F5F7] hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-colors cursor-pointer"
                    title="Live Discussion"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>

                  {/* Bell Notification with red alert dot */}
                  <button
                    onClick={() => setToastMessage("🔔 You are tuned into live classroom broadcast notifications.")}
                    className="relative w-9 h-9 rounded-full bg-[#F4F5F7] hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-colors cursor-pointer"
                    title="Notifications"
                  >
                    <Bell className="w-4 h-4" />
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
                  </button>

                  {/* Profile Pill matching Image 2 */}
                  <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full pl-1.5 pr-3 py-1 shadow-2xs">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80"
                      alt="Muntasir"
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-xs font-semibold text-gray-800">Muntasir</span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* App Card Content Grid (Video Column + Course Content / Chat Column) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Side (~66%): Video Player & Details */}
                <div className="lg:col-span-8 flex flex-col">
                  {/* Video Box with Teacher */}
                  <div
                    onClick={() => setIsLiveModalOpen(true)}
                    className="relative rounded-[20px] sm:rounded-[24px] overflow-hidden bg-slate-900 aspect-video shadow-sm group cursor-pointer"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={FEATURED_LIVE_SESSION.previewImage}
                      alt="Instructor in classroom"
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/15 pointer-events-none" />

                    {/* Top Right Live Pill */}
                    <div className="absolute top-3.5 right-3.5 px-2.5 py-0.5 rounded-full bg-red-600/90 text-white text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      LIVE
                    </div>

                    {/* Center Translucent Play Button from Image 2 */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-[#5EEAD4]/45 hover:bg-[#5EEAD4]/65 backdrop-blur-md flex items-center justify-center text-white shadow-lg transition-transform hover:scale-105 active:scale-95">
                        <Play className="w-6 h-6 fill-white text-white ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Title & Description under Video from Image 2 */}
                  <div className="mt-4">
                    <h3 className="text-lg sm:text-[21px] font-bold text-[#111827] font-heading tracking-tight">
                      {FEATURED_LIVE_SESSION.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-[#6B7280] leading-relaxed mt-1.5 line-clamp-2">
                      {FEATURED_LIVE_SESSION.description}
                    </p>
                  </div>
                </div>

                {/* Right Side (~34%): Course Content & Real-time Chat Stream */}
                <div className="lg:col-span-4 flex flex-col h-full lg:pl-3 border-t lg:border-t-0 lg:border-l border-gray-150 pt-5 lg:pt-0">
                  {/* Chat Header matching Image 2 */}
                  <div className="text-xs font-semibold text-[#6B7280] mb-3 flex items-center justify-between">
                    <span>Course content</span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200/50 px-2 py-0.5 rounded-full">
                      Live
                    </span>
                  </div>

                  {/* Chat Stream matching Image 2 with amber vertical accent line */}
                  <div className="flex-1 space-y-3.5 overflow-y-auto pr-2 max-h-[310px] sm:max-h-[340px] border-r-2 border-amber-300/60">
                    {chatMessages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`space-y-1 ${msg.isCurrentUser ? "flex flex-col items-end" : ""}`}
                      >
                        {!msg.isCurrentUser && (
                          <div className="flex items-center gap-1.5">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={msg.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"}
                              alt={msg.sender}
                              className="w-5 h-5 rounded-full object-cover"
                            />
                            <span className="text-[11px] font-semibold text-gray-800">
                              {msg.sender}
                            </span>
                          </div>
                        )}
                        <div
                          className={`px-3.5 py-2 text-xs max-w-[90%] shadow-2xs ${
                            msg.isCurrentUser
                              ? "bg-[#0D9488] text-white rounded-2xl rounded-tr-xs font-medium"
                              : "bg-[#F3F4F6] text-[#374151] rounded-2xl rounded-tl-xs"
                          }`}
                        >
                          {msg.text}
                        </div>
                        <span className="text-[9px] text-gray-400 block text-right pr-1">
                          {msg.time}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Quick Doubt Input Form */}
                  <form
                    onSubmit={handleSendChat}
                    className="mt-3 pt-3 border-t border-gray-150 flex items-center gap-2"
                  >
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask your doubt or question..."
                      className="flex-1 bg-[#F9FAFB] border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]"
                    />
                    <button
                      type="submit"
                      className="p-2 rounded-xl bg-[#0D9488] hover:bg-[#0F766E] text-white shadow-xs transition-colors cursor-pointer shrink-0"
                      title="Send question"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* CLASS SCHEDULE SECTION (Matching Brand Hierarchy)            */}
        {/* ============================================================ */}
        <section className="mt-8">
          {/* Header Row: Title & Tabs */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#F3F4F6]">
            <div>
              <h2 className="text-2xl sm:text-[28px] font-semibold text-[#111827] tracking-tight font-heading">
                Class Schedule
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280] mt-1 font-normal">
                Browse upcoming interactive sessions and past class recordings.
              </p>
            </div>

            {/* Schedule Filter Tabs */}
            <div className="flex items-center gap-1.5 sm:gap-2 bg-[#F3F4F6] p-1 rounded-xl self-start md:self-auto">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "all"
                    ? "bg-[#0B0B0B] text-white shadow-xs"
                    : "text-[#4B5563] hover:text-[#111827] hover:bg-[#E5E7EB]"
                }`}
              >
                <span>All Sessions</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-md ${
                    activeTab === "all" ? "bg-[#F5C400] text-[#0B0B0B] font-bold" : "bg-gray-200 text-gray-700"
                  }`}
                >
                  5
                </span>
              </button>

              <button
                onClick={() => setActiveTab("upcoming")}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "upcoming"
                    ? "bg-[#0B0B0B] text-white shadow-xs"
                    : "text-[#4B5563] hover:text-[#111827] hover:bg-[#E5E7EB]"
                }`}
              >
                <span>Upcoming</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-md ${
                    activeTab === "upcoming" ? "bg-[#F5C400] text-[#0B0B0B] font-bold" : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {upcomingSessions.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("past")}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "past"
                    ? "bg-[#0B0B0B] text-white shadow-xs"
                    : "text-[#4B5563] hover:text-[#111827] hover:bg-[#E5E7EB]"
                }`}
              >
                <span>Past / Available</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-md ${
                    activeTab === "past" ? "bg-[#F5C400] text-[#0B0B0B] font-bold" : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {pastSessions.length}
                </span>
              </button>
            </div>
          </div>

          {/* Quick Search and Filter Bar */}
          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search classes by topic, category, or instructor..."
                className="w-full pl-10 pr-9 py-2 bg-white border border-[#E5E7EB] rounded-xl text-xs sm:text-sm text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:border-[#F5C400] focus:ring-2 focus:ring-[#F5C400]/25 transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black p-0.5 rounded-full cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="text-xs text-[#6B7280] font-medium sm:text-right">
              Showing{" "}
              {activeTab === "all"
                ? allFilteredSessions.length
                : activeTab === "upcoming"
                ? displayedUpcoming.length
                : displayedPast.length}{" "}
              scheduled classes
            </div>
          </div>

          {/* ============================================================ */}
          {/* UPCOMING LIVE SESSIONS GRID                                  */}
          {/* ============================================================ */}
          {(activeTab === "all" || activeTab === "upcoming") && (
            <div className="mt-8">
              {/* Uppercase Header */}
              <div className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-5">
                UPCOMING LIVE SESSIONS
              </div>

              {displayedUpcoming.length === 0 ? (
                <div className="py-12 text-center bg-white rounded-2xl border border-dashed border-[#E5E7EB]">
                  <p className="text-sm text-gray-500">No upcoming sessions found matching &ldquo;{searchQuery}&rdquo;</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedUpcoming.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl border border-[#EDEDED] shadow-[0_2px_14px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-gray-300 transition-all duration-200 p-6 flex flex-col justify-between"
                    >
                      <div>
                        {/* Top Badges: UPCOMING + Duration */}
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#EAF8F0] border border-[#D1F2DE] text-[#059669] text-[11px] font-bold uppercase tracking-wider">
                            UPCOMING
                          </span>
                          <span className="text-xs text-[#6B7280] font-medium flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-[#9CA3AF]" />
                            <span>{item.durationMinutes} Minutes</span>
                          </span>
                        </div>

                        {/* Category */}
                        <div className="text-[11px] font-bold text-[#B45309] uppercase tracking-wider mt-4">
                          {item.category}
                        </div>

                        {/* Title */}
                        <h3 className="font-semibold text-[16.5px] text-[#111827] mt-1.5 leading-snug tracking-tight font-heading min-h-[46px] line-clamp-2">
                          {item.title}
                        </h3>

                        {/* Schedule Pill Box */}
                        <div className="bg-[#F8F9FA] border border-[#EEEEEE] rounded-xl px-3 py-2 my-3 text-xs font-semibold text-[#374151] flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-[#B45309]" />
                          <span>{item.scheduleText}</span>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-[#6B7280] leading-relaxed line-clamp-2">
                          {item.description}
                        </p>
                      </div>

                      {/* Bottom Row: Instructor Avatar/Name & Reminder Button */}
                      <div className="mt-5 pt-4 border-t border-[#F3F4F6] flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.instructor.avatar}
                            alt={item.instructor.name}
                            className="w-8 h-8 rounded-full object-cover ring-1 ring-gray-200 shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-[#111827] truncate">
                              {item.instructor.name}
                            </div>
                            <div className="text-[11px] text-[#6B7280] truncate max-w-[110px]">
                              {item.instructor.role}
                            </div>
                          </div>
                        </div>

                        {/* Reminder Button (Brand Colored State) */}
                        <button
                          onClick={() => toggleReminder(item.id, item.title)}
                          className={`text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all duration-150 cursor-pointer shrink-0 ${
                            item.hasReminder
                              ? "bg-[#FFFBEB] border border-[#FDE68A] text-[#92400E] hover:bg-[#FEF3C7]"
                              : "border border-[#E5E7EB] text-[#374151] hover:bg-[#F9FAFB] hover:border-gray-300"
                          }`}
                        >
                          {item.hasReminder ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-[#B45309]" />
                              <span>REMINDER SET</span>
                            </>
                          ) : (
                            <>
                              <Bell className="w-3.5 h-3.5 text-gray-500" />
                              <span>SET REMINDER</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ============================================================ */}
          {/* COMPLETED CLASSES & ARCHIVE SECTION                          */}
          {/* ============================================================ */}
          {(activeTab === "all" || activeTab === "past") && (
            <div className="mt-12">
              {/* Uppercase Header */}
              <div className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-5">
                COMPLETED CLASSES &amp; ARCHIVE
              </div>

              {displayedPast.length === 0 ? (
                <div className="py-12 text-center bg-white rounded-2xl border border-dashed border-[#E5E7EB]">
                  <p className="text-sm text-gray-500">No completed sessions found matching &ldquo;{searchQuery}&rdquo;</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedPast.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl border border-[#EDEDED] shadow-[0_2px_14px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-gray-300 transition-all duration-200 p-6 flex flex-col justify-between"
                    >
                      <div>
                        {/* Top Badges: COMPLETED + Duration */}
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#F3F4F6] border border-[#E5E7EB] text-[#4B5563] text-[11px] font-bold uppercase tracking-wider">
                            COMPLETED
                          </span>
                          <span className="text-xs text-[#6B7280] font-medium flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-[#9CA3AF]" />
                            <span>{item.durationMinutes} Minutes</span>
                          </span>
                        </div>

                        {/* Category */}
                        <div className="text-[11px] font-bold text-[#B45309] uppercase tracking-wider mt-4">
                          {item.category}
                        </div>

                        {/* Title */}
                        <h3 className="font-semibold text-[16.5px] text-[#111827] mt-1.5 leading-snug tracking-tight font-heading min-h-[46px] line-clamp-2">
                          {item.title}
                        </h3>

                        {/* Schedule Pill Box */}
                        <div className="bg-[#F8F9FA] border border-[#EEEEEE] rounded-xl px-3 py-2 my-3 text-xs font-semibold text-[#4B5563] flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-[#9CA3AF]" />
                          <span>{item.scheduleText}</span>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-[#6B7280] leading-relaxed line-clamp-2">
                          {item.description}
                        </p>
                      </div>

                      {/* Bottom Row: Instructor Avatar/Name & RECORDING CTA */}
                      <div className="mt-5 pt-4 border-t border-[#F3F4F6] flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.instructor.avatar}
                            alt={item.instructor.name}
                            className="w-8 h-8 rounded-full object-cover ring-1 ring-gray-200 shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-[#111827] truncate">
                              {item.instructor.name}
                            </div>
                            <div className="text-[11px] text-[#6B7280] truncate max-w-[110px]">
                              {item.instructor.role}
                            </div>
                          </div>
                        </div>

                        {/* RECORDING Replay Button (Brand Yellow / Gold Style) */}
                        <Link
                          href={item.recordingId ? `/recordings?id=${item.recordingId}` : "/recordings"}
                          className="text-xs font-bold px-3.5 py-1.5 rounded-lg border border-[#FDE68A] bg-[#FFFBEB] hover:bg-[#FEF3C7] text-[#92400E] flex items-center gap-1.5 transition-all duration-150 cursor-pointer shrink-0"
                        >
                          <Play className="w-3.5 h-3.5 fill-[#B45309] text-[#B45309]" />
                          <span>RECORDING</span>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>

        {/* ============================================================ */}
        {/* ACADEMY TRUST & LIVE CLASS POLICIES BANNER                   */}
        {/* ============================================================ */}
        <section className="mt-16 bg-white rounded-3xl border border-[#EDEDED] p-8 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-[#B45309] flex items-center justify-center shrink-0">
                <Radio className="w-5 h-5 text-[#B45309]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#111827] font-heading">
                  Ultra-Low Latency Broadcast
                </h4>
                <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">
                  WebRTC sub-second audio &amp; video synchronised with real-time code and Figma canvas streams.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-[#B45309] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-[#B45309]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#111827] font-heading">
                  Automatic 7-Day Recording Replay
                </h4>
                <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">
                  Every live room session is recorded in HD and automatically uploaded to your student vault for 7 days.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#111827] font-heading">
                  Direct Instructor Q&amp;A
                </h4>
                <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">
                  Ask live questions via audio, camera, or moderated chat with direct verbal responses from the instructor.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ============================================================ */}
      {/* FULL-SCREEN LIVE BROADCAST CLASSROOM PAGE (No Popup/Modal)  */}
      {/* ============================================================ */}
      {isLiveModalOpen && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 w-screen h-screen bg-[#161214] flex flex-col p-4 sm:p-8 lg:p-12 overflow-y-auto select-none relative"
        >
          {/* Ambient Background Lighting & Subtle Learner Silhouette from Image 2 */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-rose-500/15 via-amber-500/10 to-transparent blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-purple-900/20 via-rose-950/15 to-transparent blur-[120px] pointer-events-none" />
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25 pointer-events-none mix-blend-luminosity"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1600&q=80')",
            }}
          />

          {/* Top Header Row matching Image 2 */}
          <div className="max-w-[1040px] w-full mx-auto mb-6 sm:mb-8 relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight font-heading leading-tight mb-2.5">
                Attend Live class
              </h2>
              <p className="text-xs sm:text-sm text-gray-300/90 max-w-2xl leading-relaxed font-normal">
                Ignited Dreams includes a feature that allows students to attend live classes, providing a real-time interactive learning experience. This feature enables educators to conduct live sessions, fostering a dynamic and engaging educational environment.
              </p>
            </div>

            {/* Exit Room & Fullscreen Controls */}
            <div className="flex items-center gap-2 self-start shrink-0">
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs transition-colors cursor-pointer"
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                aria-label="Toggle Fullscreen"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => {
                  if (document.fullscreenElement) {
                    document.exitFullscreen?.();
                  }
                  setIsLiveModalOpen(false);
                }}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-red-500/20 hover:border-red-400/40 text-white hover:text-red-300 border border-white/20 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
                <span>Exit Live Room</span>
              </button>
            </div>
          </div>

          {/* Center Floating White App Window Card from Image 2 */}
          <div className="relative z-10 bg-white rounded-[26px] sm:rounded-[32px] shadow-[0_30px_90px_rgba(0,0,0,0.65)] border border-white/80 p-5 sm:p-7 max-w-[1040px] w-full mx-auto text-[#111827]">
            {/* Header: Search Pill + Notification Icons + User Profile */}
            <div className="flex items-center justify-between pb-5 mb-5 border-b border-gray-100 gap-3 flex-wrap">
              {/* Search pill */}
              <div className="flex items-center justify-between bg-[#F4F5F7] rounded-full px-4 py-2 sm:py-2.5 w-52 sm:w-64 border border-gray-150">
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-transparent text-xs sm:text-sm text-gray-700 placeholder-gray-400 focus:outline-none w-full"
                />
                <Search className="w-4 h-4 text-gray-400 shrink-0 ml-2" />
              </div>

              {/* Right Top Icons & User Profile Pill */}
              <div className="flex items-center gap-2 sm:gap-2.5">
                {/* Chat Icon Button */}
                <button
                  className="w-9 h-9 rounded-full bg-[#F4F5F7] hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-colors cursor-pointer"
                  title="Live Class Discussion"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>

                {/* Bell Notification with red alert dot */}
                <button
                  onClick={() => setToastMessage("🔔 Broadcast notifications are active.")}
                  className="relative w-9 h-9 rounded-full bg-[#F4F5F7] hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-colors cursor-pointer"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
                </button>

                {/* Profile Pill matching Image 2 */}
                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full pl-1.5 pr-3 py-1 shadow-2xs">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80"
                    alt="Muntasir"
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-xs font-semibold text-gray-800">Muntasir</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* App Card Content Grid (Video Column + Course Content / Chat Column) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Side (~66%): Video Player & Details */}
              <div className="lg:col-span-8 flex flex-col">
                {/* Video Box with Teacher */}
                <div className="relative rounded-[20px] sm:rounded-[24px] overflow-hidden bg-slate-900 aspect-video shadow-sm group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={FEATURED_LIVE_SESSION.previewImage}
                    alt="Instructor in classroom"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/15 pointer-events-none" />

                  {/* Top Right Live Pill */}
                  <div className="absolute top-3.5 right-3.5 px-2.5 py-0.5 rounded-full bg-red-600/90 text-white text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    LIVE
                  </div>

                  {/* Center Translucent Play Button from Image 2 */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
                    <div
                      onClick={() => setIsMuted(!isMuted)}
                      className="w-14 h-14 rounded-full bg-[#5EEAD4]/45 hover:bg-[#5EEAD4]/65 backdrop-blur-md flex items-center justify-center text-white shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                      title={isMuted ? "Unmute Audio" : "Mute Audio"}
                    >
                      <Play className="w-6 h-6 fill-white text-white ml-0.5" />
                    </div>
                  </div>

                  {/* Audio Status Pill */}
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-medium flex items-center gap-1.5">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="hover:text-[#5EEAD4] transition-colors cursor-pointer"
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
                    </button>
                    <span>{isMuted ? "Audio Muted" : "Instructor Mic Active"}</span>
                  </div>
                </div>

                {/* Title & Description under Video from Image 2 */}
                <div className="mt-4">
                  <h3 className="text-lg sm:text-[21px] font-bold text-[#111827] font-heading tracking-tight">
                    {FEATURED_LIVE_SESSION.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#6B7280] leading-relaxed mt-1.5 line-clamp-2">
                    {FEATURED_LIVE_SESSION.description}
                  </p>
                </div>
              </div>

              {/* Right Side (~34%): Course Content & Real-time Chat Stream */}
              <div className="lg:col-span-4 flex flex-col h-full lg:pl-3 border-t lg:border-t-0 lg:border-l border-gray-150 pt-5 lg:pt-0">
                {/* Chat Header matching Image 2 */}
                <div className="text-xs font-semibold text-[#6B7280] mb-3 flex items-center justify-between">
                  <span>Course content</span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200/50 px-2 py-0.5 rounded-full">
                    Live
                  </span>
                </div>

                {/* Chat Stream matching Image 2 with amber vertical accent line */}
                <div className="flex-1 space-y-3.5 overflow-y-auto pr-2 max-h-[310px] sm:max-h-[340px] border-r-2 border-amber-300/60">
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`space-y-1 ${msg.isCurrentUser ? "flex flex-col items-end" : ""}`}
                    >
                      {!msg.isCurrentUser && (
                        <div className="flex items-center gap-1.5">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={msg.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"}
                            alt={msg.sender}
                            className="w-5 h-5 rounded-full object-cover"
                          />
                          <span className="text-[11px] font-semibold text-gray-800">
                            {msg.sender}
                          </span>
                        </div>
                      )}
                      <div
                        className={`px-3.5 py-2 text-xs max-w-[90%] shadow-2xs ${
                          msg.isCurrentUser
                            ? "bg-[#0D9488] text-white rounded-2xl rounded-tr-xs font-medium"
                            : "bg-[#F3F4F6] text-[#374151] rounded-2xl rounded-tl-xs"
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[9px] text-gray-400 block text-right pr-1">
                        {msg.time}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Quick Doubt Input Form */}
                <form
                  onSubmit={handleSendChat}
                  className="mt-3 pt-3 border-t border-gray-150 flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask your doubt or question..."
                    className="flex-1 bg-[#F9FAFB] border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]"
                  />
                  <button
                    type="submit"
                    className="p-2 rounded-xl bg-[#0D9488] hover:bg-[#0F766E] text-white shadow-xs transition-colors cursor-pointer shrink-0"
                    title="Send question"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
