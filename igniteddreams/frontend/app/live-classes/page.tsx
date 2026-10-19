"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Radio, ArrowRight, ShieldCheck, CheckCircle2, Sparkles, LogIn, Lock } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { useAuth } from "@/lib/auth-context";

export default function PublicLiveClassesRedirectPage() {
  const router = useRouter();
  const { user, login } = useAuth();
  const [isDemoLoggingIn, setIsDemoLoggingIn] = React.useState(false);

  useEffect(() => {
    if (user) {
      router.replace("/student/dashboard");
    }
  }, [user, router]);

  const handleInstantDemo = async () => {
    setIsDemoLoggingIn(true);
    try {
      await login("rahul.sharma@example.com", "StudentPass2026!");
      router.push("/student/dashboard");
    } catch {
      router.push("/login");
    } finally {
      setIsDemoLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F7F4]">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6">
        <div className="max-w-lg w-full">
          <Card padding="lg" variant="default" className="border-2 border-slate-200 shadow-xl bg-white text-center">
            <div className="w-16 h-16 rounded-full bg-[#0e271d] text-[#F5C400] flex items-center justify-center mx-auto mb-4 shadow-md">
              <Lock className="w-8 h-8" />
            </div>

            <Badge variant="yellow" size="sm" className="mb-3">
              Enrolled Cadet Portal Only
            </Badge>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0e271d] font-heading tracking-tight">
              Monitored Live Classroom
            </h1>

            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              Interactive WebRTC live classrooms and daily faculty sessions are conducted directly inside the portal for enrolled students with webcam verification.
            </p>

            <div className="my-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2.5 text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>3 Hours Daily Live Class (2h Lecture + 1h Doubt Resolution)</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Dual-monitored camera session with instant LiveKit connection</span>
              </div>
            </div>

            {/* Client Prototype Demo Access */}
            <div className="p-3.5 mb-6 rounded-xl bg-amber-50 border border-amber-300 text-left">
              <div className="flex items-center justify-between text-xs font-bold text-amber-950 mb-1">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  Client Review Prototype Mode
                </span>
                <span className="bg-amber-200 text-amber-900 text-[10px] px-2 py-0.5 rounded-full font-bold">
                  Instant Test
                </span>
              </div>
              <p className="text-[11.5px] text-amber-800 mb-3">
                Click below to test the complete live classroom &amp; portal flow as enrolled student:
              </p>
              <button
                type="button"
                onClick={handleInstantDemo}
                disabled={isDemoLoggingIn}
                className="w-full py-2.5 px-4 rounded-lg bg-[#0e271d] hover:bg-slate-900 text-[#F5C400] font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.99] cursor-pointer"
              >
                {isDemoLoggingIn ? "Logging into Portal..." : "⚡ 1-Click Prototype Preview (Join Live Portal)"}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5 pt-2 border-t border-slate-100">
              <Link href="/login" className="block w-full">
                <Button variant="outline" size="md" className="w-full font-bold justify-center" leftIcon={<LogIn className="w-4 h-4" />}>
                  Log In to Student Portal
                </Button>
              </Link>
              <Link href="/checkout" className="block w-full">
                <Button variant="primary" size="md" className="w-full font-bold justify-center" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Enroll &amp; Pay Course Fee Online
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
