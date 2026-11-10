"use client";

import { motion } from "framer-motion";
import { Lightbulb, ArrowRight } from "lucide-react";

interface RecommendationsSectionProps {
  recommendations: string[];
}

export function RecommendationsSection({ recommendations }: RecommendationsSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="w-full rounded-2xl border border-[#2f293a] bg-[#1b1722]/90 p-6 md:p-8 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
    >
      <div className="flex items-center gap-2.5 mb-6 border-b border-[#2f293a] pb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#a855f7]/15 text-[#c084fc] border border-[#a855f7]/30">
          <Lightbulb className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white tracking-wide">
            Actionable AI Recommendations
          </h3>
          <p className="text-xs text-[#b497cf]">
            High-impact resume tweaks tailored specifically for this position
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec, index) => (
          <motion.div
            key={`rec-${index}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.08 }}
            className="flex items-start gap-3.5 p-4 rounded-xl border border-[#2f293a] bg-[#120f17]/90 hover:border-[#a855f7]/50 hover:bg-[#120f17] transition-all group cursor-default shadow-sm"
          >
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#a855f7]/20 text-[#e2c9ff] border border-[#a855f7]/40 text-xs font-bold font-mono group-hover:scale-110 transition-transform mt-0.5 shadow-[0_0_10px_rgba(168,85,247,0.3)]">
              {index + 1}
            </div>
            <div className="flex-1 text-sm text-zinc-200 leading-relaxed font-sans">
              {rec}
            </div>
            <ArrowRight className="w-4 h-4 text-[#554c5e] group-hover:text-[#a855f7] group-hover:translate-x-1 transition-all shrink-0 mt-1" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
