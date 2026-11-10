"use client";

interface SkillsSectionProps {
  matchedSkills: string[];
  missingKeywords: string[];
}

export function SkillsSection({ matchedSkills, missingKeywords }: SkillsSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
      {/* Matched */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-4">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-medium text-zinc-300">Matched Skills</span>
          <span className="text-[10px] text-emerald-400 font-mono font-medium">{matchedSkills.length}</span>
        </div>

        {matchedSkills.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {matchedSkills.map((skill, index) => (
              <span
                key={`matched-${skill}-${index}`}
                className="px-2 py-0.5 rounded text-[11px] bg-zinc-900 border border-emerald-500/30 text-emerald-300"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-[11px] text-zinc-500">None detected.</p>
        )}
      </div>

      {/* Missing */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-4">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-medium text-zinc-300">Missing Keywords</span>
          <span className="text-[10px] text-rose-400 font-mono font-medium">{missingKeywords.length}</span>
        </div>

        {missingKeywords.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {missingKeywords.map((keyword, index) => (
              <span
                key={`missing-${keyword}-${index}`}
                className="px-2 py-0.5 rounded text-[11px] bg-zinc-900 border border-rose-500/30 text-rose-300"
              >
                {keyword}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-[11px] text-emerald-400">All matched.</p>
        )}
      </div>
    </div>
  );
}
