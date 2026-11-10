"use client";

import { Briefcase, Sparkles, Building2, Star } from "lucide-react";
import type { SampleJob } from "@/types/analysis";

interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
  onSampleJobSelect: (description: string) => void;
  isLoading?: boolean;
}

export const SAMPLE_JOBS: SampleJob[] = [
  {
    id: "swara-dev",
    title: "SWARA Software Developer",
    company: "SWARA ($80k-$90k + 10% equity)",
    description: `Company: SWARA (San Francisco, CA - Hybrid/Remote)
Role: Software Developer ($80k - $90k base + 10% equity)

About Us:
SWARA is building next-generation intelligent career acceleration software and AI automation workflows in San Francisco.

Requirements:
- 3+ years of professional software engineering experience with React and TypeScript.
- Strong hands-on expertise with Next.js (App Router, Server Components, API routes).
- Proven experience integrating AI/LLM models (OpenAI, Gemini API, Anthropic) with structured output.
- Backend proficiency with Node.js, RESTful architectures, and SQL (PostgreSQL or SQLite).
- Solid grasp of modern CSS systems (Tailwind CSS) and responsive micro-interactions.
- Experience with Docker, Git version control, and Vercel/cloud deployments.
- High velocity, self-directed mindset, and obsession with exceptional UX/UI quality.

Bonus Qualifications:
- Experience with vector databases (Pinecone, Chroma) and RAG pipelines.
- Knowledge of LangChain or semantic caching frameworks.
- Previous experience in an early-stage high-growth startup environment.`,
  },
  {
    id: "nextjs-fullstack",
    title: "Next.js Full Stack Engineer",
    company: "Vercel Ecosystem Partner",
    description: `Role: Full Stack Next.js Engineer (Remote)

Responsibilities:
- Build and maintain scalable web applications utilizing Next.js 15, React 19, and TypeScript.
- Design resilient backend microservices with Node.js, Prisma ORM, and PostgreSQL.
- Implement robust caching layers using Redis and Edge runtime middlewares.
- Optimize Web Vitals (LCP, FID, CLS) and server-side streaming render performance.
- Write unit, integration, and E2E tests using Jest, Vitest, and Playwright.

Requirements:
- 4+ years of full-stack web development experience.
- Deep knowledge of TypeScript (strict typing, zero-any policy).
- Proven track record with CI/CD GitHub Actions and automated Vercel preview environments.
- Excellent communication and asynchronous collaboration skills.`,
  },
  {
    id: "senior-frontend",
    title: "Senior Frontend Architect",
    company: "Fintech Platform",
    description: `Role: Senior Frontend Architect / Lead Engineer

Key Expectations:
- Lead design system architecture and frontend performance across high-traffic apps.
- Architect complex client state management using Zustand, Jotai, or React Query.
- Ensure strict adherence to WCAG 2.1 AA accessibility and cross-browser resilience.
- Mentor junior and mid-level engineers through rigorous code reviews and engineering RFCs.

Qualifications:
- 5+ years building production React & TypeScript applications at scale.
- Expert understanding of CSS architecture, Tailwind CSS, and Framer Motion micro-interactions.
- Experience with WebSockets, real-time data streaming, and client-side telemetry.`,
  },
  {
    id: "ai-engineer",
    title: "AI & LLM Systems Engineer",
    company: "Applied AI Labs",
    description: `Role: AI & LLM Systems Engineer

What You Will Do:
- Architect production-grade agentic workflows and deterministic LLM evaluation pipelines.
- Build low-latency RAG architectures utilizing vector stores, embedding models, and hybrid search.
- Fine-tune and benchmark open-source and proprietary models (Gemini, Claude, Llama 3).
- Deploy scalable Python and Node.js inference APIs using FastAPI and containerized microservices.

Requirements:
- 3+ years in AI/ML software engineering with Python and TypeScript.
- Hands-on experience with embeddings, vector search (Pinecone, pgvector), and prompt tuning.
- Strong foundation in linear algebra, probability, and algorithmic optimization.`,
  },
];

export function JobDescriptionInput({
  value,
  onChange,
  onSampleJobSelect,
  isLoading = false,
}: JobDescriptionInputProps) {
  return (
    <div className="w-full rounded-2xl border border-[#2f293a] bg-[#1b1722]/90 p-5 md:p-6 backdrop-blur-2xl shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-all hover:border-[#a855f7]/40">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 border-b border-[#2f293a] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#a855f7]/15 text-[#c084fc] border border-[#a855f7]/30">
            <Briefcase className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-wide">Target Job Description</h2>
            <p className="text-[11px] text-[#b497cf]">Extracted key requirements and qualifications</p>
          </div>
        </div>
        <span className="text-xs text-[#b497cf] font-mono">
          {value.length} / 5000 chars
        </span>
      </div>

      {/* Textarea */}
      <div className="relative mb-5">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value.slice(0, 5000))}
          disabled={isLoading}
          rows={8}
          placeholder="Paste the target job description here (responsibilities, technical requirements, qualifications, company info)..."
          className="w-full rounded-xl border border-[#2f293a] bg-[#120f17]/80 p-4 text-sm text-zinc-200 placeholder:text-[#554c5e] focus:outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7] transition-all font-sans leading-relaxed"
        />
      </div>

      {/* Demo sample jobs selector */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#d8b4fe] mb-2.5">
          <Sparkles className="w-3.5 h-3.5 text-[#a855f7]" />
          <span>Quick Demo: Load verified benchmark job descriptions:</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {SAMPLE_JOBS.map((job) => {
            const isSwara = job.id === "swara-dev";
            return (
              <button
                key={job.id}
                type="button"
                onClick={() => onSampleJobSelect(job.description)}
                disabled={isLoading}
                className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all group ${
                  isSwara
                    ? "border-[#a855f7]/60 bg-[#a855f7]/10 hover:border-[#a855f7] hover:bg-[#a855f7]/20 shadow-[0_0_20px_rgba(168,85,247,0.15)]"
                    : "border-[#2f293a] bg-[#120f17]/60 hover:border-[#a855f7]/40 hover:bg-[#120f17]"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className={`text-xs font-bold truncate ${isSwara ? "text-[#e2c9ff]" : "text-zinc-200 group-hover:text-white"}`}>
                    {job.title}
                  </span>
                  {isSwara && (
                    <span className="flex items-center gap-1 text-[9px] font-black px-1.5 py-0.5 rounded-full bg-[#a855f7]/30 text-[#e2c9ff] border border-[#a855f7]/50">
                      <Star className="w-2.5 h-2.5 fill-current" /> TARGET
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-[#b497cf] truncate w-full">
                  <Building2 className="w-3 h-3 shrink-0 text-[#a855f7]" />
                  <span className="truncate">{job.company}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
