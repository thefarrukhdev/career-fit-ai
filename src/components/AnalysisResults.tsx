"use client";

import { useState } from "react";
import type { AnalysisResult } from "@/types/analysis";
import { ScoreCard } from "./ScoreCard";
import { SkillsSection } from "./SkillsSection";
import { RecommendationsSection } from "./RecommendationsSection";
import { Copy, Check, RotateCcw, FileCheck2 } from "lucide-react";

interface AnalysisResultsProps {
  result: AnalysisResult;
  onReset?: () => void;
}

export function AnalysisResults({ result, onReset }: AnalysisResultsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopySummary = async () => {
    const textToCopy = `ATS Scan Summary for Job Match:
Score: ${result.matchScore}%
Seniority: ${result.seniorityFit.level} (${result.seniorityFit.isMatch ? "Matched" : "Review Needed"})
Experience: ${result.experienceYears.detected} detected vs ${result.experienceYears.required} required

Summary:
${result.summary}

Matched Skills (${result.matchedSkills.length}):
${result.matchedSkills.join(", ")}

Missing Keywords (${result.missingKeywords.length}):
${result.missingKeywords.join(", ")}

Top Recommendations:
${result.recommendations.map((r, i) => `${i + 1}. ${r}`).join("\n")}
`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy report:", err);
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* React Bits Toolbar Action Bar */}
      <div className="relative flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-[#0a0a0f]/85 border border-white/[0.08] backdrop-blur-xl shadow-2xl overflow-hidden">
        {/* Subtle top shimmer accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-semibold text-white tracking-wide">
                ATS Diagnostic Report Ready
              </h2>
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
            </div>
            <p className="text-xs text-zinc-400">
              Evaluated with deterministic schema heuristics & Gemini AI
            </p>
          </div>
        </div>

        {/* Toolbar Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleCopySummary}
            className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all overflow-hidden cursor-pointer select-none border ${
              copied
                ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                : "bg-white/[0.05] hover:bg-white/[0.1] border-white/[0.1] text-zinc-200 hover:text-white hover:border-white/20 shadow-md"
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                <span>Copied Report!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-zinc-400" />
                <span>Copy Report</span>
              </>
            )}
          </button>

          {onReset && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.07] hover:border-white/[0.15] text-zinc-400 hover:text-zinc-200 transition-all cursor-pointer select-none"
            >
              <RotateCcw className="w-3.5 h-3.5 transition-transform group-hover:-rotate-90" />
              <span>New Scan</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Score & Metrics */}
      <ScoreCard result={result} />

      {/* Skills Comparison */}
      <SkillsSection
        matchedSkills={result.matchedSkills}
        missingKeywords={result.missingKeywords}
      />

      {/* Actionable Recommendations */}
      <RecommendationsSection recommendations={result.recommendations} />
    </div>
  );
}

export default AnalysisResults;
