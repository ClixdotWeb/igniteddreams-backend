"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  PhoneOff,
  MessageSquare,
  Users,
  Hand,
  Smile,
  Subtitles,
  MoreVertical,
  Info,
  ShieldCheck,
  Shapes,
  Maximize2,
  Minimize2,
  X,
  Send,
  Pin,
  Clock,
  Sparkles,
  Camera,
  Download,
  AlertTriangle,
  Lock,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
  isInstructor?: boolean;
}

interface Reaction {
  id: string;
  emoji: string;
  sender: string;
}

export default function GoogleMeetClassroomPage() {
  const params = useParams();
  const router = useRouter();
  const classId = (params?.classId as string) || "live-transportation-sap-101";
  const { user } = useAuth();

  // Subscription state: Check localStorage or default to active for seamless review
  const [isSubscribed, setIsSubscribed] = useState<boolean>(true);
  const [hasJoinedMeeting, setHasJoinedMeeting] = useState<boolean>(false);

  // Google Meet Core Controls
  const [micOn, setMicOn] = useState<boolean>(false);
  const [camOn, setCamOn] = useState<boolean>(true);
  const [isHandRaised, setIsHandRaised] = useState<boolean>(false);
  const [isScreenSharing, setIsScreenSharing] = useState<boolean>(false);
  const [captionsOn, setCaptionsOn] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [meetingLayout, setMeetingLayout] = useState<"tiled" | "spotlight" | "sidebar">("tiled");

  // Side Drawer Tabs: "chat" | "people" | "info" | "activities" | "host" | null
  const [activeSidePanel, setActiveSidePanel] = useState<"chat" | "people" | "info" | "activities" | "host" | null>(null);

  // Floating Reactions
  const [floatingReactions, setFloatingReactions] = useState<Reaction[]>([]);
  const [showReactionPicker, setShowReactionPicker] = useState<boolean>(false);

  // Real-time Clock
  const [currentTimeStr, setCurrentTimeStr] = useState<string>("");

  // Chat state
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m-1",
      sender: "Justin Burnard Dias (Lead Mentor)",
      text: "Welcome cadets to Batch Alpha. Today we are mapping Multimodal Freight Operations and SAP S/4HANA VL01N outbound delivery simulation. Keep your log sheets ready.",
      timestamp: "10:02 AM",
      isInstructor: true,
    },
    {
      id: "m-2",
      sender: "Suresh Menon (Trainer 1 — EXIM Ops)",
      text: "All 50 webcams are monitored. Attendance is locked. Please ensure face is centered in the camera feed.",
      timestamp: "10:05 AM",
      isInstructor: true,
    },
    {
      id: "m-3",
      sender: "Ananya Pillai (Trainer 2 — SAP ERP)",
      text: "Material codes and shipping points for the CFS exercise are uploaded to your Kindle Hub.",
      timestamp: "10:08 AM",
      isInstructor: true,
    },
  ]);

  // Cohort Participants (1 Mentor + 2 Trainers + 50 Cadets)
  const participants = [
    { id: "p-1", name: "Justin Burnard Dias (Lead Mentor)", role: "HOST", isSpeaking: true, isMuted: false, isCamOn: true },
    { id: "p-2", name: "Suresh Menon (Trainer 1)", role: "CO-HOST", isSpeaking: false, isMuted: false, isCamOn: true },
    { id: "p-3", name: "Ananya Pillai (Trainer 2)", role: "CO-HOST", isSpeaking: false, isMuted: true, isCamOn: true },
    { id: "p-4", name: user?.name ? `${user.name} (You)` : "Arjun Nair (You)", role: "CADET", isSpeaking: false, isMuted: !micOn, isCamOn: camOn },
    { id: "p-5", name: "Priya Lakshmi", role: "CADET", isSpeaking: false, isMuted: true, isCamOn: true },
    { id: "p-6", name: "Vishnu Raj", role: "CADET", isSpeaking: false, isMuted: true, isCamOn: true },
    { id: "p-7", name: "Kavya S.", role: "CADET", isSpeaking: false, isMuted: true, isCamOn: true },
    { id: "p-8", name: "Mohammed Farhan", role: "CADET", isSpeaking: false, isMuted: true, isCamOn: true },
  ];

  useEffect(() => {
    // Check subscription in localStorage
    const savedSub = localStorage.getItem("id_cadet_subscription");
    if (savedSub === "inactive") {
      setIsSubscribed(false);
    }

    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTimeStr(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const triggerReaction = (emoji: string) => {
    const newReaction: Reaction = {
      id: `r-${Date.now()}-${Math.random()}`,
      emoji,
      sender: user?.name || "You",
    };
    setFloatingReactions((prev) => [...prev, newReaction]);
    setShowReactionPicker(false);

    // Auto remove after 3s
    setTimeout(() => {
      setFloatingReactions((prev) => prev.filter((r) => r.id !== newReaction.id));
    }, 3000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const msg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: user?.name ? `${user.name} (You)` : "Arjun Nair (You)",
      text: chatInput.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, msg]);
    setChatInput("");
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  // 1. SUBSCRIPTION REQUIRED GATE MODAL (If user is not subscribed)
  if (!isSubscribed) {
    return (
      <div className="min-h-screen bg-[#202124] text-white flex flex-col font-sans">
        {/* Top Minimal Google Meet Header */}
        <div className="p-4 sm:p-6 flex items-center justify-between border-b border-[#3c4043]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#F5C400] text-[#0e271d] font-black text-sm flex items-center justify-center">
              ID
            </div>
            <span className="font-medium text-base text-slate-200">
              Ignited Dreams Live Classroom
            </span>
          </div>
          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-[#3c4043]"
          >
            Exit to Home
          </Link>
        </div>

        {/* Center Access Gate Card */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-xl w-full bg-[#303134] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#3c4043] text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-[#F5C400]/15 text-[#F5C400] flex items-center justify-center mx-auto border border-[#F5C400]/40">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#F5C400] bg-[#F5C400]/10 px-3 py-1 rounded-full">
                Enrolled Cadets Only
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-3 font-heading">
                Subscription Required to Join Live Class
              </h1>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                Live sessions are limited to 50-student cohorts with active front-webcam supervision and 1 Mentor + 2 Trainers. You must hold an active admission subscription to check in.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#202124] border border-[#3c4043] text-left text-xs space-y-2 text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>3-Hour Daily Live Class (2h Lecture + 1h Doubt Clearing)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>7-Day HD Replay & Download Access</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Full Access to Kindle Digital Library & ERP Lab Handbooks</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/checkout?course=transportation-logistics-sap"
                className="flex-1 py-3.5 px-6 rounded-full bg-[#F5C400] hover:bg-amber-300 text-[#0e271d] font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
              >
                <span>Enroll & Pay via Razorpay</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={() => setIsSubscribed(true)}
                className="py-3 px-5 rounded-full bg-[#3c4043] hover:bg-slate-600 text-white font-semibold text-xs transition-colors"
                title="Simulate active subscriber access for test/demo"
              >
                Test Cadet Preview
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. GOOGLE MEET "READY TO JOIN?" SCREEN (Join Lobby)
  if (!hasJoinedMeeting) {
    return (
      <div className="min-h-screen bg-[#202124] text-white flex flex-col font-sans">
        {/* Top Header */}
        <div className="p-4 sm:p-6 flex items-center justify-between border-b border-[#3c4043]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#F5C400] text-[#0e271d] font-black text-sm flex items-center justify-center">
              ID
            </div>
            <div>
              <span className="font-semibold text-sm sm:text-base text-slate-100">
                Ignited Dreams Integrated • Live Classroom
              </span>
              <p className="text-[11px] text-slate-400">Batch Alpha — 50 Cadets Cohort</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-3 py-1 rounded-full font-semibold">
              ● Verified Cadet Active
            </span>
            <button
              onClick={() => setIsSubscribed(false)}
              className="text-[11px] text-slate-400 hover:text-white underline"
            >
              Test Unsubscribed View
            </button>
          </div>
        </div>

        {/* Join Lobby Content: Preview Cam on Left, Join Options on Right */}
        <div className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-8 py-10 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-14">
          {/* Left: Video Preview Box */}
          <div className="w-full lg:w-[580px] aspect-video rounded-3xl bg-[#303134] border border-[#3c4043] overflow-hidden relative shadow-2xl flex flex-col justify-between p-4 sm:p-6">
            {camOn ? (
              <div className="absolute inset-0 bg-[#202124] flex items-center justify-center">
                {/* Live Webcam Placeholder with realistic avatar */}
                <div className="text-center space-y-3">
                  <div className="w-20 h-20 rounded-full bg-[#0e271d] text-[#F5C400] font-black text-2xl flex items-center justify-center mx-auto border-2 border-[#F5C400] shadow-xl">
                    {user?.name ? user.name.slice(0, 2).toUpperCase() : "AN"}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">
                      {user?.name || "Arjun Nair"}
                    </h3>
                    <p className="text-xs text-emerald-400 font-mono mt-0.5">
                      Front Camera Verified • Strict Proctoring Ready
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 bg-[#202124] flex flex-col items-center justify-center text-slate-400 space-y-2">
                <VideoOff className="w-12 h-12 text-slate-500" />
                <span className="text-xs font-semibold">Camera is turned off</span>
              </div>
            )}

            {/* Top Status */}
            <div className="relative z-10 flex items-center justify-between text-xs">
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white font-mono text-[11px]">
                Camera Check
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700 text-emerald-400 font-bold text-[10px]">
                HD 1080p
              </span>
            </div>

            {/* Bottom Floating Mic & Cam Controls */}
            <div className="relative z-10 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setMicOn(!micOn)}
                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all ${
                  micOn
                    ? "bg-[#3c4043] hover:bg-slate-600 text-white"
                    : "bg-red-600 hover:bg-red-700 text-white"
                }`}
                title={micOn ? "Mute Microphone" : "Unmute Microphone"}
              >
                {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </button>

              <button
                type="button"
                onClick={() => setCamOn(!camOn)}
                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all ${
                  camOn
                    ? "bg-[#3c4043] hover:bg-slate-600 text-white"
                    : "bg-red-600 hover:bg-red-700 text-white"
                }`}
                title={camOn ? "Turn off camera" : "Turn on camera"}
              >
                {camOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Right: Meeting Info & Join Button */}
          <div className="w-full lg:max-w-md space-y-6 text-center lg:text-left">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#F5C400] bg-[#F5C400]/10 px-3 py-1 rounded-full">
                Live Classroom Active
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3 font-heading">
                Ready to join the live session?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                Transportation & Logistics Management with SAP S/4HANA.
                <br />
                <strong>Justin Burnard Dias</strong> is currently conducting the session with 2 trainers and 48 cadets.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#303134] border border-[#3c4043] text-left text-xs space-y-2 text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white font-semibold">Strict Proctoring Active:</span> Keep your front webcam on throughout the session.
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                <Clock className="w-3.5 h-3.5 text-[#F5C400]" />
                <span>Session Duration: 2h Core Lecture + 1h Doubt Clearing</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3.5">
              <button
                type="button"
                onClick={() => setHasJoinedMeeting(true)}
                className="w-full sm:w-auto flex-1 py-3.5 px-8 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold text-sm transition-all shadow-lg active:scale-95 cursor-pointer"
              >
                Join Now
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsScreenSharing(true);
                  setHasJoinedMeeting(true);
                }}
                className="w-full sm:w-auto py-3.5 px-6 rounded-full bg-[#3c4043] hover:bg-slate-600 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Monitor className="w-4 h-4 text-[#F5C400]" />
                <span>Present</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. COMPLETE GOOGLE MEET LIVE MEETING ROOM
  return (
    <div className="h-screen w-screen bg-[#202124] text-white flex flex-col font-sans overflow-hidden select-none">
      {/* FLOATING EMOJI REACTIONS ANIMATION */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {floatingReactions.map((r) => (
          <div
            key={r.id}
            className="absolute bottom-20 left-1/3 animate-[floatUp_3s_ease-out_forwards] flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md text-white text-lg shadow-2xl"
          >
            <span>{r.emoji}</span>
            <span className="text-[11px] font-bold text-[#F5C400]">{r.sender}</span>
          </div>
        ))}
      </div>

      {/* TOP GOOGLE MEET BAR */}
      <header className="h-14 bg-[#202124] px-4 sm:px-6 flex items-center justify-between shrink-0 border-b border-[#3c4043]/60 z-20">
        <div className="flex items-center gap-3 min-w-0">
          {/* Recording Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-950/80 border border-red-700/80 text-red-400 text-xs font-bold shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span>REC</span>
            <span className="hidden md:inline font-normal text-slate-300">
              (7-Day Replay Active)
            </span>
          </div>

          <h1 className="text-xs sm:text-sm font-semibold text-slate-200 truncate font-heading">
            Transportation & Logistics Management with SAP S/4HANA — Batch Alpha
          </h1>
        </div>

        {/* Top Right Actions */}
        <div className="flex items-center gap-2">
          {/* Layout switcher */}
          <button
            onClick={() =>
              setMeetingLayout(
                meetingLayout === "tiled"
                  ? "spotlight"
                  : meetingLayout === "spotlight"
                  ? "sidebar"
                  : "tiled"
              )
            }
            className="px-2.5 py-1 rounded-lg bg-[#303134] hover:bg-[#3c4043] text-xs text-slate-300 font-semibold hidden sm:flex items-center gap-1.5 border border-[#3c4043]"
            title="Change Layout (Tiled / Spotlight / Sidebar)"
          >
            <Shapes className="w-3.5 h-3.5 text-[#F5C400]" />
            <span className="capitalize">{meetingLayout}</span>
          </button>

          {/* Fullscreen toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg bg-[#303134] hover:bg-[#3c4043] text-slate-300 hover:text-white transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* MAIN STAGE + SIDE DRAWER */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* VIDEO TILES CANVAS */}
        <div className="flex-1 flex flex-col p-3 sm:p-4 bg-[#202124] relative overflow-hidden">
          {/* TILED / SPOTLIGHT VIEW */}
          {meetingLayout === "spotlight" || isScreenSharing ? (
            // SPOTLIGHT / SCREEN SHARE PRESENTATION VIEW
            <div className="flex-1 flex flex-col lg:flex-row gap-3 overflow-hidden">
              {/* Large Spotlight Presentation Stage */}
              <div className="flex-1 rounded-2xl bg-[#303134] border border-[#3c4043] relative overflow-hidden flex flex-col justify-between p-6 shadow-2xl">
                {isScreenSharing ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-[#0e271d] text-[#F5C400] flex items-center justify-center shadow-xl border border-[#F5C400]/40">
                      <Monitor className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white font-heading">
                        SAP S/4HANA Logistics Execution Terminal
                      </h3>
                      <p className="text-xs text-slate-300 max-w-lg mt-1 font-mono">
                        Transaction VL01N — Outbound Delivery Creation & Post Goods Issue (PGI) simulation with live CFS manifests.
                      </p>
                    </div>
                    <div className="px-3.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-700 text-xs text-emerald-400 font-semibold">
                      Live Terminal Feed • 1080p 60fps
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-600 to-[#F5C400] text-[#0e271d] font-black text-3xl flex items-center justify-center shadow-2xl border-2 border-white">
                      JD
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white font-heading">
                        Justin Burnard Dias
                      </h3>
                      <p className="text-xs text-[#F5C400] font-bold mt-1">
                        Lead Mentor • 16 Years Logistics & Aviation Specialist
                      </p>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                        Speaking: Multimodal Freight Logistics & Container Manifest Clearance
                      </p>
                    </div>
                  </div>
                )}

                {/* Bottom Tile Label */}
                <div className="flex items-center justify-between text-xs pt-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Justin Burnard Dias (Host & Lead Mentor)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 rounded-full bg-black/60 hover:bg-black/90 text-white">
                      <Pin className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Sidebar with Cadet Webcams */}
              <div className="w-full lg:w-64 flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto shrink-0 scrollbar-none">
                {participants.slice(3, 7).map((cadet) => (
                  <div
                    key={cadet.id}
                    className="w-48 lg:w-full h-32 rounded-xl bg-[#303134] border border-[#3c4043] relative overflow-hidden flex items-center justify-center p-3 shrink-0"
                  >
                    <div className="text-center">
                      <div className="w-10 h-10 rounded-full bg-[#0e271d] text-[#F5C400] font-bold text-xs flex items-center justify-center mx-auto border border-[#F5C400]/40">
                        {cadet.name.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="text-[11px] font-bold text-white block mt-1 truncate max-w-[140px]">
                        {cadet.name}
                      </span>
                    </div>

                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px]">
                      <span className="text-emerald-400 font-bold font-mono">Verified</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // TILED GRID VIEW (Google Meet Standard Grid)
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 overflow-y-auto">
              {/* Tile 1: Lead Mentor Spotlight */}
              <div className="rounded-2xl bg-[#303134] border-2 border-[#F5C400]/80 relative overflow-hidden flex flex-col justify-between p-4 shadow-xl">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#F5C400] text-[#0e271d] font-extrabold text-[10px] uppercase">
                    Host & Lead Mentor
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <Mic className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                </div>

                <div className="text-center my-auto">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-600 to-[#F5C400] text-[#0e271d] font-black text-2xl flex items-center justify-center mx-auto shadow-xl border-2 border-white">
                    JD
                  </div>
                  <h4 className="font-bold text-white text-base mt-2">
                    Justin Burnard Dias
                  </h4>
                  <p className="text-[11px] text-[#F5C400] font-mono">
                    16 Yrs Logistics & Aviation Lead
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-[#3c4043]/80">
                  <span className="text-[11px] text-slate-300 font-medium truncate">
                    Broadcasting 1080p Master Class
                  </span>
                  <Pin className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>

              {/* Tile 2: Trainer 1 (Suresh Menon) */}
              <div className="rounded-2xl bg-[#303134] border border-[#3c4043] relative overflow-hidden flex flex-col justify-between p-4 shadow-lg">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-700 text-slate-200 font-bold text-[10px] uppercase">
                    Trainer 1 • EXIM Ops
                  </span>
                  <Mic className="w-3.5 h-3.5 text-emerald-400" />
                </div>

                <div className="text-center my-auto">
                  <div className="w-16 h-16 rounded-full bg-slate-800 text-white font-bold text-xl flex items-center justify-center mx-auto border border-slate-600">
                    SM
                  </div>
                  <h4 className="font-bold text-white text-sm mt-2">Suresh Menon</h4>
                  <p className="text-[10px] text-slate-400 font-mono">Port CFS Specialist</p>
                </div>

                <div className="text-[11px] text-slate-400 truncate">
                  Monitoring Student Logs
                </div>
              </div>

              {/* Tile 3: Trainer 2 (Ananya Pillai) */}
              <div className="rounded-2xl bg-[#303134] border border-[#3c4043] relative overflow-hidden flex flex-col justify-between p-4 shadow-lg">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-700 text-slate-200 font-bold text-[10px] uppercase">
                    Trainer 2 • SAP ERP
                  </span>
                  <MicOff className="w-3.5 h-3.5 text-slate-500" />
                </div>

                <div className="text-center my-auto">
                  <div className="w-16 h-16 rounded-full bg-slate-800 text-white font-bold text-xl flex items-center justify-center mx-auto border border-slate-600">
                    AP
                  </div>
                  <h4 className="font-bold text-white text-sm mt-2">Ananya Pillai</h4>
                  <p className="text-[10px] text-slate-400 font-mono">S/4HANA Terminal Lead</p>
                </div>

                <div className="text-[11px] text-slate-400 truncate">
                  ERP Lab Terminal Ready
                </div>
              </div>

              {/* Tile 4: Student (You) */}
              <div className="rounded-2xl bg-[#303134] border-2 border-emerald-500/80 relative overflow-hidden flex flex-col justify-between p-4 shadow-lg">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 font-bold text-[10px] uppercase border border-emerald-700">
                    You (Active Cadet)
                  </span>
                  <div className="flex items-center gap-1.5">
                    {micOn ? (
                      <Mic className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <MicOff className="w-3.5 h-3.5 text-red-400" />
                    )}
                  </div>
                </div>

                <div className="text-center my-auto">
                  <div className="w-16 h-16 rounded-full bg-[#0e271d] text-[#F5C400] font-black text-xl flex items-center justify-center mx-auto border-2 border-[#F5C400]">
                    {user?.name ? user.name.slice(0, 2).toUpperCase() : "AN"}
                  </div>
                  <h4 className="font-bold text-white text-sm mt-2">
                    {user?.name || "Arjun Nair"}
                  </h4>
                  <p className="text-[10px] text-emerald-400 font-mono">
                    {camOn ? "Webcam Active & Monitored" : "Camera Off"}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-[10px] text-slate-400">Seat #24 / Cohort 50</span>
                  {isHandRaised && (
                    <span className="text-[11px] font-bold text-[#F5C400] flex items-center gap-1 bg-[#F5C400]/15 px-2 py-0.5 rounded-full">
                      ✋ Hand Raised
                    </span>
                  )}
                </div>
              </div>

              {/* Tile 5: Peer Cadet (Priya Lakshmi) */}
              <div className="rounded-2xl bg-[#303134] border border-[#3c4043] relative overflow-hidden flex flex-col justify-between p-4 shadow-lg">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[11px] font-medium text-slate-300">Priya Lakshmi</span>
                  <MicOff className="w-3.5 h-3.5 text-slate-500" />
                </div>
                <div className="text-center my-auto">
                  <div className="w-14 h-14 rounded-full bg-slate-800 text-slate-300 font-bold text-lg flex items-center justify-center mx-auto">
                    PL
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 flex items-center justify-between">
                  <span>Cadet #12</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
              </div>

              {/* Tile 6: Peer Cadets Roster Banner */}
              <div className="rounded-2xl bg-[#303134] border border-[#3c4043] relative overflow-hidden flex flex-col items-center justify-center p-4 text-center shadow-lg">
                <div className="w-14 h-14 rounded-full bg-white/10 text-white font-bold text-sm flex items-center justify-center mx-auto mb-2">
                  +45
                </div>
                <h4 className="font-bold text-white text-sm">More Cadets in Live Cohort</h4>
                <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                  All 50 webcams active under Lead Faculty surveillance
                </p>
                <button
                  onClick={() => setActiveSidePanel("people")}
                  className="mt-3 px-3 py-1 rounded-full bg-slate-700 hover:bg-slate-600 text-xs font-semibold text-white"
                >
                  View Full Roster
                </button>
              </div>
            </div>
          )}

          {/* LIVE CAPTIONS OVERLAY (When CC is toggled on) */}
          {captionsOn && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 max-w-2xl w-full px-4 z-20">
              <div className="bg-black/85 backdrop-blur-md rounded-2xl p-3.5 border border-[#3c4043] shadow-2xl text-center space-y-1">
                <span className="text-[10px] font-bold text-[#F5C400] uppercase tracking-wider block">
                  Live Subtitles (CC)
                </span>
                <p className="text-xs sm:text-sm text-white font-medium leading-relaxed">
                  <strong>Justin Burnard Dias:</strong> &quot;In VL01N, make sure your shipping point matches the container freight station manifest before booking post goods issue (PGI)...&quot;
                </p>
              </div>
            </div>
          )}
        </div>

        {/* GOOGLE MEET RIGHT SIDE PANELS */}
        {activeSidePanel && (
          <aside className="w-80 sm:w-96 bg-[#202124] border-l border-[#3c4043] flex flex-col shrink-0 z-30">
            {/* Panel Header */}
            <div className="p-4 border-b border-[#3c4043] flex items-center justify-between">
              <h3 className="font-bold text-sm text-white capitalize font-heading">
                {activeSidePanel === "chat" && "In-Call Messages"}
                {activeSidePanel === "people" && "People (50 Cadets + Faculty)"}
                {activeSidePanel === "info" && "Meeting Details"}
                {activeSidePanel === "activities" && "Activities & SAP Tools"}
                {activeSidePanel === "host" && "Host Controls"}
              </h3>
              <button
                onClick={() => setActiveSidePanel(null)}
                className="w-8 h-8 rounded-full hover:bg-[#3c4043] text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* TAB: CHAT */}
            {activeSidePanel === "chat" && (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="p-3 bg-[#303134]/60 text-[11px] text-slate-300 border-b border-[#3c4043] leading-relaxed">
                  Messages can only be seen by people in the call and are deleted when the call ends.
                </div>

                <div className="flex-1 p-4 space-y-3 overflow-y-auto text-xs">
                  {messages.map((m) => (
                    <div key={m.id} className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-bold ${
                            m.isInstructor ? "text-[#F5C400]" : "text-white"
                          }`}
                        >
                          {m.sender}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {m.timestamp}
                        </span>
                      </div>
                      <p className="text-slate-200 leading-relaxed bg-[#303134] p-2.5 rounded-xl border border-[#3c4043]">
                        {m.text}
                      </p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="p-3 border-t border-[#3c4043] flex gap-2 bg-[#202124]">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Send a message to everyone..."
                    className="flex-1 px-3.5 py-2.5 rounded-full bg-[#303134] border border-[#3c4043] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#F5C400]"
                  />
                  <button
                    type="submit"
                    className="w-9 h-9 rounded-full bg-[#F5C400] text-[#0e271d] font-bold flex items-center justify-center hover:bg-amber-300 transition-colors shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* TAB: PEOPLE */}
            {activeSidePanel === "people" && (
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                <div className="text-[11px] text-slate-400 font-mono">
                  1 Lead Mentor + 2 Trainers • 50 Enrolled Cadets
                </div>

                {participants.map((p) => (
                  <div
                    key={p.id}
                    className="p-3 rounded-xl bg-[#303134] border border-[#3c4043] flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-semibold text-white">{p.name}</div>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#202124] text-[#F5C400] font-bold">
                        {p.role}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${p.isCamOn ? "bg-emerald-400" : "bg-red-400"}`} />
                      {p.isMuted ? (
                        <MicOff className="w-3.5 h-3.5 text-slate-500" />
                      ) : (
                        <Mic className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB: DETAILS / INFO */}
            {activeSidePanel === "info" && (
              <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs text-slate-300">
                <div className="p-4 rounded-xl bg-[#303134] border border-[#3c4043] space-y-2">
                  <span className="text-[10px] font-bold text-[#F5C400] uppercase tracking-wider">
                    Course Information
                  </span>
                  <h4 className="text-sm font-bold text-white font-heading">
                    Transportation & Logistics Management with SAP
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Cohort Code: ID-TLM-SAP-BATCH-01
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#303134] border border-[#3c4043] space-y-2">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                    7-Day Recording Engine
                  </span>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    This live session is automatically captured in 1080p master quality. Accessible for 7 days on the recordings page, then securely archived in the server vault for 2 years.
                  </p>
                </div>
              </div>
            )}
          </aside>
        )}
      </div>

      {/* BOTTOM GOOGLE MEET CONTROL BAR */}
      <footer className="h-20 bg-[#202124] px-4 sm:px-6 flex items-center justify-between shrink-0 border-t border-[#3c4043] z-40">
        {/* Left: Meeting Time & Code */}
        <div className="hidden md:flex items-center gap-3 text-xs text-slate-300 font-mono">
          <span className="font-bold text-white">{currentTimeStr || "10:30 AM"}</span>
          <span>|</span>
          <span className="text-slate-400">id-tlm-sap-live</span>
        </div>

        {/* Center: Main Google Meet Circular Action Buttons */}
        <div className="flex items-center gap-2.5 sm:gap-3 mx-auto md:mx-0">
          {/* 1. Mic Button */}
          <button
            type="button"
            onClick={() => setMicOn(!micOn)}
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all ${
              micOn
                ? "bg-[#3c4043] hover:bg-slate-600 text-white"
                : "bg-[#ea4335] hover:bg-red-700 text-white"
            }`}
            title={micOn ? "Turn off microphone" : "Turn on microphone"}
          >
            {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </button>

          {/* 2. Camera Button */}
          <button
            type="button"
            onClick={() => setCamOn(!camOn)}
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all ${
              camOn
                ? "bg-[#3c4043] hover:bg-slate-600 text-white"
                : "bg-[#ea4335] hover:bg-red-700 text-white"
            }`}
            title={camOn ? "Turn off camera" : "Turn on camera"}
          >
            {camOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
          </button>

          {/* 3. Captions (CC) */}
          <button
            type="button"
            onClick={() => setCaptionsOn(!captionsOn)}
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all ${
              captionsOn
                ? "bg-[#8ab4f8] text-[#202124] font-bold"
                : "bg-[#3c4043] hover:bg-slate-600 text-white"
            }`}
            title="Turn on captions"
          >
            <Subtitles className="w-5 h-5" />
          </button>

          {/* 4. Reaction Picker */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowReactionPicker(!showReactionPicker)}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#3c4043] hover:bg-slate-600 text-white flex items-center justify-center transition-all"
              title="Send a reaction"
            >
              <Smile className="w-5 h-5" />
            </button>

            {/* Reaction Emoji Menu */}
            {showReactionPicker && (
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-[#303134] border border-[#3c4043] rounded-full p-1.5 flex items-center gap-1 shadow-2xl z-50">
                {["💖", "👍", "👏", "💡", "✋"].map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => triggerReaction(emoji)}
                    className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center text-xl transition-transform hover:scale-125"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 5. Screen Share (Present Now) */}
          <button
            type="button"
            onClick={() => setIsScreenSharing(!isScreenSharing)}
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all ${
              isScreenSharing
                ? "bg-[#8ab4f8] text-[#202124] font-bold"
                : "bg-[#3c4043] hover:bg-slate-600 text-white"
            }`}
            title="Present your screen / SAP workspace"
          >
            <Monitor className="w-5 h-5" />
          </button>

          {/* 6. Raise Hand */}
          <button
            type="button"
            onClick={() => setIsHandRaised(!isHandRaised)}
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all ${
              isHandRaised
                ? "bg-[#F5C400] text-[#0e271d] font-bold shadow-[0_0_15px_rgba(245,196,0,0.5)]"
                : "bg-[#3c4043] hover:bg-slate-600 text-white"
            }`}
            title={isHandRaised ? "Lower hand" : "Raise hand to ask faculty"}
          >
            <Hand className="w-5 h-5" />
          </button>

          {/* 7. Leave Call Button */}
          <button
            type="button"
            onClick={() => setHasJoinedMeeting(false)}
            className="h-11 sm:h-12 px-5 sm:px-6 rounded-full bg-[#ea4335] hover:bg-red-700 text-white flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ml-1"
            title="Leave call"
          >
            <PhoneOff className="w-5 h-5" />
          </button>
        </div>

        {/* Right: Google Meet Info & Side Drawer Toggles */}
        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={() => setActiveSidePanel(activeSidePanel === "info" ? null : "info")}
            className={`p-3 rounded-full transition-colors ${
              activeSidePanel === "info" ? "text-[#8ab4f8] bg-[#303134]" : "text-slate-300 hover:bg-[#303134]"
            }`}
            title="Meeting details"
          >
            <Info className="w-5 h-5" />
          </button>

          <button
            onClick={() => setActiveSidePanel(activeSidePanel === "people" ? null : "people")}
            className={`p-3 rounded-full transition-colors flex items-center gap-1.5 ${
              activeSidePanel === "people" ? "text-[#8ab4f8] bg-[#303134]" : "text-slate-300 hover:bg-[#303134]"
            }`}
            title="People (50 participants)"
          >
            <Users className="w-5 h-5" />
            <span className="text-xs font-mono font-bold">50</span>
          </button>

          <button
            onClick={() => setActiveSidePanel(activeSidePanel === "chat" ? null : "chat")}
            className={`p-3 rounded-full transition-colors ${
              activeSidePanel === "chat" ? "text-[#8ab4f8] bg-[#303134]" : "text-slate-300 hover:bg-[#303134]"
            }`}
            title="In-call messages"
          >
            <MessageSquare className="w-5 h-5" />
          </button>

          <button
            onClick={() => setActiveSidePanel(activeSidePanel === "activities" ? null : "activities")}
            className={`p-3 rounded-full transition-colors ${
              activeSidePanel === "activities" ? "text-[#8ab4f8] bg-[#303134]" : "text-slate-300 hover:bg-[#303134]"
            }`}
            title="Activities & Tools"
          >
            <Shapes className="w-5 h-5" />
          </button>
        </div>
      </footer>
    </div>
  );
}
