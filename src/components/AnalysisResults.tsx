"use client";

import { useState } from "react";
import type { AnalysisResult } from "@/types/analysis";
import { ScoreCard } from "./ScoreCard";
import { SkillsSection } from "./SkillsSection";
import { RecommendationsSection } from "./RecommendationsSection";
import { Copy, Check, RotateCcw, Sparkles } from "lucide-react";

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
      {/* React Bits Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#1b1722]/95 p-4 sm:p-5 rounded-2xl border border-[#2f293a] backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#a855f7] to-[#7c3aed] text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-wide">ATS Diagnostic Report Ready</h2>
            <p className="text-xs text-[#b497cf]">Evaluated via Gemini 3.8 Flash & Deterministic Zod Schema</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopySummary}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#120f17] border border-[#2f293a] hover:border-[#a855f7]/60 text-zinc-200 hover:text-white transition-all shadow-sm"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#a855f7]" />}
            {copied ? "Copied Report!" : "Copy Report"}
          </button>

          {onReset && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#120f17] border border-[#2f293a] hover:border-[#2f293a] text-[#b497cf] hover:text-white transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              New Scan
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
