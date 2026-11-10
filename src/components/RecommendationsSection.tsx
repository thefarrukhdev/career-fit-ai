"use client";

import { motion } from "framer-motion";

interface RecommendationsSectionProps {
  recommendations: string[];
}

export function RecommendationsSection({ recommendations }: RecommendationsSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full rounded-2xl border border-[#2f293a] bg-[#1b1722]/90 p-5 backdrop-blur-xl"
    >
      <h3 className="text-xs font-semibold text-white mb-3">
        Actionable Recommendations
      </h3>

      <div className="space-y-2">
        {recommendations.map((rec, index) => (
          <div
            key={`rec-${index}`}
            className="flex items-start gap-2.5 p-3 rounded-xl border border-[#2f293a] bg-[#120f17] text-xs text-zinc-300 leading-relaxed"
          >
            <span className="font-mono text-[#a855f7] font-semibold">{index + 1}.</span>
            <span className="flex-1">{rec}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
