"use client";

import { motion } from "framer-motion";

export function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-5xl mx-auto px-4 pt-4 pb-2 flex items-center justify-between"
    >
      <div className="flex items-center gap-2.5">
        <div className="h-7 w-7 rounded-lg bg-[#a855f7] flex items-center justify-center text-white font-mono text-xs font-bold">
          cf
        </div>
        <span className="font-semibold text-white tracking-tight text-sm">
          CareerFit
        </span>
        <span className="text-[11px] text-[#b497cf] font-mono px-2 py-0.5 rounded-md bg-[#1b1722] border border-[#2f293a]">
          SWARA Edition
        </span>
      </div>

      <a
        href="https://github.com/thefarrukhdev/career-fit-ai"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-[#b497cf] hover:text-white transition-colors flex items-center gap-1"
      >
        <span>GitHub</span>
        <span className="text-[10px] text-[#a855f7]">↗</span>
      </a>
    </motion.nav>
  );
}
