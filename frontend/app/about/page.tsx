import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { Compass, Video, Clock, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <section className="py-16 bg-aviation-offWhite border-b border-aviation-border">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Badge variant="yellow" size="sm" className="mb-3">
              About IgnitedDreams
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-aviation-black tracking-tight font-heading">
              Aviation Ground Instruction
            </h1>
            <p className="text-base text-aviation-muted mt-3">
              Founded to make professional aviation ground theory rigorous, interactive, and universally accessible through modern real-time virtual classroom technology.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white flex-1">
        <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-aviation-black font-heading">
                Our Educational Methodology
              </h2>
              <p className="text-sm text-aviation-muted leading-relaxed">
                Aviation theory requires precision. Navigation plotting, weather radar interpretation, and aerodynamics cannot be taught through passive pre-recorded video clips.
              </p>
              <p className="text-sm text-aviation-muted leading-relaxed">
                We believe in live, real-time instruction where students solve wind correction problems, calculate density altitude, and read terminal forecasts alongside active flight instructors in an interactive digital cockpit environment.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card padding="md" variant="accent">
                <div className="text-3xl font-extrabold text-aviation-black font-heading mb-1">
                  7-Day
                </div>
                <div className="text-xs text-aviation-muted font-medium">
                  Class Replay Policy
                </div>
              </Card>
              <Card padding="md" variant="default">
                <div className="text-3xl font-extrabold text-aviation-black font-heading mb-1">
                  Live
                </div>
                <div className="text-xs text-aviation-muted font-medium">
                  Two-Way WebRTC Audio & Video
                </div>
              </Card>
              <Card padding="md" variant="default">
                <div className="text-3xl font-extrabold text-aviation-black font-heading mb-1">
                  HD
                </div>
                <div className="text-xs text-aviation-muted font-medium">
                  Direct Session Downloads
                </div>
              </Card>
              <Card padding="md" variant="accent">
                <div className="text-3xl font-extrabold text-aviation-black font-heading mb-1">
                  Secure
                </div>
                <div className="text-xs text-aviation-muted font-medium">
                  Private Cloud Storage
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
