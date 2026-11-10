"use client";

import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, Zap } from "lucide-react";

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center py-10 md:py-14 px-4 flex flex-col items-center"
    >
      {/* Top pill badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wide mb-5 border border-zinc-800 bg-zinc-900/80 backdrop-blur-md text-zinc-300 shadow-sm"
      >
        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>Proof of Work for <strong className="text-white">SWARA</strong></span>
        <span className="text-zinc-600">•</span>
        <span className="text-emerald-400 font-semibold flex items-center gap-1">
          <Zap className="w-3 h-3" /> Gemini 3.8 AI Engine
        </span>
      </motion.div>

      {/* Main Title */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
        AI-Powered <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">ATS Resume Scanner</span>
      </h1>

      {/* Subtitle */}
      <p className="max-w-2xl text-base sm:text-lg text-zinc-400 leading-relaxed font-normal mb-6">
        Match your resume against any job description with real-time deep ATS scoring, keyword gap diagnostics, and actionable AI optimizations.
      </p>

      {/* Feature highlights bar */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-zinc-400">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Real-time ATS Score</span>
        </div>
        <span className="text-zinc-700 hidden sm:inline">•</span>
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Skill Gap Analysis</span>
        </div>
        <span className="text-zinc-700 hidden sm:inline">•</span>
        <div className="flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-amber-400" />
          <span>Deterministic JSON Engine</span>
        </div>
      </div>
    </motion.header>
  );
}
