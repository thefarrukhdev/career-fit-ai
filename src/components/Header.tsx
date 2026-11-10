"use client";

import { motion } from "framer-motion";

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="text-center pt-8 pb-10 px-4"
    >
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-3">
        ATS Resume Scanner
      </h1>
      <p className="text-sm sm:text-base text-[#b497cf] max-w-lg mx-auto font-normal">
        Match your resume against any job description with real-time keyword gap analysis.
      </p>
    </motion.header>
  );
}
