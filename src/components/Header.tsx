"use client";

import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, Zap, ArrowRight, Code2 } from "lucide-react";

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="text-center pt-6 pb-12 px-4 flex flex-col items-center relative"
    >
      {/* Top React Bits Pill Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium mb-6 border border-[#a855f7]/30 bg-[#1b1722]/90 backdrop-blur-md text-[#d8b4fe] shadow-[0_0_20px_rgba(168,85,247,0.15)] group cursor-pointer hover:border-[#a855f7]/60 transition-all"
      >
        <span className="flex h-2 w-2 rounded-full bg-[#a855f7] animate-pulse" />
        <span className="font-semibold text-white">SWARA Proof of Work</span>
        <span className="text-[#2f293a]">•</span>
        <span className="text-[#b497cf] flex items-center gap-1 group-hover:text-white transition-colors">
          React Bits Edition v2.0
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </motion.div>

      {/* Main Title in React Bits Gradient */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-5 max-w-4xl leading-[1.1]">
        Make your resume pop with{" "}
        <span className="animate-gradient-text block sm:inline">
          interactive ATS matching
        </span>
      </h1>

      {/* Subtitle in React Bits muted purple */}
      <p className="max-w-2xl text-base sm:text-lg text-[#b497cf] leading-relaxed font-normal mb-8">
        An animated, production-ready ATS diagnostic platform designed for <strong className="text-white">SWARA ($80k-$90k + 10% equity)</strong>. Built with React 19, Next.js 16, and Gemini 3.8.
      </p>

      {/* Feature Pills */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-zinc-300">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1b1722] border border-[#2f293a]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Real-time ATS Score</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1b1722] border border-[#2f293a]">
          <Sparkles className="w-3.5 h-3.5 text-[#a855f7]" />
          <span>Keyword Gap Analysis</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1b1722] border border-[#2f293a]">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Gemini 3.8 Flash Engine</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1b1722] border border-[#2f293a]">
          <Code2 className="w-3.5 h-3.5 text-cyan-400" />
          <span>Deterministic Zod Schema</span>
        </div>
      </div>
    </motion.header>
  );
}
