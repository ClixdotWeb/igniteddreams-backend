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

  const handleDemoFill = (role: "student" | "instructor" | "admin") => {
    setError(null);
    if (role === "student") {
      setEmail("rahul.sharma@example.com");
      setPassword("StudentPass2026!");
    } else if (role === "instructor") {
      setEmail("instructor1@igniteddreams.com");
      setPassword("InstructorPass2026!");
    } else {
      setEmail("admin@igniteddreams.com");
      setPassword("AdminPassword2026!");
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
              Access your enrolled Logistics, Aviation & Skill training classrooms, live streams, and 7-day recordings.
            </p>
          </div>

          {/* Quick Demo Selector for instant validation */}
          <div className="p-3.5 rounded-xl bg-white border border-aviation-border space-y-2 shadow-subtle">
            <div className="text-[11px] font-bold text-aviation-charcoal uppercase tracking-wider flex items-center justify-between">
              <span>Quick Test Access</span>
              <Badge variant="yellow" size="sm">
                1-Click
              </Badge>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleDemoFill("student")}
                className="px-2.5 py-1.5 rounded bg-aviation-offWhite hover:bg-aviation-yellow hover:text-aviation-black text-xs font-semibold text-aviation-charcoal border border-aviation-border transition-colors text-center"
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => handleDemoFill("instructor")}
                className="px-2.5 py-1.5 rounded bg-aviation-offWhite hover:bg-aviation-yellow hover:text-aviation-black text-xs font-semibold text-aviation-charcoal border border-aviation-border transition-colors text-center"
              >
                Instructor
              </button>
              <button
                type="button"
                onClick={() => handleDemoFill("admin")}
                className="px-2.5 py-1.5 rounded bg-aviation-offWhite hover:bg-aviation-yellow hover:text-aviation-black text-xs font-semibold text-aviation-charcoal border border-aviation-border transition-colors text-center"
              >
                Admin
              </button>
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
