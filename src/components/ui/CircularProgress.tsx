import { motion } from "framer-motion";

interface CircularProgressProps {
  value: number; // 0-100
  size?: number;
  strokeWidth?: number;
}

function getColor(value: number): string {
  if (value >= 70) return "#22c55e";
  if (value >= 40) return "#f59e0b";
  return "#ef4444";
}

function getLabel(value: number): string {
  if (value >= 80) return "Excellent";
  if (value >= 60) return "Good";
  if (value >= 40) return "Fair";
  return "Poor";
}

export function CircularProgress({
  value,
  size = 160,
  strokeWidth = 10,
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
            stroke="#222222"
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
              delay: 0.3,
            }}
            style={{
              filter: `drop-shadow(0 0 8px ${color})`,
            }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-4xl font-bold"
            style={{ color }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {value}
          </motion.span>
          <span className="text-sm font-medium" style={{ color: "#71717a" }}>
            %
          </span>
        </div>
      </div>
      <motion.span
        className="text-sm font-semibold tracking-wider uppercase"
        style={{ color }}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        {label} Match
      </motion.span>
    </div>
  );
}
