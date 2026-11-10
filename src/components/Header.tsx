"use client";

import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, Zap, Cpu, Flame } from "lucide-react";
import { ShinyBadge } from "@/components/reactbits/ShinyBadge";

export function Header() {
  const techChips = [
    {
      icon: ShieldCheck,
      label: "Real-time ATS Score",
      color: "text-emerald-400",
      borderHover: "hover:border-emerald-500/40",
      glowHover: "hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]",
    },
    {
      icon: Sparkles,
      label: "Skill Gap Diagnostics",
      color: "text-cyan-400",
      borderHover: "hover:border-cyan-500/40",
      glowHover: "hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]",
    },
    {
      icon: Cpu,
      label: "Deterministic JSON Schema",
      color: "text-amber-400",
      borderHover: "hover:border-amber-500/40",
      glowHover: "hover:shadow-[0_0_15px_rgba(245,158,11,0.2)]",
    },
    {
      icon: Flame,
      label: "Instant Match Analysis",
      color: "text-rose-400",
      borderHover: "hover:border-rose-500/40",
      glowHover: "hover:shadow-[0_0_15px_rgba(244,63,94,0.2)]",
    },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="text-center py-10 md:py-16 px-4 flex flex-col items-center relative z-20"
    >
      {/* Top React Bits Shiny Pill Badge */}
      <ShinyBadge className="mb-6 cursor-default" dotColor="emerald">
        <span className="font-semibold text-emerald-400">React Bits Enhanced</span>
        <span className="text-zinc-600">•</span>
        <span className="text-zinc-300">
          Proof of Work for <strong className="font-bold text-white">SWARA</strong>
        </span>
        <span className="text-zinc-600">•</span>
        <span className="flex items-center gap-1 font-semibold text-emerald-400">
          <Zap className="w-3.5 h-3.5 fill-emerald-400/40" /> Gemini 3.8 AI
        </span>
      </ShinyBadge>

      {/* Main High-Contrast Hero Title */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-5 leading-[1.08] max-w-4xl">
        AI-Powered{" "}
        <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(16,185,129,0.35)]">
          ATS Resume Scanner
        </span>
      </h1>

      {/* Subtitle */}
      <p className="max-w-2xl text-base sm:text-lg text-zinc-400 leading-relaxed font-normal mb-8">
        Match your resume against any job description with real-time deep ATS scoring, keyword gap diagnostics, and actionable AI optimizations.
      </p>

      {/* React Bits Interactive Technology Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs sm:text-sm">
        {techChips.map((chip, index) => {
          const Icon = chip.icon;
          return (
            <motion.div
              key={chip.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.06, duration: 0.4 }}
              whileHover={{ y: -2, scale: 1.02 }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-zinc-950/70 backdrop-blur-xl text-zinc-300 shadow-sm transition-all duration-200 cursor-default ${chip.borderHover} ${chip.glowHover}`}
            >
              <Icon className={`w-3.5 h-3.5 ${chip.color}`} />
              <span className="font-medium">{chip.label}</span>
            </motion.div>
          );
        })}
      </div>
    </motion.header>
  );
}

export default Header;
