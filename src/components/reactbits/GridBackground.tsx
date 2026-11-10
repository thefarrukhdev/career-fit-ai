'use client';

import React, { useEffect, useRef, useState } from 'react';

export interface GridBackgroundProps {
  gridSize?: number;
  gridColor?: string;
  glowColor?: string;
  className?: string;
}

export function GridBackground({
  gridSize = 36,
  gridColor = 'rgba(255, 255, 255, 0.04)',
  glowColor = 'rgba(16, 185, 129, 0.15)',
  className = '',
}: GridBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      setPointer({
        x: e.clientX,
        y: e.clientY + window.scrollY,
        active: true,
      });
    };

    const handlePointerLeave = () => {
      setPointer((prev) => ({ ...prev, active: false }));
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#050505] ${className}`}
    >
      {/* Ambient Top Glow Orbs (Emerald & Cyan & Violet) */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-emerald-500/12 via-emerald-500/4 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] -left-32 w-[500px] h-[500px] bg-cyan-500/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[45%] -right-32 w-[550px] h-[550px] bg-purple-500/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* SVG Pattern Grid */}
      <svg
        className="absolute inset-0 w-full h-full opacity-70"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="reactbits-grid-pattern"
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
              fill="none"
              stroke={gridColor}
              strokeWidth="1"
            />
            {/* Subtle Intersection Dot */}
            <circle
              cx="0"
              cy="0"
              r="0.75"
              fill="rgba(255, 255, 255, 0.15)"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#reactbits-grid-pattern)" />
      </svg>

      {/* Interactive Cursor Spotlight Glow */}
      {pointer.active && (
        <div
          className="absolute rounded-full transition-opacity duration-300 pointer-events-none"
          style={{
            left: `${pointer.x}px`,
            top: `${pointer.y}px`,
            width: '480px',
            height: '480px',
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle, ${glowColor} 0%, rgba(6, 182, 212, 0.05) 40%, transparent 70%)`,
            filter: 'blur(30px)',
          }}
        />
      )}

      {/* Radial Vignette Mask */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 20%, transparent 20%, #050505 90%)',
        }}
      />
    </div>
  );
}

export default GridBackground;
