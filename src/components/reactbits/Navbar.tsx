"use client";

export function Navbar() {
  return (
    <nav className="w-full max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-white tracking-tight text-sm">CareerFit</span>
      </div>

      <a
        href="https://github.com/thefarrukhdev/career-fit-ai"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-zinc-400 hover:text-white transition-colors"
      >
        GitHub ↗
      </a>
    </nav>
  );
}
