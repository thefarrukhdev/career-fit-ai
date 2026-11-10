"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight, Flame } from "lucide-react";

function GithubIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="sticky top-4 z-50 w-full max-w-5xl mx-auto px-4 mb-6"
    >
      <div className="flex items-center justify-between px-5 py-3 rounded-full bg-[#1b1722]/85 border border-[#2f293a] backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-[#a855f7] to-[#7c3aed] shadow-[0_0_15px_rgba(168,85,247,0.5)] text-white">
            <span className="font-mono text-sm font-black">rb</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-white tracking-tight text-sm sm:text-base">ReactBits</span>
            <span className="text-[#a855f7] font-semibold text-xs px-2 py-0.5 rounded-full bg-[#a855f7]/15 border border-[#a855f7]/30">
              ATS Pro
            </span>
          </div>
        </div>

        {/* Center Navigation Links (ReactBits style) */}
        <div className="hidden md:flex items-center gap-6 text-xs font-medium text-[#b497cf]">
          <a href="#workbench" className="text-white hover:text-[#a855f7] transition-colors flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#a855f7]" />
            ATS Matcher
          </a>
          <a href="#benchmarks" className="hover:text-white transition-colors">
            SWARA Benchmark
          </a>
          <a href="#features" className="hover:text-white transition-colors flex items-center gap-1">
            <span>Zod Engine</span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#a855f7]/20 text-[#d8b4fe]">NEW</span>
          </a>
        </div>

        {/* Right CTA and GitHub */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/thefarrukhdev/career-fit-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-zinc-300 hover:text-white bg-[#120f17] border border-[#2f293a] hover:border-[#a855f7]/50 transition-all shadow-sm"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
            <span className="text-[10px] text-[#a855f7] font-bold ml-0.5">★ Star</span>
          </a>

          <a
            href="#workbench"
            className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-[#a855f7] to-[#7c3aed] text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] hover:brightness-110 transition-all"
          >
            <Flame className="w-3.5 h-3.5 fill-white" />
            <span>SWARA Fit</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
