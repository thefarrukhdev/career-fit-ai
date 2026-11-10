"use client";

import { motion } from "framer-motion";
import { CheckCircle2, AlertOctagon } from "lucide-react";

interface SkillsSectionProps {
  matchedSkills: string[];
  missingKeywords: string[];
}

export function SkillsSection({ matchedSkills, missingKeywords }: SkillsSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      {/* Matched Skills Column (React Bits Purple/Emerald) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border border-[#2f293a] bg-[#1b1722]/90 p-5 md:p-6 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.35)] flex flex-col hover:border-[#a855f7]/40 transition-colors"
      >
        <div className="flex items-center justify-between mb-4 border-b border-[#2f293a] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white tracking-wide">
              Matched Skills & Tech Stack
            </h3>
          </div>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            {matchedSkills.length} Found
          </span>
        </div>

        {matchedSkills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {matchedSkills.map((skill, index) => (
              <motion.span
                key={`matched-${skill}-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, delay: index * 0.03 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-[#120f17] border border-emerald-500/30 text-emerald-300 shadow-sm hover:border-emerald-400 hover:shadow-[0_0_12px_rgba(16,185,129,0.2)] transition-all"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {skill}
              </motion.span>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-xs text-[#b497cf] italic">
            No exact matching keywords were detected. Try updating your resume with relevant terms.
          </div>
        )}
      </motion.div>

      {/* Missing Keywords Column (Rose / Amber Alert) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border border-[#2f293a] bg-[#1b1722]/90 p-5 md:p-6 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.35)] flex flex-col hover:border-rose-500/40 transition-colors"
      >
        <div className="flex items-center justify-between mb-4 border-b border-[#2f293a] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500/15 text-rose-400 border border-rose-500/30">
              <AlertOctagon className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white tracking-wide">
              Missing Critical Keywords
            </h3>
          </div>
          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30">
            {missingKeywords.length} Missing
          </span>
        </div>

        {missingKeywords.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {missingKeywords.map((keyword, index) => (
              <motion.span
                key={`missing-${keyword}-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, delay: index * 0.03 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-[#120f17] border border-rose-500/30 text-rose-300 shadow-sm hover:border-rose-400 hover:shadow-[0_0_12px_rgba(244,63,94,0.2)] transition-all"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                {keyword}
              </motion.span>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-xs text-emerald-400/90 italic font-medium">
            Outstanding! Your resume covers all critical requirements found in the job description.
          </div>
        )}
      </motion.div>
    </div>
  );
}
