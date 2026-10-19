"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/lib/auth-context";
import {
  BookOpen,
  Download,
  Lock,
  Search,
  CheckCircle2,
  FileText,
  Bookmark,
  ShieldCheck,
  Eye,
  X,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

interface KindleBook {
  id: string;
  title: string;
  subtitle: string;
  category: "SAP ERP" | "Logistics" | "Aviation" | "English Viva";
  author: string;
  pages: number;
  fileSize: string;
  format: string;
  coverImage: string;
  isLocked: boolean;
  edition: string;
  summary: string;
  chapters: string[];
}

const KINDLE_EDITIONS: KindleBook[] = [
  {
    id: "kb-1",
    title: "SAP S/4HANA Logistics Execution & VL01N Handbook",
    subtitle: "Enterprise Structure, Outbound Delivery, Transfer Orders & PGI",
    category: "SAP ERP",
    author: "Justin Burnard Dias & ERP Specialists",
    pages: 284,
    fileSize: "14.2 MB",
    format: "Kindle PDF & ePub",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=85",
    isLocked: false,
    edition: "2026 Cadet Master Edition",
    summary:
      "The complete operational compendium for SAP logistics execution. Detailed step-by-step transaction simulations, material management flows, and real-time terminal exercises.",
    chapters: [
      "1. SAP S/4HANA Enterprise Logistics Hierarchy",
      "2. Creating & Routing Outbound Deliveries (VL01N)",
      "3. Warehouse Management (WM) Picking & Transfer Orders",
      "4. Post Goods Issue (PGI) & Inventory Financial Balancing",
      "5. Viva Board Examination Practice Questions",
    ],
  },
  {
    id: "kb-2",
    title: "Multimodal Freight Operations & Port CFS Master Guide",
    subtitle: "IncoTerms 2020, Bill of Lading, Customs ICEGATE & EXIM",
    category: "Logistics",
    author: "Justin Burnard Dias (16 Yrs Logistics Lead)",
    pages: 340,
    fileSize: "18.6 MB",
    format: "Kindle PDF & ePub",
    coverImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=85",
    isLocked: false,
    edition: "Official ID Academy Text",
    summary:
      "A comprehensive manual covering container logistics, port terminal flow, customs clearance on ICEGATE, shipping bills, and Indian freight forwarder operating systems.",
    chapters: [
      "1. Global Multimodal Transportation & IncoTerms 2020",
      "2. Container Freight Station (CFS) Inbound & Outbound Architecture",
      "3. Sea Waybills vs. Negotiable Bills of Lading",
      "4. Customs Clearance Filing on ICEGATE 2.0",
      "5. Third-Party Logistics (3PL) Fleet Routing Case Studies",
    ],
  },
  {
    id: "kb-3",
    title: "Aviation Ground Handling & Airport Ramp Operations",
    subtitle: "IATA Ramp Safety, Baggage Tracing, Marshalling & DGR Rules",
    category: "Aviation",
    author: "Justin Burnard Dias",
    pages: 220,
    fileSize: "11.5 MB",
    format: "Kindle PDF & ePub",
    coverImage: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=85",
    isLocked: false,
    edition: "First Flight Release",
    summary:
      "Airport operations and ramp handling standard operating procedures. Covers safety envelopes, air cargo palletization (ULDs), and turn-around management for commercial airliners.",
    chapters: [
      "1. Aircraft Ramp Layout, Safety Zones & Marshalling",
      "2. Unit Load Devices (ULD) Palletization & Weight Balancing",
      "3. Dangerous Goods Regulations (DGR) Category 6 Guidelines",
      "4. Terminal Passenger Services & WorldTracer Baggage Tracing",
      "5. Aircraft Turnaround Coordination Protocols",
    ],
  },
  {
    id: "kb-4",
    title: "Corporate English & Professional Viva Master Engine",
    subtitle: "Technical Logistics Terminology, Oral Viva Preparation & Soft Skills",
    category: "English Viva",
    author: "Premier Indian Training Partners & ID Team",
    pages: 180,
    fileSize: "9.8 MB",
    format: "Kindle PDF & ePub",
    coverImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=85",
    isLocked: false,
    edition: "Sourced Partner Module",
    summary:
      "Interactive English communication module sourced from premier Indian providers, training students for multinational logistics viva exams and corporate interviews.",
    chapters: [
      "1. Professional Logistics & Supply Chain Vocabulary",
      "2. Answering Technical ERP Questions in Oral Viva",
      "3. Simulated Customer Escalation Call Handling",
      "4. Weekend Project Speech Presentation Guidelines",
      "5. Final Board Interview Mock Scenarios",
    ],
  },
  {
    id: "kb-5",
    title: "Co-operative Production Units: FMCG & Chocolate Factory Blueprint",
    subtitle: "Micro-Factory Machinery, Recipes, FSSAI Legal Filings & Profit Models",
    category: "Logistics",
    author: "ID Integrated Project Cell",
    pages: 260,
    fileSize: "16.1 MB",
    format: "Kindle PDF & ePub",
    coverImage: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=85",
    isLocked: false,
    edition: "Pillar 2 Handbook",
    summary:
      "The definitive manual for setting up self-dependent youth production units. Covers cocoa procurement, toffee/candy machinery, FSSAI licensing, and collective selling networks.",
    chapters: [
      "1. Micro-Unit Machinery Selection & Factory Floor Plan",
      "2. Sourcing Raw Materials via Village Farming Societies",
      "3. Food Safety Standards (FSSAI) & Legal Clearances",
      "4. Packaging, Transportation & 10%-20% Profit Share Model",
      "5. Collective Marketing & Brand Scaling",
    ],
  },
];

export default function KindleLibraryPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState<KindleBook | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const categories = ["All", "SAP ERP", "Logistics", "Aviation", "English Viva"];

  const filteredBooks = KINDLE_EDITIONS.filter((book) => {
    const matchesCategory = activeTab === "All" || book.category === activeTab;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      book.title.toLowerCase().includes(query) ||
      book.subtitle.toLowerCase().includes(query) ||
      book.summary.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (book: KindleBook) => {
    setToastMessage(`Downloading official Kindle study package: "${book.title.slice(0, 32)}..." (${book.fileSize})`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] flex flex-col font-sans text-[#0A0A0A]">
      <Navbar />

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0e271d] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-white/10 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="w-6 h-6 rounded-full bg-[#F5C400] text-[#0e271d] flex items-center justify-center shrink-0 font-bold">
            ✓
          </div>
          <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-gray-400 hover:text-white p-1 rounded-md transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-[1360px] w-full mx-auto px-5 sm:px-8 lg:px-10 pt-8 sm:pt-12 pb-24">
        {/* Page Header */}
        <div className="mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFBEB] border border-[#FDE68A] text-[#92400E] text-[11px] font-bold uppercase tracking-wider mb-3.5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#F5C400] animate-pulse" />
            <span>KINDLE DIGITAL EDITIONS & STUDY MATERIALS</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#0e271d] font-heading tracking-tight leading-tight">
            Ignited Dreams Kindle Library
          </h1>

          <p className="text-sm sm:text-[15.5px] text-slate-600 max-w-2xl mt-2.5 leading-relaxed">
            Official digital course textbooks, real-world SAP S/4HANA case manuals, and viva oral interview guides. Protected access for verified enrolled cadets.
          </p>
        </div>

        {/* Cadet Access Status Banner */}
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-[#0e271d] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg border border-[#163a2b]">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#F5C400] text-[#0e271d] flex items-center justify-center shrink-0 shadow-sm font-black text-sm">
              ID
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#F5C400]">
                  Paid Cadet Privilege
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-semibold text-slate-300">
                  DRM Protected
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                All Kindle textbook editions are fully accessible online or downloadable for verified enrolled students.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/checkout?course=transportation-logistics-sap"
              className="px-4 py-2 rounded-full bg-[#F5C400] text-[#0e271d] font-bold text-xs hover:bg-amber-300 transition-colors shadow-sm"
            >
              Verify Enrollment / Access
            </Link>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <section className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
            {/* Search Box */}
            <div className="relative w-full sm:w-80 md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Kindle editions, SAP codes, authors..."
                className="w-full pl-10 pr-9 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-[#0e271d] placeholder-slate-400 focus:outline-none focus:border-[#F5C400] focus:ring-2 focus:ring-[#F5C400]/25 transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-0.5 rounded-full"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Results Count Badge */}
            <div className="inline-flex items-center gap-2 self-start sm:self-auto px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200/80 text-xs text-slate-600 font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#F5C400]" />
              <span>{filteredBooks.length} Kindle Editions Available</span>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-1">
            {categories.map((cat) => {
              const isActive = activeTab === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#F5C400] text-[#0e271d] font-bold shadow-xs scale-[1.02]"
                      : "bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-600 hover:text-[#0e271d]"
                  }`}
                >
                  {cat === "All" ? "All Handbooks" : cat}
                </button>
              );
            })}
          </div>
        </section>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 items-stretch">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="group bg-white rounded-2xl border border-slate-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(245,196,0,0.14)] hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col justify-between"
            >
              <div>
                {/* Book Header / Thumbnail preview */}
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-4 bg-slate-900 border border-slate-100">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Badges on Book Cover */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 rounded-full bg-[#F5C400] text-[#0e271d] text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                      {book.category}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 z-10">
                    <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-white text-[10px] font-bold font-mono">
                      {book.format}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 z-10 text-white">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-amber-300">
                      {book.edition}
                    </span>
                    <p className="text-xs text-slate-300 truncate">{book.author}</p>
                  </div>
                </div>

                {/* Title */}
                <h3
                  onClick={() => setSelectedBook(book)}
                  className="font-bold text-[#0e271d] text-base leading-snug line-clamp-2 min-h-[44px] cursor-pointer hover:text-amber-700 transition-colors"
                >
                  {book.title}
                </h3>

                {/* Subtitle */}
                <p className="text-xs text-slate-500 mt-1 line-clamp-1">{book.subtitle}</p>

                {/* Summary */}
                <p className="text-xs text-slate-600 mt-3 line-clamp-3 leading-relaxed">
                  {book.summary}
                </p>

                {/* Metadata Row */}
                <div className="flex items-center gap-4 text-[11px] font-medium text-slate-500 mt-4 pt-3 border-t border-slate-100">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#F5C400]" />
                    {book.pages} Pages
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#F5C400]" />
                    {book.fileSize}
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-600 font-semibold ml-auto">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    DRM Verified
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedBook(book)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0e271d] font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Read Chapters</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDownload(book)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#0e271d] hover:bg-[#F5C400] text-white hover:text-[#0e271d] font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Book Reader Modal */}
      {selectedBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-white text-[#0e271d] w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] border border-slate-200">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#0e271d] text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#F5C400] uppercase tracking-wider">
                  {selectedBook.category} • {selectedBook.edition}
                </span>
                <h2 className="text-base font-bold text-white truncate max-w-md">
                  {selectedBook.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedBook(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Course Material Synopsis
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {selectedBook.summary}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Table of Contents & Key Modules
                </h3>
                <div className="space-y-2">
                  {selectedBook.chapters.map((ch, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg border border-slate-100 bg-white hover:bg-amber-50/50 flex items-center justify-between text-xs text-slate-800 transition-colors"
                    >
                      <span className="font-semibold">{ch}</span>
                      <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                        Available
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/70 text-xs text-amber-900 leading-relaxed">
                <strong>Notice for Cadets:</strong> Kindle edition materials are proprietary to Ignited Dreams Integrated. Unauthorized redistribution or external re-hosting is prohibited. Protected for 2 years on cadet server accounts.
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Format: {selectedBook.format} ({selectedBook.fileSize})
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedBook(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleDownload(selectedBook);
                    setSelectedBook(null);
                  }}
                  className="px-5 py-2 rounded-xl bg-[#0e271d] hover:bg-[#F5C400] text-white hover:text-[#0e271d] font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Complete e-Book</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
