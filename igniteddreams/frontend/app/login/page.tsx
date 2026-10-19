"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { useAuth } from "@/lib/auth-context";
import { GraduationCap, ArrowRight, Lock, Mail, AlertCircle, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const user = await login(email, password);
      if (user.role === "ADMIN") {
        router.push("/admin");
      } else if (user.role === "INSTRUCTOR") {
        router.push("/instructor/dashboard");
      } else {
        router.push("/student/dashboard");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Invalid email or password";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemoLogin = async (role: "student" | "instructor" | "admin") => {
    setError(null);
    setIsLoading(true);
    let demoEmail = "rahul.sharma@example.com";
    let demoPass = "StudentPass2026!";
    let target = "/student/dashboard";

    if (role === "instructor") {
      demoEmail = "instructor1@igniteddreams.com";
      demoPass = "InstructorPass2026!";
      target = "/instructor/dashboard";
    } else if (role === "admin") {
      demoEmail = "admin@igniteddreams.com";
      demoPass = "AdminPassword2026!";
      target = "/admin";
    }

    setEmail(demoEmail);
    setPassword(demoPass);

    try {
      await login(demoEmail, demoPass);
      router.push(target);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Quick login failed";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <div className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-aviation-offWhite relative">
        <div className="w-full max-w-md space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-aviation-black text-aviation-yellow flex items-center justify-center mx-auto shadow-sm">
              <GraduationCap className="w-6 h-6 text-aviation-yellow" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-aviation-black tracking-tight font-heading">
              Skill Academy Portal Login
            </h1>
            <p className="text-xs text-slate-500">
              Access your enrolled Logistics, Aviation &amp; Skill training classrooms, live streams, and 7-day recordings.
            </p>
          </div>

          {/* Quick Demo Selector for instant validation */}
          <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 space-y-2.5 shadow-sm">
            <div className="text-[11px] font-bold text-amber-950 uppercase tracking-wider flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-heading">
                <span className="w-2 h-2 rounded-full bg-amber-500 inline-block animate-pulse" />
                Client Review Prototype Demo
              </span>
              <Badge variant="yellow" size="sm">
                1-Click Access
              </Badge>
            </div>
            <p className="text-[11.5px] text-amber-900 leading-tight">
              Click any role to log in instantly without typing passwords:
            </p>
            <div className="grid grid-cols-1 gap-2 pt-1">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin("student")}
                disabled={isLoading}
                className="w-full px-3 py-2.5 rounded-xl bg-[#0e271d] hover:bg-slate-900 text-[#F5C400] text-xs font-bold transition-all shadow-xs text-left flex items-center justify-between cursor-pointer"
              >
                <span>🎓 Enrolled Student (Rahul Sharma)</span>
                <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded font-mono">
                  Live &amp; Recordings
                </span>
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin("instructor")}
                  disabled={isLoading}
                  className="px-2.5 py-2 rounded-lg bg-white hover:bg-amber-100 text-xs font-semibold text-slate-800 border border-amber-200 transition-colors text-center cursor-pointer"
                >
                  👨‍🏫 Instructor
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin("admin")}
                  disabled={isLoading}
                  className="px-2.5 py-2 rounded-lg bg-white hover:bg-amber-100 text-xs font-semibold text-slate-800 border border-amber-200 transition-colors text-center cursor-pointer"
                >
                  🛡️ Director Admin
                </button>
              </div>
            </div>
          </div>

          {/* Login Card */}
          <Card padding="lg" variant="default" className="shadow-card">
            {error && (
              <div className="mb-5 p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-aviation-charcoal uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-aviation-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-aviation-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-aviation-yellow focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-aviation-charcoal uppercase tracking-wider">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-aviation-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-aviation-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-aviation-yellow focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  isLoading={isLoading}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Sign In to Academy
                </Button>
              </div>
            </form>

            <div className="mt-6 pt-4 border-t border-aviation-border text-center text-xs text-aviation-muted">
              Don&apos;t have an enrolled account?{" "}
              <Link href="/register" className="font-bold text-aviation-black hover:underline">
                Register as Student
              </Link>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
