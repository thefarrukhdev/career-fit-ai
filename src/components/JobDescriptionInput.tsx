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
    title: "SWARA",
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
    title: "Full Stack",
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
    title: "Frontend",
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
    <div className="w-full h-full flex flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 transition-all">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-zinc-300">Job Description</span>
          <span className="text-[10px] text-zinc-500 font-mono">
            {value.length} / 5000
          </span>
        </div>

        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value.slice(0, 5000))}
          disabled={isLoading}
          placeholder="Paste job description here..."
          className="w-full h-48 rounded-lg border border-zinc-800 bg-zinc-950/50 p-3 text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700 font-sans resize-none leading-relaxed"
        />
      </div>

      {/* Samples */}
      <div className="flex items-center gap-1.5 pt-3">
        <span className="text-[11px] text-zinc-500 mr-1">Samples:</span>
        {SAMPLE_JOBS.map((job) => {
          const isSwara = job.id === "swara-dev";
          return (
            <button
              key={job.id}
              type="button"
              onClick={() => onSampleJobSelect(job.description)}
              disabled={isLoading}
              className={`px-2 py-0.5 rounded text-[11px] border transition-all ${
                isSwara
                  ? "bg-zinc-800 border-zinc-700 text-white font-medium hover:bg-zinc-700"
                  : "bg-zinc-900/50 border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
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
