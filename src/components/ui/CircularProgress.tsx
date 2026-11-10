"use client";

import { motion } from "framer-motion";

interface CircularProgressProps {
  value: number; // 0-100
  size?: number;
  strokeWidth?: number;
}

function getColor(value: number): string {
  if (value >= 75) return "#a855f7"; // React Bits signature purple
  if (value >= 50) return "#38bdf8"; // React Bits cyan
  if (value >= 30) return "#f59e0b"; // Amber
  return "#f43f5e"; // Rose
}

function getLabel(value: number): string {
  if (value >= 80) return "Exceptional Match";
  if (value >= 65) return "Strong Match";
  if (value >= 45) return "Moderate Fit";
  return "Needs Optimization";
}

export function CircularProgress({
  value,
  size = 170,
  strokeWidth = 12,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const color = getColor(value);
  const label = getLabel(value);

  return (
    <div
      className="relative flex flex-col items-center gap-2"
      role="meter"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Match score: ${value}%`}
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="-rotate-90"
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#2f293a"
            strokeWidth={strokeWidth}
          />
          {/* Animated progress ring */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{
              strokeDashoffset: circumference - (value / 100) * circumference,
            }}
            transition={{
              duration: 1.5,
              ease: "easeOut",
              delay: 0.2,
            }}
            style={{
              filter: `drop-shadow(0 0 12px ${color}88)`,
            }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-4xl font-extrabold tracking-tight"
            style={{ color }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {value}
          </motion.span>
          <span className="text-xs font-semibold text-[#b497cf] uppercase tracking-wider">
            Score %
          </span>
        </div>
      </div>
      <motion.span
        className="text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border border-[#2f293a] bg-[#120f17]"
        style={{ color }}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {label}
      </motion.span>
    </div>
  );
}
