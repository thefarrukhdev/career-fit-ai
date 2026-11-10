"use client";

import { motion } from "framer-motion";

interface SkillsSectionProps {
  matchedSkills: string[];
  missingKeywords: string[];
}

export function SkillsSection({ matchedSkills, missingKeywords }: SkillsSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      {/* Matched Skills */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-2xl border border-[#2f293a] bg-[#1b1722]/90 p-5 backdrop-blur-xl"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-white">Matched Skills</span>
          <span className="text-[11px] text-emerald-400 font-mono">{matchedSkills.length}</span>
        </div>

        {matchedSkills.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {matchedSkills.map((skill, index) => (
              <span
                key={`matched-${skill}-${index}`}
                className="px-2.5 py-1 rounded-md text-xs bg-[#120f17] border border-emerald-500/30 text-emerald-300"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-xs text-[#b497cf] italic">No matching keywords found.</p>
        )}
      </motion.div>

      {/* Missing Keywords */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-2xl border border-[#2f293a] bg-[#1b1722]/90 p-5 backdrop-blur-xl"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-white">Missing Keywords</span>
          <span className="text-[11px] text-rose-400 font-mono">{missingKeywords.length}</span>
        </div>

        {missingKeywords.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {missingKeywords.map((keyword, index) => (
              <span
                key={`missing-${keyword}-${index}`}
                className="px-2.5 py-1 rounded-md text-xs bg-[#120f17] border border-rose-500/30 text-rose-300"
              >
                {keyword}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-xs text-emerald-400 italic">All key requirements found.</p>
        )}
      </motion.div>
    </div>
  );
}
