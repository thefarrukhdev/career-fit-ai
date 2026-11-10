import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CareerFit AI - ATS Resume Scanner & Job Fit Matcher",
  description:
    "AI-powered ATS resume scanner that analyzes your resume against job descriptions. Get instant match scores, skill gap analysis, and actionable recommendations.",
  keywords: [
    "ATS scanner",
    "resume analyzer",
    "job fit matcher",
    "AI resume",
    "career tools",
  ],
  openGraph: {
    title: "CareerFit AI - ATS Resume Scanner",
    description:
      "Analyze your resume against job descriptions with AI. Get match scores, skill gaps, and recommendations.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ backgroundColor: "#0a0a0a", color: "#ffffff", minHeight: "100vh" }}
      >
        {children}
      </body>
    </html>
  );
}
