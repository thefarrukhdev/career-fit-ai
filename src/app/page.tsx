"use client";

import { useState, useRef } from "react";
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
      setErrorMessage("Please upload a resume or paste text.");
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
      }, 100);
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
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col justify-between selection:bg-zinc-800">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pb-16 w-full flex-1">
        <Header />

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            <ResumeUploader onResumeChange={handleResumeChange} isLoading={isBusy} />
            <JobDescriptionInput
              value={jobDescription}
              onChange={setJobDescription}
              onSampleJobSelect={handleSampleJobSelect}
              isLoading={isBusy}
            />
          </div>

          {/* Error */}
          {errorMessage && (
            <div className="flex items-center gap-2 p-3 rounded-lg border border-rose-900/40 bg-rose-950/20 text-rose-300 text-xs">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Simple Clean Button */}
          <div className="flex justify-center pt-2">
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={isBusy}
              className={`px-6 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                isBusy
                  ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                  : "bg-white hover:bg-zinc-200 text-black cursor-pointer shadow-sm"
              }`}
            >
              {isBusy ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-black" />
                  Analyzing...
                </span>
              ) : (
                "Scan Match"
              )}
            </button>
          </div>
        </div>

        {/* Results */}
        <div ref={resultsRef} className="pt-8">
          {result && (
            <div className="pt-4">
              <AnalysisResults result={result} onReset={handleReset} />
            </div>
          )}
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-zinc-900 py-5 px-6 text-xs text-zinc-500">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span>CareerFit • SWARA Edition</span>
          <span>Next.js + Gemini</span>
        </div>
      </footer>
    </div>
  );
}
