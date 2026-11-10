"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { ResumeUploader } from "@/components/ResumeUploader";
import { JobDescriptionInput } from "@/components/JobDescriptionInput";
import { AnalysisResults } from "@/components/AnalysisResults";
import { GridBackground } from "@/components/reactbits/GridBackground";
import type { AnalysisResult, AnalysisStatus } from "@/types/analysis";
import { Zap, AlertCircle, Loader2, Code2, ArrowUpRight } from "lucide-react";

export default function Home() {
  const [resumeText, setResumeText] = useState("");
  const [resumeFile, setResumeFile] = useState<File | undefined>(undefined);
  const [jobDescription, setJobDescription] = useState("");
  const [status, setStatus] = useState<AnalysisStatus>("idle");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const resultsRef = useRef<HTMLDivElement>(null);

  const handleResumeChange = (text: string, file?: File) => {
    setResumeText(text);
    setResumeFile(file);
    setErrorMessage(null);
  };

  const handleSampleJobSelect = (description: string) => {
    setJobDescription(description);
    setErrorMessage(null);
  };

  const handleAnalyze = async () => {
    setErrorMessage(null);

    // Validation
    if (!resumeText.trim() && !resumeFile) {
      setErrorMessage("Please upload your resume (PDF/TXT) or paste your resume text.");
      return;
    }

    if (!jobDescription.trim()) {
      setErrorMessage("Please enter a target job description or pick one of the sample jobs.");
      return;
    }

    try {
      setStatus("parsing");

      const formData = new FormData();
      formData.append("jobDescription", jobDescription);

      if (resumeFile) {
        formData.append("resume", resumeFile);
      } else {
        const textBlob = new Blob([resumeText], { type: "text/plain" });
        formData.append("resume", textBlob, "resume.txt");
      }

      setStatus("analyzing");

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json() as AnalysisResult & { error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze resume match.");
      }

      setResult(data);
      setStatus("done");

      // Smooth scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    } catch (err) {
      console.error("Analysis request error:", err);
      setErrorMessage(
        err instanceof Error ? err.message : "An unexpected network or parsing error occurred."
      );
      setStatus("error");
    }
  };

  const handleReset = () => {
    setResult(null);
    setStatus("idle");
    setErrorMessage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isBusy = status === "parsing" || status === "analyzing";

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col justify-between selection:bg-emerald-500/20 selection:text-white relative">
      {/* React Bits Ambient Background */}
      <GridBackground />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 md:py-10 w-full relative z-10 flex-1">
        {/* Header Section */}
        <Header />

        {/* Input Controls */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResumeUploader onResumeChange={handleResumeChange} isLoading={isBusy} />
            <JobDescriptionInput
              value={jobDescription}
              onChange={setJobDescription}
              onSampleJobSelect={handleSampleJobSelect}
              isLoading={isBusy}
            />
          </div>

          {/* Validation / Error Box */}
          <AnimatePresence>
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-3 p-4 rounded-xl border border-rose-500/30 bg-rose-950/30 text-rose-300 text-sm font-medium shadow-md"
              >
                <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
                <span>{errorMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Run Analysis CTA with React Bits Shimmer & Glowing Aura Button */}
          <div className="flex flex-col items-center pt-2">
            <div className="relative group">
              {/* Outer pulsing ambient neon aura */}
              {!isBusy && (
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 opacity-60 blur-lg group-hover:opacity-90 group-hover:blur-xl transition duration-500 group-hover:duration-200 animate-pulse pointer-events-none" />
              )}

              <motion.button
                type="button"
                onClick={handleAnalyze}
                disabled={isBusy}
                whileHover={{ scale: isBusy ? 1 : 1.02 }}
                whileTap={{ scale: isBusy ? 1 : 0.98 }}
                className={`relative overflow-hidden w-full sm:w-auto min-w-[320px] px-8 py-4 rounded-2xl font-bold text-sm tracking-wide flex items-center justify-center gap-2.5 shadow-2xl transition-all duration-300 ${
                  isBusy
                    ? "bg-zinc-800 text-zinc-400 border border-zinc-700 cursor-not-allowed"
                    : "bg-emerald-500 hover:bg-emerald-400 text-zinc-950 border border-emerald-300/60 shadow-[0_0_30px_rgba(16,185,129,0.35)] hover:shadow-[0_0_50px_rgba(16,185,129,0.6)] cursor-pointer"
                }`}
              >
                {/* Shimmer sweep effect */}
                {!isBusy && (
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-y-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/45 to-transparent"
                    animate={{
                      x: ["-150%", "250%"],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.4,
                      ease: "easeInOut",
                      repeatDelay: 0.8,
                    }}
                  />
                )}

                {isBusy ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-emerald-400" />
                    <span className="relative z-10 font-bold">
                      {status === "parsing" ? "Extracting Document Content..." : "Analyzing with Gemini ATS Engine..."}
                    </span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 fill-current relative z-10" />
                    <span className="relative z-10 font-extrabold tracking-wide">Run Deep ATS Match Analysis</span>
                  </>
                )}
              </motion.button>
            </div>
            <p className="text-[11px] text-zinc-500 mt-3 text-center">
              Deterministic schema-evaluated scoring • Secure client-to-server memory processing
            </p>
          </div>
        </div>

        {/* Results View */}
        <div ref={resultsRef} className="pt-8">
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="pt-6"
              >
                <AnalysisResults result={result} onReset={handleReset} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-zinc-900 bg-zinc-950/80 py-8 px-4 relative z-10 text-center text-xs text-zinc-500">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-300">CareerFit AI</span>
            <span className="text-zinc-700">•</span>
            <span>Proof of Work for SWARA Software Engineer</span>
          </div>

          <div className="flex items-center gap-4 text-zinc-400">
            <a
              href="https://github.com/thefarrukhdev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>@thefarrukhdev</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <span className="text-zinc-800">•</span>
            <span className="text-zinc-600">Built with Next.js 16 + React 19 + Gemini</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
