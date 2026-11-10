"use client";

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
    title: "SWARA Developer",
    company: "SWARA ($80k-$90k + 10%)",
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
    title: "Full Stack Engineer",
    company: "Next.js & Node",
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
    title: "Frontend Architect",
    company: "React & Systems",
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
    title: "AI Engineer",
    company: "LLMs & Agents",
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
    <div className="w-full rounded-2xl border border-[#2f293a] bg-[#1b1722]/90 p-5 backdrop-blur-xl transition-all">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-white">Job Description</h2>
        <span className="text-[11px] text-[#b497cf] font-mono">
          {value.length} / 5000
        </span>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, 5000))}
        disabled={isLoading}
        rows={6}
        placeholder="Paste job description here..."
        className="w-full rounded-xl border border-[#2f293a] bg-[#120f17] p-3 text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-[#a855f7] transition-all font-sans leading-relaxed mb-3.5"
      />

      {/* Sample jobs */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[11px] text-[#b497cf]">Samples:</span>
        {SAMPLE_JOBS.map((job) => {
          const isSwara = job.id === "swara-dev";
          return (
            <button
              key={job.id}
              type="button"
              onClick={() => onSampleJobSelect(job.description)}
              disabled={isLoading}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                isSwara
                  ? "bg-[#a855f7]/15 border-[#a855f7]/40 text-[#d8b4fe] hover:bg-[#a855f7]/25"
                  : "bg-[#120f17] border-[#2f293a] text-zinc-300 hover:text-white hover:border-[#a855f7]/30"
              }`}
            >
              {job.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}
