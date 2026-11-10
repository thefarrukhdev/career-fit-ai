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
      {/* Matched Skills Column (Green) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 md:p-6 backdrop-blur-xl flex flex-col"
      >
        <div className="flex items-center justify-between mb-4 border-b border-zinc-800/80 pb-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-semibold text-white tracking-wide">
              Matched Skills & Qualifications
            </h3>
          </div>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
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
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 shadow-sm hover:border-emerald-500/60 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {skill}
              </motion.span>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-xs text-zinc-500 italic">
            No exact matching keywords were detected. Try updating your resume with relevant terms.
          </div>
        )}
      </motion.div>

      {/* Missing Keywords Column (Red / Amber Alert) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 md:p-6 backdrop-blur-xl flex flex-col"
      >
        <div className="flex items-center justify-between mb-4 border-b border-zinc-800/80 pb-3">
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-5 h-5 text-rose-400" />
            <h3 className="text-base font-semibold text-white tracking-wide">
              Missing Critical Keywords
            </h3>
          </div>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
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
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-rose-950/30 border border-rose-500/30 text-rose-300 shadow-sm hover:border-rose-500/60 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                {keyword}
              </motion.span>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-xs text-emerald-400/80 italic font-medium">
            Outstanding! Your resume covers all critical requirements found in the job description.
          </div>
        )}
      </motion.div>
    </div>
  );
}
