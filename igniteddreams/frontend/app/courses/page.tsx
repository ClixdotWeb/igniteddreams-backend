"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomSelect from "@/components/ui/Select";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
import {
  Search,
  Star,
  Clock,
  BookOpen,
  Bookmark,
  ArrowUpRight,
  Filter,
  Check,
  ChevronDown,
  GraduationCap,
} from "lucide-react";

interface Course {
  id: number;
  title: string;
  category: string;
  level: string;
  code: string;
  slug: string;
  rating: number;
  reviews: number;
  duration: string;
  lessons: string;
  description: string;
  image: string;
  instructor: {
    name: string;
    role: string;
    avatar: string;
  };
}

const COURSES_DATA: Course[] = [
  {
    id: 1,
    title: "Transportation & Logistics Management Course with SAP (ERP)",
    category: "Transportation & Logistics",
    level: "Flagship (6 Months)",
    code: "ID-TLM-SAP-101",
    slug: "transportation-logistics-sap",
    rating: 4.95,
    reviews: 580,
    duration: "6 Months (3h / Day)",
    lessons: "1 Mentor + 2 Trainers / 50",
    description:
      "Comprehensive 6-month industry skill training covering multimodal freight, container logistics, port terminal flow, customs clearance, and practical SAP S/4HANA Logistics Execution (VL01N, PGI, transfer orders). Includes English soft skills and viva preparation at only ₹25,000 (tax included).",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=85",
    instructor: {
      name: "Justin Burnard Dias",
      role: "Project Coordinator & Lead Faculty (16 Yrs Exp)",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
  },
  {
    id: 2,
    title: "Aviation Management & Airport Ground Operations",
    category: "Aviation Management",
    level: "Operational (6 Months)",
    code: "ID-AVM-201",
    slug: "aviation-management-airport-operations",
    rating: 4.9,
    reviews: 410,
    duration: "6 Months (3h / Day)",
    lessons: "1 Mentor + 2 Trainers / 50",
    description:
      "Practical airport management training covering ground handling, passenger terminal services, air cargo operations, ramp safety, baggage sorting, and airline ticketing. Career-oriented training for graduates at ₹25,000 all-inclusive.",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=85",
    instructor: {
      name: "Justin Burnard Dias",
      role: "16 Years Logistics & Aviation Specialist",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
  },
  {
    id: 3,
    title: "Global Supply Chain & Freight Forwarding with ERP",
    category: "Transportation & Logistics",
    level: "Comprehensive",
    code: "ID-SCM-301",
    slug: "supply-chain-freight-forwarding",
    rating: 4.88,
    reviews: 320,
    duration: "6 Months (3h / Day)",
    lessons: "1 Mentor + 2 Trainers / 50",
    description:
      "Master international freight forwarding, shipping lines coordination, customs ICEGATE portal compliance, Letter of Credit (LC), and automated warehouse inventory control systems.",
    image:
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=85",
    instructor: {
      name: "Justin Burnard Dias & Trainers",
      role: "Lead Mentor & Specialized Trainers",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
  },
  {
    id: 4,
    title: "Air Cargo Operations, ULD Handling & Dangerous Goods (DGR)",
    category: "Aviation Management",
    level: "Specialized",
    code: "ID-CARGO-401",
    slug: "air-cargo-logistics-dgr",
    rating: 4.92,
    reviews: 245,
    duration: "6 Months (3h / Day)",
    lessons: "1 Mentor + 2 Trainers / 50",
    description:
      "Focused practical training on air cargo airway bill (AWB) generation, Unit Load Device (ULD) aircraft palletization, cold-chain handling, and IATA Dangerous Goods Regulations compliance.",
    image:
      "https://images.unsplash.com/photo-1519074069444-1ba4ea16e879?auto=format&fit=crop&w=1200&q=85",
    instructor: {
      name: "Justin Burnard Dias",
      role: "Aviation Operations Specialist",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
  },
  {
    id: 5,
    title: "FMCG Micro-Manufacturing & Supply Chain Distribution",
    category: "Integrated Projects",
    level: "Entrepreneurship",
    code: "ID-FMCG-501",
    slug: "fmcg-production-supply-chain",
    rating: 4.89,
    reviews: 195,
    duration: "6 Months (3h / Day)",
    lessons: "1 Mentor + 2 Trainers / 50",
    description:
      "Learn to establish and operate self-dependent micro-manufacturing units (toffees, chocolates, FMCG packaged foods), legal FSSAI/GST clearance, and manage distribution via our Co-operative logistics network.",
    image:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=85",
    instructor: {
      name: "Justin Burnard Dias",
      role: "Project Coordinator • ID Integrated",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
  },
  {
    id: 6,
    title: "Executive Business Operations & Corporate Administration",
    category: "Business & Management",
    level: "Corporate Ready",
    code: "ID-BOM-601",
    slug: "business-operations-management",
    rating: 4.85,
    reviews: 280,
    duration: "6 Months (3h / Day)",
    lessons: "1 Mentor + 2 Trainers / 50",
    description:
      "Comprehensive training for corporate readiness covering enterprise ERP workflows, procurement administration, business communication, and multinational client service protocols.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85",
    instructor: {
      name: "Justin Burnard Dias & Faculty",
      role: "Corporate Strategy Team",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
  },
];

const CATEGORIES = [
  "All",
  "Chartered Accountancy",
  "Taxation & Compliance",
  "Corporate Finance",
  "Global Qualifications",
  "Cost Accounting",
  "Audit & Assurance",
];

const LEVELS = ["All Levels", "Beginner", "Intermediate", "Advanced"];

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [sortBy, setSortBy] = useState("curated");
  const [savedCourses, setSavedCourses] = useState<number[]>([]);

  const toggleBookmark = (id: number) => {
    setSavedCourses((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredCourses = useMemo(() => {
    return COURSES_DATA.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || course.category === selectedCategory;

      const matchesLevel =
        selectedLevel === "All Levels" || course.level === selectedLevel;

      return matchesSearch && matchesCategory && matchesLevel;
    }).sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "duration") return parseInt(b.duration) - parseInt(a.duration);
      if (sortBy === "popular") return b.reviews - a.reviews;
      return a.id - b.id;
    });
  }, [searchQuery, selectedCategory, selectedLevel, sortBy]);

  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.14, ease: "power2.out" }
        );
      }
      if (filterRef.current) {
        gsap.fromTo(
          filterRef.current,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.15 }
        );
      }
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 35, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [filteredCourses]);

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col bg-[#FAFAF8]">
      <Navbar />

      <main className="flex-1 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 py-12 lg:py-16 w-full">
        {/* Page Header */}
        <div ref={headerRef} className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-aviation-yellow/15 border border-aviation-yellow/40 text-xs font-bold uppercase tracking-wider text-[#9E7300] mb-3">
            <GraduationCap className="w-4 h-4 text-aviation-yellow" />
            <span>Integrated Skill Education & Skill Training</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#0A0A0A] font-heading tracking-tight leading-[1.24] sm:leading-[1.2] mb-4">
            Integrated Training Programs
          </h1>
          <p className="text-base sm:text-lg text-[#687080] leading-relaxed">
            Dual-track curricula merging deep academic skill education (CA, CMA, ACCA) with real-world corporate skill training (live GST filing, financial modeling, and statutory audit labs) with 7-day revision recording access.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div ref={filterRef} className="space-y-5 mb-10">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by course topic, faculty, or skill..."
                className="w-full pl-11 pr-4 py-3 bg-white border border-[#E7E7E7] rounded-xl text-sm text-[#0A0A0A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFC400] focus:border-transparent transition-all shadow-sm"
              />
            </div>

            <div className="relative min-w-[160px]">
              <CustomSelect
                options={LEVELS.map((level) => ({ value: level, label: level }))}
                value={selectedLevel}
                onChange={setSelectedLevel}
                buttonClassName="py-3 px-4 rounded-xl border-[#E7E7E7]"
              />
            </div>

            <div className="relative min-w-[170px]">
              <CustomSelect
                options={[
                  { value: "curated", label: "Curated Order" },
                  { value: "rating", label: "Highest Rated" },
                  { value: "popular", label: "Most Popular" },
                  { value: "duration", label: "Longest Duration" },
                ]}
                value={sortBy}
                onChange={setSortBy}
                buttonClassName="py-3 px-4 rounded-xl border-[#E7E7E7]"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? "bg-[#FFC400] text-[#0A0A0A] shadow-sm font-bold scale-[1.02]"
                      : "bg-white border border-[#E7E7E7] text-[#0A0A0A] hover:bg-gray-50 hover:border-gray-300"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Courses Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-[#E7E7E7] overflow-hidden hover:border-[#FFC400] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md text-white text-[11px] font-mono font-semibold">
                    {course.code}
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-[#FFC400] text-[#0A0A0A] text-[11px] font-bold">
                    {course.level}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <span className="font-semibold text-[#A17C00] uppercase tracking-wider">
                      {course.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-[#FFC400] text-[#FFC400]" />
                      <span className="font-bold text-[#0A0A0A]">{course.rating}</span>
                      <span>({course.reviews})</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-[#0A0A0A] font-heading mb-2 group-hover:text-[#A17C00] transition-colors leading-snug">
                    {course.title}
                  </h3>

                  <p className="text-xs text-[#555E6D] leading-relaxed mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-gray-500 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#FFC400]" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-[#FFC400]" />
                      <span>{course.lessons}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={course.instructor.avatar}
                      alt={course.instructor.name}
                      className="w-8 h-8 rounded-full object-cover border border-gray-200"
                    />
                    <div>
                      <div className="text-xs font-semibold text-[#0A0A0A]">
                        {course.instructor.name}
                      </div>
                      <div className="text-[10px] text-gray-500">
                        {course.instructor.role}
                      </div>
                    </div>
                  </div>

                  <Link href={`/courses/${course.slug}`}>
                    <button className="p-2 rounded-xl bg-gray-100 hover:bg-[#FFC400] text-gray-700 hover:text-black transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
