"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Easing = "smooth" | "linear" | "snappy";
type Trigger = "loop" | "hover" | "view";

export interface ShinyTextProps {
  text?: string;
  children?: ReactNode;
  color?: string;
  shineColor?: string;
  speed?: number;
  delay?: number;
  angle?: number;
  shineWidth?: number;
  softness?: number;
  bands?: number;
  glow?: number;
  direction?: "left" | "right";
  easing?: Easing;
  trigger?: Trigger;
  yoyo?: boolean;
  followPointer?: boolean;
  pauseOnHover?: boolean;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

interface Settings {
  color: string;
  shineColor: string;
  speed: number;
  delay: number;
  angle: number;
  shineWidth: number;
  softness: number;
  bands: number;
  glow: number;
  sign: number;
  ease: (t: number) => number;
  trigger: Trigger;
  yoyo: boolean;
  followPointer: boolean;
  pauseOnHover: boolean;
  disabled: boolean;
}

const EASINGS: Record<Easing, (t: number) => number> = {
  linear: (t) => t,
  smooth: (t) => 0.5 - Math.cos(Math.PI * t) / 2,
  snappy: (t) => (t < 0.5 ? 16 * Math.pow(t, 5) : 1 - Math.pow(-2 * t + 2, 5) / 2),
};
const TRIGGERS: Trigger[] = ["loop", "hover", "view"];
const FALLOFF = [0, 0.2, 0.4, 0.6, 0.8, 1];

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

let paint: CanvasRenderingContext2D | null = null;

const parseColor = (value: string): number[] | null => {
  if (typeof document === "undefined") return null;
  if (!paint) paint = document.createElement("canvas").getContext("2d");
  if (!paint) return null;
  paint.fillStyle = "#000000";
  paint.fillStyle = value;
  const resolved = String(paint.fillStyle);
  if (resolved.startsWith("#")) {
    return [1, 3, 5].map((i) => parseInt(resolved.slice(i, i + 2), 16)).concat(1);
  }
  const parts = resolved.match(/[\d.]+/g);
  if (!parts || parts.length < 3) return null;
  return [Number(parts[0]), Number(parts[1]), Number(parts[2]), parts.length > 3 ? Number(parts[3]) : 1];
};

const blend = (from: number[], to: number[], amount: number) => {
  const channel = (a: number, b: number) =>
    Math.round(Math.pow(Math.pow(a / 255, 2.2) * (1 - amount) + Math.pow(b / 255, 2.2) * amount, 1 / 2.2) * 255);
  const alpha = from[3] * (1 - amount) + to[3] * amount;
  if (alpha <= 0) return "rgba(0, 0, 0, 0)";
  const weigh = (a: number, b: number) => (a * from[3] * (1 - amount) + b * to[3] * amount) / alpha;
  const r = from[3] === to[3] ? channel(from[0], to[0]) : Math.round(weigh(from[0], to[0]));
  const g = from[3] === to[3] ? channel(from[1], to[1]) : Math.round(weigh(from[1], to[1]));
  const b = from[3] === to[3] ? channel(from[2], to[2]) : Math.round(weigh(from[2], to[2]));
  return `rgba(${r}, ${g}, ${b}, ${Math.round(alpha * 1000) / 1000})`;
};

export const ShinyText = ({
  text,
  children,
  color = "#a1a1aa",
  shineColor = "#ffffff",
  speed = 2,
  delay = 0,
  angle = 120,
  shineWidth = 40,
  softness = 0.8,
  bands = 1,
  glow = 0,
  direction = "left",
  easing = "smooth",
  trigger = "loop",
  yoyo = false,
  followPointer = false,
  pauseOnHover = false,
  disabled = false,
  className = "",
  style,
}: ShinyTextProps) => {
  const rootRef = useRef<HTMLSpanElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);
  const settingsRef = useRef<Settings | null>(null);
  const syncRef = useRef<(() => void) | null>(null);
  const content = children ?? text;

  useEffect(() => {
    settingsRef.current = {
      color,
      shineColor,
      speed: Math.max(0.1, speed),
      delay: Math.max(0, delay),
      angle,
      shineWidth: clamp(shineWidth, 2, 200),
      softness: clamp(softness, 0, 1),
      bands: clamp(Math.round(bands), 1, 3),
      glow: clamp(glow, 0, 1),
      sign: direction === "right" ? 1 : -1,
      ease: EASINGS[easing as Easing] ?? EASINGS.smooth,
      trigger: TRIGGERS.includes(trigger as Trigger) ? (trigger as Trigger) : "loop",
      yoyo,
      followPointer,
      pauseOnHover,
      disabled,
    };
    syncRef.current?.();
  });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let stops: string[] = [];
    let raf = 0;
    let alive = true;

    const build = (s: Settings) => {
      const parsedColor = parseColor(s.color) ?? [161, 161, 170, 1];
      const parsedShine = parseColor(s.shineColor) ?? [255, 255, 255, 1];
      const edge = blend(parsedColor, parsedShine, 0);
      const half = s.shineWidth / 2;
      const count = Math.max(1, s.bands);
      const gap = count > 1 ? (s.shineWidth * 1.5) / (count - 1) : 0;
      const span = (count - 1) * gap;
      const list: string[] = [];
      list.push(`${edge} 0%`);

      for (let b = 0; b < count; b++) {
        const center = -span / 2 + b * gap;
        const left = center - half;
        const right = center + half;
        for (let i = 0; i < FALLOFF.length; i++) {
          const t = FALLOFF[i];
          const w = Math.pow(1 - t, 0.5 + s.softness * 2.5);
          list.push(`${blend(parsedColor, parsedShine, w)} ${(left + half * t).toFixed(2)}%`);
        }
        for (let i = FALLOFF.length - 1; i >= 0; i--) {
          const t = FALLOFF[i];
          const w = Math.pow(1 - t, 0.5 + s.softness * 2.5);
          list.push(`${blend(parsedColor, parsedShine, w)} ${(right - half * t).toFixed(2)}%`);
        }
      }

      list.push(`${edge} 100%`);
      stops = list;
    };

    const paintGradient = (s: Settings, pos: number) => {
      const offset = (pos - 50) * 2;
      const grad = `linear-gradient(${s.angle}deg, ${stops
        .map((stop, idx) => {
          if (idx === 0) return `${s.color} 0%`;
          if (idx === stops.length - 1) return `${s.color} 100%`;
          const base = (idx / (stops.length - 1)) * 100;
          return `${stop.split(" ")[0]} ${(base + offset).toFixed(2)}%`;
        })
        .join(", ")})`;

      root.style.backgroundImage = grad;
      root.style.setProperty("-webkit-background-image", grad);

      if (glowRef.current && s.glow > 0) {
        glowRef.current.style.opacity = String(s.glow * (1 - Math.abs(pos - 50) / 50));
      }
    };

    const loop = (now: number) => {
      if (!alive) return;
      const s = settingsRef.current;
      if (!s || s.disabled || reduce) return;

      const progress = ((now / (s.speed * 1000)) % 1) * 100;
      paintGradient(s, progress);
      raf = requestAnimationFrame(loop);
    };

    const s = settingsRef.current;
    if (s) {
      build(s);
      raf = requestAnimationFrame(loop);
    }

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <span
      ref={rootRef}
      className={cn(
        "relative inline-block bg-clip-text text-transparent font-medium transition-colors",
        className
      )}
      style={{
        backgroundColor: color,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        ...style,
      }}
    >
      {content}
    </span>
  );
};

export default ShinyText;
