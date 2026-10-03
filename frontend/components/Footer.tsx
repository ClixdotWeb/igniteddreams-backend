import React from "react";
import Link from "next/link";
import { Compass, ShieldCheck, Video, Clock, ArrowUpRight } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-aviation-black text-white border-t border-aviation-charcoal">
      {/* Decorative runway line */}
      <div className="w-full h-1 bg-gradient-to-r from-transparent via-aviation-yellow to-transparent opacity-80" />

      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Col 1: Academy Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-aviation-charcoal flex items-center justify-center text-aviation-yellow border border-white/10">
                <Compass className="w-5 h-5 text-aviation-yellow" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white font-heading">
                IGNITED<span className="text-aviation-yellow">DREAMS</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Structured ground school aviation training with live interactive virtual classrooms and 7-day automated recording replay for future airline captains and aviators.
            </p>
            <div className="flex items-center gap-6 pt-2 text-xs text-gray-400">
              <div className="flex items-center gap-1.5">
                <Video className="w-4 h-4 text-aviation-yellow" />
                <span>Live Interactive Sessions</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-aviation-yellow" />
                <span>7-Day Recording Access</span>
              </div>
            </div>
          </div>

          {/* Col 2: Courses */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-aviation-yellow font-heading">
              Aviation Ground Courses
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <Link href="/courses/cpl-ground-school" className="hover:text-white transition-colors">
                  Commercial Pilot Theory
                </Link>
              </li>
              <li>
                <Link href="/courses/ppl-ground-school" className="hover:text-white transition-colors">
                  Private Pilot Ground School
                </Link>
              </li>
              <li>
                <Link href="/courses/aviation-meteorology" className="hover:text-white transition-colors">
                  Aviation Meteorology
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-white transition-colors flex items-center gap-1 text-aviation-yellow font-medium">
                  View All Ground Courses <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Student Portals */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-aviation-yellow font-heading">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <Link href="/student/dashboard" className="hover:text-white transition-colors">
                  Student Dashboard
                </Link>
              </li>
              <li>
                <Link href="/student/recordings" className="hover:text-white transition-colors">
                  Recordings Library
                </Link>
              </li>
              <li>
                <Link href="/instructor/dashboard" className="hover:text-white transition-colors">
                  Instructor Portal
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors">
                  Academy Administration
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Support & Policies */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-aviation-yellow font-heading">
              Policies & Support
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Academy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Academy Contact
                </Link>
              </li>
              <li>
                <span className="text-xs text-gray-500 block">
                  Recordings Policy: Available for 7 days post-session, after which playback and download are automatically decommissioned.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-aviation-charcoal flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} IgnitedDreams Aviation Academy. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-gray-400">
              <ShieldCheck className="w-4 h-4 text-aviation-yellow" />
              Secure RBAC & Short-Lived Media Signing
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
