"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/reactbits/Navbar";
import { Header } from "@/components/Header";
import { ResumeUploader } from "@/components/ResumeUploader";
import { JobDescriptionInput } from "@/components/JobDescriptionInput";
import { AnalysisResults } from "@/components/AnalysisResults";
import type { AnalysisResult, AnalysisStatus } from "@/types/analysis";
import { Loader2, AlertCircle } from "lucide-react";

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

    if (!resumeText.trim() && !resumeFile) {
      setErrorMessage("Please upload a resume or paste your text.");
      return;
    }

    if (!jobDescription.trim()) {
      setErrorMessage("Please enter a job description.");
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
        throw new Error(data.error || "Analysis failed.");
      }

      setResult(data);
      setStatus("done");

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    } catch (err) {
      console.error(err);
      setErrorMessage(err instanceof Error ? err.message : "Error analyzing match.");
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
    <div className="min-h-screen bg-[#120f17] text-white flex flex-col justify-between selection:bg-[#a855f7]/40 selection:text-white relative">
      {/* Subtle top glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-gradient-to-b from-[#a855f7]/10 to-transparent pointer-events-none blur-3xl" />

      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pb-12 w-full relative z-10 flex-1">
        <Header />

        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ResumeUploader onResumeChange={handleResumeChange} isLoading={isBusy} />
            <JobDescriptionInput
              value={jobDescription}
              onChange={setJobDescription}
              onSampleJobSelect={handleSampleJobSelect}
              isLoading={isBusy}
            />
          </div>

          {/* Error */}
          <AnimatePresence>
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 p-3 rounded-xl border border-rose-500/30 bg-rose-950/30 text-rose-300 text-xs font-medium"
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{errorMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Minimalist Action Button */}
          <div className="flex justify-center pt-2">
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={isBusy}
              className={`px-8 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                isBusy
                  ? "bg-[#1b1722] text-zinc-500 border border-[#2f293a] cursor-not-allowed"
                  : "bg-[#a855f7] hover:bg-[#9333ea] text-white shadow-lg shadow-[#a855f7]/25 cursor-pointer"
              }`}
            >
              {isBusy ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Analyzing...
                </span>
              ) : (
                "Scan Resume"
              )}
            </button>
          </div>
        </div>

        {/* Results */}
        <div ref={resultsRef} className="pt-8">
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <AnalysisResults result={result} onReset={handleReset} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-[#2f293a] py-6 px-4 text-center text-xs text-[#b497cf]">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span>CareerFit • SWARA Edition</span>
          <span>Next.js 16 + Gemini</span>
        </div>
      </footer>
    </div>
  );
}
