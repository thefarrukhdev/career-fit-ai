"use client";

import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ShinyBadgeProps extends HTMLMotionProps<"div"> {
  children?: React.ReactNode;
  className?: string;
  dotColor?: "emerald" | "cyan" | "amber" | "violet";
  showDot?: boolean;
  showShimmer?: boolean;
}

const DOT_COLORS: Record<string, { outer: string; inner: string; glow: string }> = {
  emerald: {
    outer: "bg-emerald-400",
    inner: "bg-emerald-500",
    glow: "shadow-[0_0_12px_rgba(16,185,129,0.8)]",
  },
  cyan: {
    outer: "bg-cyan-400",
    inner: "bg-cyan-500",
    glow: "shadow-[0_0_12px_rgba(6,182,212,0.8)]",
  },
  amber: {
    outer: "bg-amber-400",
    inner: "bg-amber-500",
    glow: "shadow-[0_0_12px_rgba(245,158,11,0.8)]",
  },
  violet: {
    outer: "bg-violet-400",
    inner: "bg-violet-500",
    glow: "shadow-[0_0_12px_rgba(139,92,246,0.8)]",
  },
};

/**
 * React Bits Shiny Animated Badge
 * Sleek pill badge featuring continuous ambient light shimmer,
 * pulse glowing dot, and pitch-black glassmorphic backdrop.
 */
export const ShinyBadge = ({
  children,
  className = "",
  dotColor = "emerald",
  showDot = true,
  showShimmer = true,
  ...props
}: ShinyBadgeProps) => {
  const dotStyles = DOT_COLORS[dotColor] ?? DOT_COLORS.emerald;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-white/10 bg-zinc-950/80 px-3.5 py-1.5 text-xs font-medium text-zinc-300 shadow-lg backdrop-blur-2xl transition-all duration-300 hover:border-emerald-500/40 hover:shadow-[0_0_24px_rgba(16,185,129,0.2)]",
        className
      )}
      {...props}
    >
      {/* Running Shimmer Light Reflection Sweep */}
      {showShimmer && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-y-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent"
          animate={{
            x: ["-150%", "250%"],
          }}
          transition={{
            repeat: Infinity,
            duration: 3.2,
            ease: "easeInOut",
            repeatDelay: 0.8,
          }}
        />
      )}

      {/* Pulse Beacon Indicator Dot */}
      {showDot && (
        <span className="relative flex h-2 w-2 shrink-0">
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
              dotStyles.outer
            )}
          />
          <span
            className={cn(
              "relative inline-flex h-2 w-2 rounded-full",
              dotStyles.inner,
              dotStyles.glow
            )}
          />
        </span>
      )}

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.div>
  );
};

export default ShinyBadge;
