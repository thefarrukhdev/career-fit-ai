"use client";

import { useState } from "react";
import type { AnalysisResult } from "@/types/analysis";
import { ScoreCard } from "./ScoreCard";
import { SkillsSection } from "./SkillsSection";
import { RecommendationsSection } from "./RecommendationsSection";
import { Copy, Check, RotateCcw } from "lucide-react";

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
      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-950/70 p-4 rounded-xl border border-zinc-800 backdrop-blur-md">
        <div>
          <h2 className="text-sm font-semibold text-white">Diagnostic Report Ready</h2>
          <p className="text-xs text-zinc-400">Analysis completed with high-precision heuristic & AI parsing</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopySummary}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-900 border border-zinc-700 hover:border-zinc-500 text-zinc-200 hover:text-white transition-all shadow-sm"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copied Report!" : "Copy Report"}
          </button>
          {onReset && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all"
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
