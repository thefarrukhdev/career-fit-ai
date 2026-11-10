"use client";

import { motion } from "framer-motion";
import { CircularProgress } from "@/components/ui/CircularProgress";
import type { AnalysisResult } from "@/types/analysis";
import { CheckCircle2, AlertTriangle, Calendar, Award, Sparkles } from "lucide-react";

interface ScoreCardProps {
  result: AnalysisResult;
}

export function ScoreCard({ result }: ScoreCardProps) {
  const { matchScore, seniorityFit, experienceYears, summary } = result;

  const isSeniorityGood = seniorityFit.isMatch;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 md:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden"
    >
      {/* Decorative gradient glow in background */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left: Score Gauge */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 border-b lg:border-b-0 lg:border-r border-zinc-800/80">
          <span className="text-xs font-semibold tracking-wider text-zinc-400 uppercase mb-4 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Overall ATS Match
          </span>
          <CircularProgress value={matchScore} size={170} strokeWidth={12} />
        </div>

        {/* Right: Breakdown & Summary */}
        <div className="lg:col-span-8 flex flex-col justify-between gap-5">
          {/* Executive Summary */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-2">
              ATS Executive Summary
            </h3>
            <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-sans bg-zinc-950/60 p-4 rounded-xl border border-zinc-800/80">
              {summary}
            </p>
          </div>

          {/* Metrics grid: Seniority & Years */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Seniority Fit Card */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-3.5 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-zinc-400 font-medium flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-cyan-400" /> Seniority Level
                </span>
                <span
                  className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                    isSeniorityGood
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                      : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                  }`}
                >
                  {isSeniorityGood ? (
                    <CheckCircle2 className="w-3 h-3" />
                  ) : (
                    <AlertTriangle className="w-3 h-3" />
                  )}
                  {seniorityFit.level} Fit
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-snug">
                {seniorityFit.explanation}
              </p>
            </div>

            {/* Experience Years Card */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-3.5 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-zinc-400 font-medium flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-purple-400" /> Experience Timeline
                </span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-[10px] text-zinc-500 block uppercase">Required</span>
                  <span className="text-zinc-200 font-semibold">{experienceYears.required}</span>
                </div>
                <div className="h-6 w-px bg-zinc-800" />
                <div>
                  <span className="text-[10px] text-zinc-500 block uppercase">Detected</span>
                  <span className="text-emerald-400 font-semibold">{experienceYears.detected}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
