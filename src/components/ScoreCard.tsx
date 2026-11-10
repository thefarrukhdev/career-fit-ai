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
      className="w-full rounded-2xl border border-[#2f293a] bg-[#1b1722]/95 p-6 md:p-8 backdrop-blur-2xl shadow-[0_16px_45px_rgba(0,0,0,0.5)] relative overflow-hidden"
    >
      {/* Decorative React Bits purple glow in background */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#a855f7]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#38bdf8]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left: Score Gauge */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 border-b lg:border-b-0 lg:border-r border-[#2f293a]">
          <span className="text-xs font-bold tracking-wider text-[#d8b4fe] uppercase mb-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#a855f7]/15 border border-[#a855f7]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#c084fc]" /> Overall ATS Match
          </span>
          <CircularProgress value={matchScore} size={180} strokeWidth={12} />
        </div>

        {/* Right: Breakdown & Summary */}
        <div className="lg:col-span-8 flex flex-col justify-between gap-5">
          {/* Executive Summary */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#b497cf] mb-2 flex items-center gap-1.5">
              <span>Executive ATS Assessment</span>
            </h3>
            <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-sans bg-[#120f17]/90 p-4 rounded-xl border border-[#2f293a]">
              {summary}
            </p>
          </div>

          {/* Metrics grid: Seniority & Years */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Seniority Fit Card */}
            <div className="rounded-xl border border-[#2f293a] bg-[#120f17]/80 p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#b497cf] font-medium flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#a855f7]" /> Seniority Alignment
                </span>
                <span
                  className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                    isSeniorityGood
                      ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                      : "bg-amber-500/15 text-amber-400 border-amber-500/30"
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
            <div className="rounded-xl border border-[#2f293a] bg-[#120f17]/80 p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#b497cf] font-medium flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#38bdf8]" /> Experience Range
                </span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono pt-1">
                <div>
                  <span className="text-[10px] text-[#b497cf] block uppercase">Required</span>
                  <span className="text-white font-bold">{experienceYears.required}</span>
                </div>
                <div className="h-6 w-px bg-[#2f293a]" />
                <div>
                  <span className="text-[10px] text-[#b497cf] block uppercase">Detected</span>
                  <span className="text-[#c084fc] font-bold">{experienceYears.detected}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
