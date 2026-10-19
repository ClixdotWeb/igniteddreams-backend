"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Video,
  Users,
  CreditCard,
  QrCode,
  Building,
  ArrowRight,
  AlertCircle,
  FileCheck,
  Sparkles,
  Camera,
  Download,
  Calendar,
} from "lucide-react";

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseParam = searchParams.get("course") || "transportation-logistics-sap";

  // Form states
  const [studentName, setStudentName] = useState("Arjun Nair");
  const [studentEmail, setStudentEmail] = useState("arjun.nair@example.com");
  const [studentPhone, setStudentPhone] = useState("+91 98471 23456");
  const [educationLevel, setEducationLevel] = useState("Graduate (B.Com / BBA / B.Tech / BA)");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [upiId, setUpiId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [admissionPass, setAdmissionPass] = useState<{
    id: string;
    batch: string;
    date: string;
    mentor: string;
    classTime: string;
  } | null>(null);

  const courseDetails = {
    title: "Transportation & Logistics Management Course with SAP (ERP)",
    code: "ID-TLM-SAP-101",
    duration: "6 Months Intensive (3 Hours/Day, 5 Days/Week)",
    fee: 25000,
    marketFee: 125000,
    tax: "Included (0% extra)",
    batchSize: "Strict 50 Students Limit",
    teachingRatio: "1 Lead Mentor + 2 Specialized Trainers",
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
      setAdmissionPass({
        id: `ID-LOG-${Math.floor(100000 + Math.random() * 900000)}`,
        batch: "Cohort Alpha (50 Students - Morning 09:00 to 12:00 IST)",
        date: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        mentor: "Justin Burnard Dias (16 Yrs Logistics & Aviation Lead)",
        classTime: "Daily 3 Hours (2 Hours Live Class + 1 Hour Doubt Clearing)",
      });
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto w-full">
        {/* Breadcrumb & Header */}
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <Badge variant="yellow" size="sm" className="mb-3">
            Official Admission & Student Check-In
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            {isPaid ? "Payment Successful — Check-In Confirmed!" : "Enroll & Pay Course Fee Online"}
          </h1>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            {isPaid
              ? "Your seat is confirmed in our 50-student cohort. You can now check in to the live classroom directly on the website."
              : "Direct admission at running cost. No corporate markups. 100% tax included with strictly monitored live classes."}
          </p>
        </div>

        {!isPaid ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Student Details & Payment Form (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <Card padding="lg" variant="default" className="shadow-sm border border-slate-200">
                <h2 className="text-lg font-bold text-slate-900 font-heading mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-aviation-yellow text-slate-900 text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  Student Information & Eligibility
                </h2>

                <form onSubmit={handlePayment} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-aviation-yellow focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={studentPhone}
                        onChange={(e) => setStudentPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-aviation-yellow focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-aviation-yellow focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Education Status *
                      </label>
                      <select
                        value={educationLevel}
                        onChange={(e) => setEducationLevel(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-aviation-yellow focus:outline-none bg-white"
                      >
                        <option>Graduate (B.Com / BBA / B.Tech / BA)</option>
                        <option>Undergraduate (Final Year)</option>
                        <option>Diploma / Higher Secondary (10+2)</option>
                        <option>Working Professional seeking 3PL/Logistics Shift</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <h2 className="text-lg font-bold text-slate-900 font-heading mb-4 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-aviation-yellow text-slate-900 text-xs font-bold flex items-center justify-center">
                        2
                      </span>
                      Select Online Payment Method
                    </h2>

                    {/* Payment Method Selector */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("upi")}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          paymentMethod === "upi"
                            ? "border-amber-500 bg-amber-50/60 text-slate-900 font-bold shadow-sm"
                            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <QrCode className="w-5 h-5 mx-auto mb-1 text-amber-600" />
                        <span className="text-xs">UPI / QR</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("card")}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          paymentMethod === "card"
                            ? "border-amber-500 bg-amber-50/60 text-slate-900 font-bold shadow-sm"
                            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <CreditCard className="w-5 h-5 mx-auto mb-1 text-amber-600" />
                        <span className="text-xs">Debit/Credit Card</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("netbanking")}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          paymentMethod === "netbanking"
                            ? "border-amber-500 bg-amber-50/60 text-slate-900 font-bold shadow-sm"
                            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <Building className="w-5 h-5 mx-auto mb-1 text-amber-600" />
                        <span className="text-xs">Net Banking</span>
                      </button>
                    </div>

                    {paymentMethod === "upi" && (
                      <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-700">Scan QR Code or Enter UPI ID:</span>
                          <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                            Instant Verification
                          </span>
                        </div>
                        <input
                          type="text"
                          placeholder="yourname@okhdfcbank / yourname@paytm"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm bg-white"
                        />
                        <div className="flex items-center gap-2 text-[11px] text-slate-500">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Supports Google Pay, PhonePe, Paytm, BHIM, and all UPI apps.
                        </div>
                      </div>
                    )}

                    {paymentMethod === "card" && (
                      <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 space-y-3">
                        <input
                          type="text"
                          placeholder="Card Number (XXXX XXXX XXXX XXXX)"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm bg-white"
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="MM / YY"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm bg-white"
                          />
                          <input
                            type="password"
                            maxLength={4}
                            placeholder="CVV"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm bg-white"
                          />
                        </div>
                      </div>
                    )}

                    {paymentMethod === "netbanking" && (
                      <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 space-y-3">
                        <select className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm bg-white">
                          <option>State Bank of India (SBI)</option>
                          <option>HDFC Bank</option>
                          <option>ICICI Bank</option>
                          <option>Axis Bank</option>
                          <option>Federal Bank</option>
                          <option>Canara Bank</option>
                        </select>
                      </div>
                    )}
                  </div>

                  {/* Mandatory Academic Rules Confirmation */}
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2">
                    <div className="font-bold flex items-center gap-1.5 text-amber-950">
                      <Camera className="w-4 h-4 text-amber-700" />
                      Classroom Monitoring & Attendance Policy Agreement:
                    </div>
                    <ul className="list-disc pl-4 space-y-1 text-slate-700 text-[11.5px]">
                      <li>
                        Classes are conducted <strong>live on this website</strong> (3 hours daily: 2h lecture + 1h doubt clearance, 5 days a week).
                      </li>
                      <li>
                        <strong>Strict Monitoring:</strong> Both trainers and students are monitored via webcams during class hours for academic discipline.
                      </li>
                      <li>
                        <strong>7-Day Recording Access:</strong> Classes are recorded and accessible on your dashboard for 7 days, after which they are downloaded and archived into the company 2-year server vault.
                      </li>
                      <li>
                        <strong>Mandatory Weekend Project:</strong> Every weekend, students must submit a written report or speech presentation on topics learned.
                      </li>
                    </ul>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isProcessing}
                    className="w-full font-bold shadow-md text-base py-3.5"
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                  >
                    Pay Fee & Check In to Batch
                  </Button>
                </form>
              </Card>
            </div>

            {/* Right: Fee Breakdown & Course Summary (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              <Card padding="lg" variant="default" className="border-2 border-aviation-border shadow-sm">
                <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-aviation-yellowDeep bg-aviation-yellow/15 px-2.5 py-1 rounded">
                  Flagship Program
                </span>
                <h3 className="text-xl font-bold text-slate-900 font-heading mt-2">
                  {courseDetails.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Comprehensive 6-Month Skill Training with practical SAP ERP modules, interactive English soft-skills training, and viva examination.
                </p>

                {/* Price Breakdown */}
                <div className="my-6 p-4 rounded-xl bg-slate-900 text-white space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span>Other Private Academies:</span>
                    <span className="line-through text-slate-400 font-mono">₹1,25,000 + GST</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold">
                    <span>ID Integrated Subsidy (Cost Price):</span>
                    <span>- ₹1,00,000 (Saved ~80%)</span>
                  </div>
                  <div className="pt-3 border-t border-slate-700 flex items-baseline justify-between">
                    <div>
                      <div className="text-xs text-slate-400 font-medium">Net Fee (All Inclusive):</div>
                      <div className="text-2xl font-black text-aviation-yellow">₹25,000</div>
                    </div>
                    <Badge variant="yellow" size="sm">
                      Tax Included
                    </Badge>
                  </div>
                </div>

                {/* Cohort Structure */}
                <div className="space-y-3 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-aviation-yellowDeep shrink-0" />
                    <span>
                      <strong>Batch Size:</strong> Strict 50 Students limit per cohort
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-aviation-yellowDeep shrink-0" />
                    <span>
                      <strong>Faculty:</strong> 1 Master Mentor + 2 Specialized Trainers
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-aviation-yellowDeep shrink-0" />
                    <span>
                      <strong>Duration:</strong> 3 Hours / Day (2h Live + 1h Doubts), 5 Days / Wk
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4 text-aviation-yellowDeep shrink-0" />
                    <span>
                      <strong>Recording Vault:</strong> 7-day student replay + 2-year secure server archive
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200">
                  <div className="text-[11px] text-slate-500 text-center">
                    Project Coordinator: <strong>Justin Burnard Dias</strong> (16 Years Logistics & Aviation)
                    <br />
                    Ignited Dreams Integrated • 7012002405
                  </div>
                </div>
              </Card>
            </div>
          </div>
        ) : (
          /* Payment Confirmed & Check-in Pass Card */
          <div className="max-w-2xl mx-auto space-y-6">
            <Card padding="lg" variant="default" className="border-2 border-emerald-500 shadow-xl bg-white">
              <div className="text-center pb-6 border-b border-slate-200">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <Badge variant="yellow" size="sm" className="mb-2">
                  Official Admission Card
                </Badge>
                <h2 className="text-2xl font-black text-slate-900 font-heading">
                  Admission ID: {admissionPass?.id}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Enrolled Candidate: <strong>{studentName}</strong> • {studentEmail} • {studentPhone}
                </p>
              </div>

              <div className="py-6 space-y-4 text-sm">
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-xs font-semibold text-slate-500">Program:</span>
                  <span className="font-bold text-slate-900 text-xs text-right">
                    Transportation & Logistics Management with SAP
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-xs font-semibold text-slate-500">Allotted Cohort:</span>
                  <span className="font-bold text-slate-900 text-xs text-right">
                    {admissionPass?.batch}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-xs font-semibold text-slate-500">Teaching Ratio:</span>
                  <span className="font-bold text-emerald-800 text-xs">
                    1 Mentor + 2 Trainers for 50 Students
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-xs font-semibold text-slate-500">Fee Paid:</span>
                  <span className="font-bold text-emerald-600 font-mono text-sm">
                    ₹25,000 (Tax Included • Receipt Generated)
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900">
                  <strong>Class Attendance Protocol:</strong> Your webcam will be enabled upon joining to satisfy live batch proctoring and verify your daily 3-hour session.
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
                <Link href="/classroom/live-transportation-sap-101" className="flex-1">
                  <Button variant="primary" size="lg" className="w-full font-bold shadow-md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Check In & Enter Live Classroom Now
                  </Button>
                </Link>
                <Link href="/student/dashboard" className="sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full">
                    Student Dashboard
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading portal...</div>}>
      <CheckoutContent />
    </React.Suspense>
  );
}
