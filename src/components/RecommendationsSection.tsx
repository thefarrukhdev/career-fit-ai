"use client";

interface RecommendationsSectionProps {
  recommendations: string[];
}

export function RecommendationsSection({ recommendations }: RecommendationsSectionProps) {
  return (
    <div className="w-full rounded-xl border border-zinc-800 bg-zinc-900/30 p-4">
      <h3 className="text-xs font-medium text-zinc-300 mb-2.5">
        Recommendations
      </h3>

      <div className="space-y-1.5">
        {recommendations.map((rec, index) => (
          <div
            key={`rec-${index}`}
            className="flex items-start gap-2 p-2.5 rounded-lg border border-zinc-800/80 bg-zinc-950/40 text-xs text-zinc-300 leading-relaxed"
          >
            <span className="font-mono text-zinc-500 font-medium text-[11px] mt-0.5">{index + 1}.</span>
            <span className="flex-1">{rec}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
