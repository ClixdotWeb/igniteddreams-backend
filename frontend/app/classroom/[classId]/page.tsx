"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import api from "@/lib/api";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  MonitorOff,
  PhoneOff,
  MessageSquare,
  Users,
  Compass,
  Circle,
  Radio,
  Send,
  X,
  ShieldAlert,
  Info,
  Square,
  Settings,
} from "lucide-react";

interface ClassroomInfo {
  token: string;
  roomName: string;
  livekitUrl: string;
  classSession: {
    id: string;
    title: string;
    status: string;
    recordingEnabled: boolean;
    instructorName: string;
  };
}

interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
  isInstructor?: boolean;
}

export default function LiveClassroomPage() {
  const params = useParams();
  const router = useRouter();
  const classId = params?.classId as string;
  const { user } = useAuth();

  const [classInfo, setClassInfo] = useState<ClassroomInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pre-join notice modal
  const [noticeAccepted, setNoticeAccepted] = useState(false);

  // Classroom controls state
  const [micEnabled, setMicEnabled] = useState(true);
  const [camEnabled, setCamEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [activeSideTab, setActiveSideTab] = useState<"chat" | "participants" | null>("chat");
  const [isRecording, setIsRecording] = useState(true);

  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m-1",
      sender: "Capt. Vikram Malhotra",
      text: "Welcome cadets. Today we are calculating track and wind drift angles for cross-country routes. Have your flight computers ready.",
      timestamp: "10:05",
      isInstructor: true,
    },
    {
      id: "m-2",
      sender: "Rahul Sharma",
      text: "Good morning Captain. Ready with chart 285° track.",
      timestamp: "10:07",
    },
  ]);
  const [chatInput, setChatInput] = useState("");

  // Participants
  const participants = [
    { name: "Capt. Vikram Malhotra (Instructor)", role: "INSTRUCTOR", isMuted: false, isCameraOn: true },
    { name: user?.name ? `${user.name} (You)` : "Cadet (You)", role: user?.role || "STUDENT", isMuted: !micEnabled, isCameraOn: camEnabled },
    { name: "Priya Patel", role: "STUDENT", isMuted: true, isCameraOn: true },
    { name: "Rohan Verma", role: "STUDENT", isMuted: true, isCameraOn: false },
  ];

  const isInstructor = user?.role === "INSTRUCTOR" || user?.role === "ADMIN";

  useEffect(() => {
    async function initClassroom() {
      try {
        const res = await api.post<ClassroomInfo>("/livekit/token", { classId });
        setClassInfo(res);
      } catch (err: unknown) {
        // Fallback demo classroom state
        setClassInfo({
          token: "demo-token",
          roomName: `room_${classId}`,
          livekitUrl: "https://livekit.example.com",
          classSession: {
            id: classId,
            title: "Air Navigation: Cross-Country Flight Planning & Dead Reckoning",
            status: "LIVE",
            recordingEnabled: true,
            instructorName: "Capt. Vikram Malhotra",
          },
        });
      } finally {
        setLoading(false);
      }
    }

    if (classId) {
      initClassroom();
    }
  }, [classId]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: user?.name || (isInstructor ? "Flight Instructor" : "Cadet"),
      text: chatInput.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isInstructor,
    };

    setMessages((prev) => [...prev, newMsg]);
    setChatInput("");
  };

  const handleLeave = () => {
    if (isInstructor) {
      router.push("/instructor/dashboard");
    } else {
      router.push("/student/dashboard");
    }
  };

  const handleEndClass = async () => {
    if (!confirm("Are you sure you want to end this live class? All participants will be disconnected and recording processing will begin.")) {
      return;
    }
    try {
      await api.post(`/instructor/classes/${classId}/end`);
      router.push("/instructor/dashboard");
    } catch {
      router.push("/instructor/dashboard");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-aviation-black flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <Compass className="w-10 h-10 text-aviation-yellow animate-spin" />
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
            Establishing Live Virtual Classroom Handshake...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-aviation-black text-white flex flex-col overflow-hidden select-none font-sans">
      {/* PRE-JOIN RECORDING ADVISORY MODAL */}
      {!noticeAccepted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-aviation-black/80 backdrop-blur-md">
          <div className="max-w-md w-full bg-aviation-charcoal border border-aviation-yellow/40 rounded-2xl p-6 sm:p-8 space-y-5 shadow-elevated">
            <div className="w-12 h-12 rounded-xl bg-aviation-yellow/10 border border-aviation-yellow/30 text-aviation-yellow flex items-center justify-center">
              <Radio className="w-6 h-6 animate-live-pulse" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-white font-heading">
                Entering Live Virtual Flight Deck
              </h2>
              <div className="text-xs text-aviation-yellow mt-1 font-mono font-bold">
                {classInfo?.classSession.title}
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-aviation-black/60 border border-white/10 text-xs text-gray-300 space-y-2">
              <div className="flex items-center gap-2 font-bold text-aviation-yellow">
                <Info className="w-4 h-4" />
                <span>Recording Advisory Notice</span>
              </div>
              <p className="leading-relaxed">
                This live session is automatically recorded and will be made available to authorized enrolled cadets for a period of <strong>7 days</strong> following session completion.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <Button variant="ghost" size="sm" onClick={() => router.back()} className="text-gray-400 hover:text-white">
                Cancel
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={() => setNoticeAccepted(true)}
              >
                Join Live Classroom
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 1. TOP BAR */}
      <header className="h-14 sm:h-16 bg-aviation-black border-b border-aviation-charcoal px-4 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-3">
          <Badge variant="live" size="sm" dot>
            LIVE
          </Badge>
          <div className="overflow-hidden">
            <h1 className="text-xs sm:text-sm font-bold text-white truncate max-w-xs sm:max-w-md font-heading">
              {classInfo?.classSession.title}
            </h1>
            <div className="text-[10px] text-gray-400 font-mono hidden sm:block">
              Instructor: {classInfo?.classSession.instructorName} • Room: {classInfo?.roomName}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Recording Status indicator */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-red-950/40 border border-red-800 text-red-400 text-xs font-bold tracking-wider animate-live-pulse">
            <Circle className="w-2.5 h-2.5 fill-red-500 text-red-500" />
            <span>EGRESS 720P</span>
          </div>

          <div className="text-xs font-mono text-gray-400 hidden md:block">
            WebRTC Encrypted
          </div>

          {/* Quick Leave */}
          <button
            onClick={handleLeave}
            className="px-3 py-1.5 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white text-xs font-bold transition-colors"
          >
            Leave
          </button>
        </div>
      </header>

      {/* 2. CENTER STAGE & SIDEBAR */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Main Video / Shared Screen Canvas */}
        <div className="flex-1 flex flex-col bg-aviation-charcoal relative overflow-hidden">
          <div className="flex-1 relative flex items-center justify-center p-3 sm:p-6 overflow-hidden">
            {isScreenSharing ? (
              // Shared Screen Stage (Center Stage)
              <div className="w-full h-full rounded-xl bg-aviation-black border border-aviation-yellow/30 flex flex-col items-center justify-center p-6 relative overflow-hidden">
                <div className="text-center space-y-3 z-10">
                  <div className="w-14 h-14 rounded-full bg-aviation-yellow/20 text-aviation-yellow flex items-center justify-center mx-auto">
                    <Monitor className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-white font-heading">
                    Shared Screen Presentation Stage
                  </h3>
                  <p className="text-xs text-gray-400 max-w-md font-mono">
                    Air Navigation Cross-Country Plot: Track 285°, Wind 040°/20KT, Density Altitude 6,200 FT.
                  </p>
                </div>

                {/* Floating Instructor PIP Mini Tile */}
                <div className="absolute top-4 right-4 w-40 aspect-video rounded-xl bg-aviation-softBlack border border-aviation-yellow shadow-elevated p-2 flex flex-col justify-between z-20">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-aviation-yellow">Capt. Vikram M.</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </div>
                  <div className="text-[9px] text-gray-400 font-mono">
                    Instructor PIP
                  </div>
                </div>
              </div>
            ) : (
              // Speaker Video Grid Stage
              <div className="w-full h-full rounded-xl bg-aviation-black border border-white/5 flex flex-col items-center justify-center relative overflow-hidden p-6">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-aviation-yellow text-aviation-black flex items-center justify-center mx-auto font-bold text-2xl shadow-glowYellow">
                    VM
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white font-heading">
                      Capt. Vikram Malhotra
                    </h2>
                    <div className="text-xs text-aviation-yellow font-semibold mt-0.5">
                      Chief Flight Instructor
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-live-pulse"></span>
                    <span>Broadcasting 1080p WebRTC</span>
                  </div>
                </div>

                {/* Cadet Self Mini-Tile */}
                <div className="absolute bottom-4 right-4 w-36 aspect-video rounded-xl bg-aviation-softBlack border border-white/20 p-2 flex flex-col justify-between">
                  <div className="text-[10px] font-bold text-white truncate">
                    {user?.name || "Cadet (You)"}
                  </div>
                  <div className="flex items-center justify-between text-[9px]">
                    <span className="text-gray-400">{camEnabled ? "Camera On" : "Camera Off"}</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${micEnabled ? "bg-emerald-400" : "bg-red-400"}`}></span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 3. RIGHT SIDEBAR (Chat & Participants Drawer) */}
        {activeSideTab && (
          <aside className="w-80 bg-aviation-softBlack border-l border-aviation-charcoal flex flex-col shrink-0 z-20">
            {/* Tab switch header */}
            <div className="h-12 border-b border-aviation-charcoal flex items-center justify-between px-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveSideTab("chat")}
                  className={`text-xs font-bold px-3 py-1 rounded transition-colors ${
                    activeSideTab === "chat" ? "bg-aviation-yellow text-aviation-black" : "text-gray-400 hover:text-white"
                  }`}
                >
                  Live Chat
                </button>
                <button
                  onClick={() => setActiveSideTab("participants")}
                  className={`text-xs font-bold px-3 py-1 rounded transition-colors ${
                    activeSideTab === "participants" ? "bg-aviation-yellow text-aviation-black" : "text-gray-400 hover:text-white"
                  }`}
                >
                  Participants ({participants.length})
                </button>
              </div>

              <button
                onClick={() => setActiveSideTab(null)}
                className="text-gray-400 hover:text-white p-1 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat View */}
            {activeSideTab === "chat" && (
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`p-2.5 rounded-lg text-xs space-y-1 ${
                        m.isInstructor
                          ? "bg-aviation-yellow/15 border border-aviation-yellow/30 text-white"
                          : "bg-white/5 border border-white/5 text-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-bold ${m.isInstructor ? "text-aviation-yellow" : "text-white"}`}>
                          {m.sender}
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono">{m.timestamp}</span>
                      </div>
                      <p className="text-gray-300 leading-relaxed">{m.text}</p>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="p-3 border-t border-aviation-charcoal bg-aviation-black flex items-center gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask question or message class..."
                    className="flex-1 px-3 py-2 rounded-lg bg-aviation-charcoal border border-white/10 text-xs text-white focus:outline-none focus:ring-1 focus:ring-aviation-yellow"
                  />
                  <button
                    type="submit"
                    className="p-2 rounded-lg bg-aviation-yellow text-aviation-black hover:bg-aviation-yellowBright transition-colors shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* Participants View */}
            {activeSideTab === "participants" && (
              <div className="flex-1 p-4 space-y-2 overflow-y-auto">
                {participants.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-white">{p.name}</div>
                      <div className="text-[10px] text-gray-400 uppercase font-mono">{p.role}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      {p.isMuted ? (
                        <MicOff className="w-3.5 h-3.5 text-red-400" />
                      ) : (
                        <Mic className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                      {p.isCameraOn ? (
                        <Video className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <VideoOff className="w-3.5 h-3.5 text-red-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </aside>
        )}
      </div>

      {/* 4. CLASSROOM CONTROL BAR */}
      <footer className="h-16 sm:h-20 bg-aviation-black border-t border-aviation-charcoal px-4 flex items-center justify-between shrink-0 z-20">
        {/* Left: Session timer */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-gray-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>LIVE RECORDING ACTIVE</span>
        </div>

        {/* Center: Primary Media Controls */}
        <div className="flex items-center gap-2 sm:gap-3 mx-auto">
          {/* Mic */}
          <button
            onClick={() => setMicEnabled(!micEnabled)}
            className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
              micEnabled
                ? "bg-aviation-charcoal text-white hover:bg-white/20"
                : "bg-red-600 text-white"
            }`}
            title={micEnabled ? "Mute Microphone" : "Unmute Microphone"}
          >
            {micEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </button>

          {/* Camera */}
          <button
            onClick={() => setCamEnabled(!camEnabled)}
            className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
              camEnabled
                ? "bg-aviation-charcoal text-white hover:bg-white/20"
                : "bg-red-600 text-white"
            }`}
            title={camEnabled ? "Turn Camera Off" : "Turn Camera On"}
          >
            {camEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
          </button>

          {/* Screen Share (Instructor only) */}
          {isInstructor && (
            <button
              onClick={() => setIsScreenSharing(!isScreenSharing)}
              className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                isScreenSharing
                  ? "bg-aviation-yellow text-aviation-black"
                  : "bg-aviation-charcoal text-white hover:bg-white/20"
              }`}
              title="Share Screen / Navigation Presentation"
            >
              <Monitor className="w-5 h-5" />
            </button>
          )}

          {/* Instructor End Class button */}
          {isInstructor && (
            <button
              onClick={handleEndClass}
              className="px-3 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
              title="End Class Session for all participants"
            >
              <Square className="w-4 h-4 fill-white" />
              <span className="hidden sm:inline">End Class</span>
            </button>
          )}
        </div>

        {/* Right: Drawer toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSideTab(activeSideTab === "chat" ? null : "chat")}
            className={`p-2.5 rounded-xl transition-colors ${
              activeSideTab === "chat" ? "bg-aviation-yellow text-aviation-black" : "bg-aviation-charcoal text-white hover:bg-white/10"
            }`}
            title="Toggle Live Chat"
          >
            <MessageSquare className="w-5 h-5" />
          </button>

          <button
            onClick={() => setActiveSideTab(activeSideTab === "participants" ? null : "participants")}
            className={`p-2.5 rounded-xl transition-colors ${
              activeSideTab === "participants" ? "bg-aviation-yellow text-aviation-black" : "bg-aviation-charcoal text-white hover:bg-white/10"
            }`}
            title="Toggle Participants"
          >
            <Users className="w-5 h-5" />
          </button>
        </div>
      </footer>
    </div>
  );
}
