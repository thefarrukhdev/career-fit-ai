"use client";

import { motion } from "framer-motion";
import { CircularProgress } from "@/components/ui/CircularProgress";
import type { AnalysisResult } from "@/types/analysis";

interface ScoreCardProps {
  result: AnalysisResult;
}

export function ScoreCard({ result }: ScoreCardProps) {
  const { matchScore, seniorityFit, experienceYears, summary } = result;
  const isSeniorityGood = seniorityFit.isMatch;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full rounded-2xl border border-[#2f293a] bg-[#1b1722]/90 p-6 backdrop-blur-xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left: Score Gauge */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-2">
          <CircularProgress value={matchScore} size={150} strokeWidth={10} />
        </div>

        {/* Right: Summary & Metrics */}
        <div className="md:col-span-8 flex flex-col gap-4">
          <p className="text-sm text-zinc-200 leading-relaxed bg-[#120f17] p-3.5 rounded-xl border border-[#2f293a]">
            {summary}
          </p>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-xl border border-[#2f293a] bg-[#120f17] p-3">
              <span className="text-[#b497cf] block text-[11px] mb-1">Seniority</span>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-white">{seniorityFit.level}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded ${
                    isSeniorityGood
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-amber-500/10 text-amber-400"
                  }`}
                >
                  {isSeniorityGood ? "Match" : "Gap"}
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-[#2f293a] bg-[#120f17] p-3">
              <span className="text-[#b497cf] block text-[11px] mb-1">Experience</span>
              <span className="font-semibold text-white">
                {experienceYears.detected} / {experienceYears.required} req
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
