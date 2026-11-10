"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/reactbits/Navbar";
import { Header } from "@/components/Header";
import { ResumeUploader } from "@/components/ResumeUploader";
import { JobDescriptionInput } from "@/components/JobDescriptionInput";
import { AnalysisResults } from "@/components/AnalysisResults";
import type { AnalysisResult, AnalysisStatus } from "@/types/analysis";
import { Zap, AlertCircle, Loader2, Sparkles, ArrowUpRight } from "lucide-react";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

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
      setErrorMessage("Please enter a target job description or pick one of the benchmark jobs.");
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
    <div className="min-h-screen bg-[#120f17] text-white flex flex-col justify-between selection:bg-[#a855f7]/40 selection:text-white relative overflow-hidden">
      {/* React Bits Ambient Background Orbs */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[500px] bg-gradient-to-b from-[#a855f7]/15 via-[#7c3aed]/10 to-transparent pointer-events-none blur-[120px]" />
      <div className="fixed top-1/3 -left-32 w-96 h-96 bg-[#c084fc]/10 rounded-full pointer-events-none blur-[140px]" />
      <div className="fixed bottom-10 -right-32 w-96 h-96 bg-[#a855f7]/10 rounded-full pointer-events-none blur-[140px]" />

      {/* React Bits Sticky Navbar */}
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pb-12 w-full relative z-10 flex-1">
        {/* React Bits Hero Section */}
        <Header />

        {/* Input Workbench */}
        <div id="workbench" className="space-y-6 pt-2">
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
                className="flex items-center gap-3 p-4 rounded-xl border border-rose-500/40 bg-rose-950/40 text-rose-300 text-sm font-medium shadow-lg"
              >
                <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
                <span>{errorMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* React Bits Signature Run Analysis CTA */}
          <div className="flex flex-col items-center pt-3">
            <motion.button
              type="button"
              onClick={handleAnalyze}
              disabled={isBusy}
              whileHover={{ scale: isBusy ? 1 : 1.02 }}
              whileTap={{ scale: isBusy ? 1 : 0.98 }}
              className={`w-full sm:w-auto min-w-[320px] px-8 py-4 rounded-full font-bold text-sm tracking-wide flex items-center justify-center gap-3 transition-all ${
                isBusy
                  ? "bg-[#1b1722] text-[#b497cf] border border-[#2f293a] cursor-not-allowed"
                  : "bg-gradient-to-r from-[#a855f7] via-[#9333ea] to-[#7c3aed] text-white border border-[#c084fc]/50 shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_45px_rgba(168,85,247,0.7)] hover:brightness-110 cursor-pointer"
              }`}
            >
              {isBusy ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-[#d8b4fe]" />
                  <span>
                    {status === "parsing" ? "Extracting Document Content..." : "Evaluating via Gemini ATS Engine..."}
                  </span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 fill-white text-white" />
                  <span>Run Deep ATS Match Analysis</span>
                  <Sparkles className="w-4 h-4 text-[#d8b4fe]" />
                </>
              )}
            </motion.button>
            <p className="text-[11px] text-[#b497cf] mt-2.5 text-center">
              Deterministic Zod schema validation • Real-time memory processing • React Bits UI
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

      {/* React Bits Styled Footer */}
      <footer className="mt-20 border-t border-[#2f293a] bg-[#1b1722]/80 backdrop-blur-xl py-8 px-4 relative z-10 text-xs text-[#b497cf]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#a855f7] text-white font-mono font-bold text-[11px]">
              rb
            </div>
            <span className="font-bold text-white">ReactBits ATS</span>
            <span className="text-[#2f293a]">•</span>
            <span>Proof of Work for SWARA Software Engineer</span>
          </div>

          <div className="flex items-center gap-5 text-[#b497cf]">
            <a
              href="https://github.com/thefarrukhdev/career-fit-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <GithubIcon className="w-4 h-4 text-white" />
              <span>thefarrukhdev</span>
              <ArrowUpRight className="w-3 h-3 text-[#a855f7]" />
            </a>
            <span className="text-[#2f293a]">•</span>
            <span className="text-zinc-400">Next.js 16 • React 19 • Gemini 3.8</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
