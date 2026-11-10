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
      className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 md:p-8 backdrop-blur-xl shadow-lg"
    >
      <div className="flex items-center gap-2.5 mb-6 border-b border-zinc-800/80 pb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <Lightbulb className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white tracking-wide">
            Actionable AI Recommendations
          </h3>
          <p className="text-xs text-zinc-400">
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
            className="flex items-start gap-3.5 p-4 rounded-xl border border-zinc-800/90 bg-zinc-950/60 hover:border-zinc-700/80 hover:bg-zinc-950 transition-all group"
          >
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold font-mono group-hover:scale-110 transition-transform mt-0.5">
              {index + 1}
            </div>
            <div className="flex-1 text-sm text-zinc-300 leading-relaxed font-sans">
              {rec}
            </div>
            <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
