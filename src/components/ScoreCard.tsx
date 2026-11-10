"use client";

import { motion } from "framer-motion";
import { CircularProgress } from "@/components/ui/CircularProgress";
import type { AnalysisResult } from "@/types/analysis";
import { CheckCircle2, AlertTriangle, Calendar, Award, Sparkles, TrendingUp } from "lucide-react";
import { SpotlightCard } from "./reactbits/SpotlightCard";

interface ScoreCardProps {
  result: AnalysisResult;
}

export function ScoreCard({ result }: ScoreCardProps) {
  const { matchScore, seniorityFit, experienceYears, summary } = result;

  const isSeniorityGood = seniorityFit.isMatch;
  const isHighMatch = matchScore >= 70;
  const spotlightColor = isHighMatch
    ? "rgba(16, 185, 129, 0.28)"
    : matchScore >= 40
    ? "rgba(245, 158, 11, 0.28)"
    : "rgba(244, 63, 94, 0.28)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <SpotlightCard
        spotlightColor={spotlightColor}
        intensity={0.3}
        spotlightSize={350}
        borderGlow={0.8}
        className="w-full shadow-2xl relative overflow-hidden"
      >
      {/* Decorative ambient background glows */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Bento Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left: ATS Gauge with Ambient Pulsing Aura */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 border-b lg:border-b-0 lg:border-r border-white/[0.08] relative">
          {/* Multi-layered Ambient Glow Halo behind Gauge */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className={`w-48 h-48 rounded-full blur-[45px] transition-all duration-700 ${
                isHighMatch
                  ? "bg-emerald-500/20"
                  : matchScore >= 40
                  ? "bg-amber-500/20"
                  : "bg-rose-500/20"
              }`}
            />
            <div className="w-56 h-56 rounded-full border border-white/[0.05] animate-pulse pointer-events-none" />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <span className="text-xs font-semibold tracking-wider text-zinc-400 uppercase mb-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Overall ATS Match
            </span>
            <CircularProgress value={matchScore} size={180} strokeWidth={12} />
            <div className="mt-3 flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>Target Role Fit</span>
            </div>
          </div>
        </div>

        {/* Right: Executive Summary & Stat Bento Cards */}
        <div className="lg:col-span-8 flex flex-col justify-between gap-5">
          {/* Executive Summary in Frosted Glass */}
          <div className="rounded-xl border border-white/[0.08] bg-black/40 p-5 backdrop-blur-md relative overflow-hidden group hover:border-white/[0.15] transition-all">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                ATS Executive Diagnostic
              </h3>
            </div>
            <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-sans">
              {summary}
            </p>
          </div>

          {/* Metrics grid: Seniority & Years in Bento format */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Seniority Fit Card */}
            <div className="rounded-xl border border-white/[0.08] bg-black/40 p-4 backdrop-blur-md flex flex-col justify-between hover:border-white/[0.14] transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-zinc-400 font-medium flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-cyan-400" /> Seniority Level
                </span>
                <span
                  className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border shadow-sm ${
                    isSeniorityGood
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.15)]"
                      : "bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.15)]"
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
            <div className="rounded-xl border border-white/[0.08] bg-black/40 p-4 backdrop-blur-md flex flex-col justify-between hover:border-white/[0.14] transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-zinc-400 font-medium flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-purple-400" /> Experience Timeline
                </span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono pt-1">
                <div>
                  <span className="text-[10px] text-zinc-500 block uppercase font-sans">Required</span>
                  <span className="text-zinc-200 font-bold text-sm">{experienceYears.required}</span>
                </div>
                <div className="h-7 w-px bg-white/[0.08]" />
                <div>
                  <span className="text-[10px] text-zinc-500 block uppercase font-sans">Detected</span>
                  <span className="text-emerald-400 font-bold text-sm drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]">
                    {experienceYears.detected}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SpotlightCard>
    </motion.div>
  );
}

export default ScoreCard;
