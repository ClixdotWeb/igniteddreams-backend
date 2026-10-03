import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "IgnitedDreams — Aviation Academy & Live Flight Ground School",
  description:
    "Conduct live interactive ground classes, replay securely stored class recordings for 7 days, and master commercial and private aviation theory with veteran airline captains.",
  keywords: [
    "aviation academy",
    "pilot ground school",
    "CPL theory",
    "PPL training",
    "live virtual flight classroom",
    "aviation recording LMS",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-white text-aviation-black antialiased flex flex-col font-sans selection:bg-aviation-yellow selection:text-aviation-black">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
