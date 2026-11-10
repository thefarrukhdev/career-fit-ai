"use client";

import { motion } from "framer-motion";
import { Lightbulb, ArrowRight, Zap } from "lucide-react";
import { SpotlightCard } from "./reactbits/SpotlightCard";

interface RecommendationsSectionProps {
  recommendations: string[];
}

export function RecommendationsSection({ recommendations }: RecommendationsSectionProps) {
  return (
    <SpotlightCard
      spotlightColor="rgba(245, 158, 11, 0.18)"
      intensity={0.25}
      className="w-full shadow-2xl relative"
    >
      <div>
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 border-b border-white/[0.07] pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
              <span>Actionable AI Recommendations</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                HIGH IMPACT
              </span>
            </h3>
            <p className="text-xs text-zinc-400">
              High-impact resume tweaks tailored specifically for this position
            </p>
          </div>
        </div>

        {/* List of recommendations */}
        <div className="space-y-3">
          {recommendations.map((rec, index) => (
            <motion.div
              key={`rec-${index}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.06 }}
              className="flex items-start gap-3.5 p-4 rounded-xl border border-white/[0.08] bg-black/40 backdrop-blur-md hover:border-emerald-500/40 hover:bg-white/[0.03] transition-all group cursor-default"
            >
              {/* Neon numbered pill badge */}
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold font-mono group-hover:scale-110 group-hover:bg-emerald-500/20 group-hover:shadow-[0_0_12px_rgba(52,211,153,0.4)] transition-all mt-0.5">
                {index + 1}
              </div>

              {/* Text content */}
              <div className="flex-1 text-sm text-zinc-300 leading-relaxed font-sans group-hover:text-zinc-100 transition-colors">
                {rec}
              </div>

              {/* Animated hover arrow */}
              <div className="flex items-center gap-1 shrink-0 mt-1">
                <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-emerald-400 group-hover:translate-x-1.5 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom micro-tip footer */}
        <div className="mt-5 pt-3 border-t border-white/[0.05] flex items-center gap-1.5 text-[11px] text-zinc-500">
          <Zap className="w-3 h-3 text-amber-400" />
          <span>Apply these specific keywords and metric improvements to maximize recruiter screening pass rate.</span>
        </div>
      </div>
    </SpotlightCard>
  );
}

export default RecommendationsSection;
