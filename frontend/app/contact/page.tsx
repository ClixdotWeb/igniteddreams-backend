"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    courseOfInterest: "cpl-ground-school",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <section className="py-16 bg-aviation-offWhite border-b border-aviation-border">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Badge variant="yellow" size="sm" className="mb-3">
              Academy Operations
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-aviation-black tracking-tight font-heading">
              Contact Academy
            </h1>
            <p className="text-base text-aviation-muted mt-3">
              Have questions regarding course schedules, live classroom technical requirements, or batch enrollment? Reach our operations desk.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white flex-1">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-2xl font-bold text-aviation-black font-heading">
                Operational Inquiries
              </h2>
              <p className="text-sm text-aviation-muted leading-relaxed">
                Our flight operations and student coordinators are available Monday through Saturday to assist with admissions and classroom access.
              </p>

              <div className="space-y-4 pt-4">
                <Card padding="md" variant="default" className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-aviation-offWhite text-aviation-black flex items-center justify-center shrink-0 border border-aviation-border">
                    <Mail className="w-5 h-5 text-aviation-yellowDeep" />
                  </div>
                  <div>
                    <div className="text-xs text-aviation-muted uppercase font-bold tracking-wider">
                      Academy Email
                    </div>
                    <div className="text-sm font-bold text-aviation-black">
                      admissions@igniteddreams.com
                    </div>
                  </div>
                </Card>

                <Card padding="md" variant="default" className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-aviation-offWhite text-aviation-black flex items-center justify-center shrink-0 border border-aviation-border">
                    <Phone className="w-5 h-5 text-aviation-yellowDeep" />
                  </div>
                  <div>
                    <div className="text-xs text-aviation-muted uppercase font-bold tracking-wider">
                      Flight Desk Phone
                    </div>
                    <div className="text-sm font-bold text-aviation-black">
                      +91 98765 43210
                    </div>
                  </div>
                </Card>

                <Card padding="md" variant="default" className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-aviation-offWhite text-aviation-black flex items-center justify-center shrink-0 border border-aviation-border">
                    <MapPin className="w-5 h-5 text-aviation-yellowDeep" />
                  </div>
                  <div>
                    <div className="text-xs text-aviation-muted uppercase font-bold tracking-wider">
                      Aviation Headquarters
                    </div>
                    <div className="text-sm font-bold text-aviation-black">
                      Aero Tech Hub, New Delhi, India
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="lg:col-span-7">
              <Card padding="lg" variant="default" className="border-2 border-aviation-border">
                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-aviation-black font-heading">
                      Inquiry Received
                    </h3>
                    <p className="text-sm text-aviation-muted max-w-md mx-auto">
                      Thank you for contacting IgnitedDreams. An academy coordinator will review your message and reply via email shortly.
                    </p>
                    <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                      Send Another Inquiry
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h3 className="text-xl font-bold text-aviation-black font-heading mb-4">
                      Submit an Inquiry
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-aviation-charcoal uppercase tracking-wider mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Capt. / Cadet Firstname Lastname"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-aviation-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-aviation-yellow focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-aviation-charcoal uppercase tracking-wider mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="cadet@example.com"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-aviation-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-aviation-yellow focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-aviation-charcoal uppercase tracking-wider mb-1.5">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 90000 00000"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-aviation-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-aviation-yellow focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-aviation-charcoal uppercase tracking-wider mb-1.5">
                          Course of Interest
                        </label>
                        <select
                          value={formData.courseOfInterest}
                          onChange={(e) => setFormData({ ...formData, courseOfInterest: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-aviation-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-aviation-yellow focus:border-transparent transition-all"
                        >
                          <option value="cpl-ground-school">Commercial Pilot Ground School (CPL)</option>
                          <option value="ppl-ground-school">Private Pilot License Theory (PPL)</option>
                          <option value="aviation-meteorology">Aviation Meteorology & Radar</option>
                          <option value="rtr-aero-prep">Radio Telephony Restricted (RTR-A)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-aviation-charcoal uppercase tracking-wider mb-1.5">
                        Message / Query *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Detail your question or batch timing preference..."
                        className="w-full px-3.5 py-2.5 rounded-lg border border-aviation-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-aviation-yellow focus:border-transparent transition-all"
                      />
                    </div>

                    <Button type="submit" variant="primary" size="lg" className="w-full" rightIcon={<Send className="w-4 h-4" />}>
                      Send Operational Inquiry
                    </Button>
                  </form>
                )}
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
