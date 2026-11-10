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
    const textToCopy = `ATS Scan Result:
Score: ${result.matchScore}%
Seniority: ${result.seniorityFit.level} (${result.seniorityFit.isMatch ? "Match" : "Gap"})
Experience: ${result.experienceYears.detected} / ${result.experienceYears.required} req

Summary:
${result.summary}

Matched Skills (${result.matchedSkills.length}):
${result.matchedSkills.join(", ")}

Missing Keywords (${result.missingKeywords.length}):
${result.missingKeywords.join(", ")}

Recommendations:
${result.recommendations.map((r, i) => `${i + 1}. ${r}`).join("\n")}
`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Action Bar */}
      <div className="flex items-center justify-between pb-1">
        <span className="text-xs font-semibold text-white">Results</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopySummary}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#1b1722] border border-[#2f293a] text-zinc-300 hover:text-white transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied" : "Copy"}</span>
          </button>

          {onReset && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#1b1722] border border-[#2f293a] text-zinc-400 hover:text-white transition-all"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      <ScoreCard result={result} />
      <SkillsSection matchedSkills={result.matchedSkills} missingKeywords={result.missingKeywords} />
      <RecommendationsSection recommendations={result.recommendations} />
    </div>
  );
}
