"use client";

import { CircularProgress } from "@/components/ui/CircularProgress";
import type { AnalysisResult } from "@/types/analysis";

interface ScoreCardProps {
  result: AnalysisResult;
}

export function ScoreCard({ result }: ScoreCardProps) {
  const { matchScore, seniorityFit, experienceYears, summary } = result;
  const isSeniorityGood = seniorityFit.isMatch;

  return (
    <div className="w-full rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* Left: Score */}
        <div className="md:col-span-4 flex flex-col items-center justify-center">
          <CircularProgress value={matchScore} size={130} strokeWidth={8} />
          <span className="text-[11px] text-zinc-400 mt-1">Match Score</span>
        </div>

        {/* Right: Summary */}
        <div className="md:col-span-8 flex flex-col gap-3">
          <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-950/40 p-3 rounded-lg border border-zinc-800/80">
            {summary}
          </p>

          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <div className="rounded-lg border border-zinc-800/80 bg-zinc-950/40 p-2.5">
              <span className="text-zinc-500 block text-[10px] mb-0.5">Seniority</span>
              <div className="flex items-center gap-1.5">
                <span className="font-medium text-white">{seniorityFit.level}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded ${
                    isSeniorityGood
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-amber-500/10 text-amber-400"
                  }`}
                >
                  {isSeniorityGood ? "Match" : "Gap"}
                </span>
              </div>
            </div>

            <div className="rounded-lg border border-zinc-800/80 bg-zinc-950/40 p-2.5">
              <span className="text-zinc-500 block text-[10px] mb-0.5">Experience</span>
              <span className="font-medium text-white">
                {experienceYears.detected} / {experienceYears.required}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
