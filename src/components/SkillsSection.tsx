"use client";

import { motion } from "framer-motion";
import { CheckCircle2, AlertOctagon, Sparkles } from "lucide-react";
import { SpotlightCard } from "./reactbits/SpotlightCard";

interface SkillsSectionProps {
  matchedSkills: string[];
  missingKeywords: string[];
}

export function SkillsSection({ matchedSkills, missingKeywords }: SkillsSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      {/* Matched Skills Column (Emerald Spotlight Card) */}
      <SpotlightCard
        spotlightColor="rgba(16, 185, 129, 0.22)"
        intensity={0.28}
        className="w-full flex flex-col justify-between shadow-xl"
      >
        <div>
          <div className="flex items-center justify-between mb-5 border-b border-white/[0.07] pb-3.5">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <CheckCircle2 className="w-4 h-4 shadow-[0_0_8px_rgba(52,211,153,0.4)]" />
              </div>
              <h3 className="text-base font-semibold text-white tracking-wide">
                Matched Skills & Qualifications
              </h3>
            </div>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.15)] font-mono">
              {matchedSkills.length} Found
            </span>
          </div>

          {matchedSkills.length > 0 ? (
            <div className="flex flex-wrap gap-2.5">
              {matchedSkills.map((skill, index) => (
                <motion.span
                  key={`matched-${skill}-${index}`}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, delay: index * 0.02 }}
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 shadow-sm hover:border-emerald-400 hover:text-white hover:shadow-[0_0_15px_rgba(16,185,129,0.35)] transition-all cursor-default select-none backdrop-blur-md"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)] animate-pulse" />
                  <span>{skill}</span>
                </motion.span>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center text-xs text-zinc-500 italic">
              No direct matching keywords were detected. Try updating your resume with target terminology.
            </div>
          )}
        </div>
      </SpotlightCard>

      {/* Missing Keywords Column (Rose / Amber Spotlight Card) */}
      <SpotlightCard
        spotlightColor="rgba(244, 63, 94, 0.22)"
        intensity={0.28}
        className="w-full flex flex-col justify-between shadow-xl"
      >
        <div>
          <div className="flex items-center justify-between mb-5 border-b border-white/[0.07] pb-3.5">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400">
                <AlertOctagon className="w-4 h-4 shadow-[0_0_8px_rgba(251,113,133,0.4)]" />
              </div>
              <h3 className="text-base font-semibold text-white tracking-wide">
                Missing Critical Keywords
              </h3>
            </div>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 shadow-[0_0_12px_rgba(244,63,94,0.15)] font-mono">
              {missingKeywords.length} Missing
            </span>
          </div>

          {missingKeywords.length > 0 ? (
            <div className="flex flex-wrap gap-2.5">
              {missingKeywords.map((keyword, index) => (
                <motion.span
                  key={`missing-${keyword}-${index}`}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, delay: index * 0.02 }}
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-rose-950/35 border border-rose-500/30 text-rose-200 shadow-sm hover:border-rose-400 hover:text-white hover:shadow-[0_0_15px_rgba(244,63,94,0.35)] transition-all cursor-default select-none backdrop-blur-md"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.9)] animate-pulse" />
                  <span>{keyword}</span>
                </motion.span>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center text-xs text-emerald-400/90 italic font-medium flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Outstanding! Your resume covers all critical requirements found in the job description.</span>
            </div>
          )}
        </div>
      </SpotlightCard>
    </div>
  );
}

export default SkillsSection;
