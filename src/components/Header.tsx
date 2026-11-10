"use client";

export function Header() {
  return (
    <header className="text-center pt-6 pb-10 px-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-2 font-sans">
        ATS Resume Matcher
      </h1>
      <p className="text-sm text-zinc-400 max-w-md mx-auto font-sans">
        Compare your resume against any job description for keyword gaps and match scoring.
      </p>
    </header>
  );
}
