"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Menu, X, ArrowRight, User as UserIcon } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import Button from "./ui/Button";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  const navLinks = [
    { name: "Courses", href: "/courses" },
    { name: "Live Class", href: "/#live-learning" },
    { name: "7-Day Recordings", href: "/#recordings" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const getDashboardLink = () => {
    if (!user) return "/login";
    if (user.role === "ADMIN") return "/admin";
    if (user.role === "INSTRUCTOR") return "/instructor/dashboard";
    return "/student/dashboard";
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-aviation-border">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Emblem */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-aviation-black flex items-center justify-center text-aviation-yellow group-hover:scale-105 transition-transform duration-200 shadow-sm border border-aviation-charcoal">
            <Compass className="w-5 h-5 text-aviation-yellow" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-aviation-black font-heading">
                IGNITED<span className="text-aviation-yellowDeep">DREAMS</span>
              </span>
            </div>
            <p className="text-[10px] tracking-widest uppercase font-semibold text-aviation-muted -mt-1">
              Aviation Academy
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-semibold transition-colors duration-150 hover:text-aviation-black ${
                pathname === link.href ? "text-aviation-black font-bold" : "text-aviation-muted"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <Link href={getDashboardLink()}>
              <Button
                variant="dark"
                size="sm"
                leftIcon={<UserIcon className="w-4 h-4 text-aviation-yellow" />}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {user.role === "ADMIN" ? "Admin Portal" : user.role === "INSTRUCTOR" ? "Instructor Portal" : "Student LMS"}
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Student Login
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Enroll Now
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-aviation-black hover:bg-aviation-lightGray transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-aviation-border bg-white px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-semibold py-2 text-aviation-charcoal hover:text-aviation-black"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="pt-4 border-t border-aviation-border flex flex-col gap-3">
            {user ? (
              <Link href={getDashboardLink()} onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="dark" className="w-full">
                  Go to {user.role === "ADMIN" ? "Admin Portal" : "Dashboard"}
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Student Login
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full">
                    Enroll Now
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
