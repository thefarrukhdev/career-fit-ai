import type { AnalysisResult } from "@/types/analysis";

const KNOWN_SKILLS = [
  "JavaScript", "TypeScript", "React", "React.js", "Node.js", "Python",
  "SQL", "PostgreSQL", "MySQL", "MongoDB", "Redis", "AWS", "GCP", "Azure",
  "Docker", "Kubernetes", "Git", "GraphQL", "REST", "RESTful",
  "Next.js", "Vue.js", "Angular", "Svelte", "Express", "FastAPI", "Flask",
  "Django", "Spring", "Java", "C#", ".NET", "Go", "Rust", "PHP",
  "HTML", "CSS", "Tailwind", "SCSS", "Sass",
  "TensorFlow", "PyTorch", "Pandas", "NumPy", "scikit-learn",
  "LangChain", "OpenAI", "Gemini", "LLM", "RAG", "Vector databases",
  "Prisma", "tRPC", "Zustand", "Redux", "Jest", "Playwright", "Cypress",
  "GitHub Actions", "CI/CD", "Linux", "Bash", "Terraform", "Ansible",
  "Figma", "Accessibility", "WCAG", "WebSockets", "gRPC",
  "Microservices", "Serverless", "Firebase", "Supabase",
  "Pinecone", "Weaviate", "Chroma", "Elasticsearch",
  "Kafka", "RabbitMQ", "Celery", "Airflow",
];

function extractSkillsFromText(text: string): string[] {
  const lowerText = text.toLowerCase();
  return KNOWN_SKILLS.filter((skill) =>
    lowerText.includes(skill.toLowerCase())
  );
}

function detectExperienceYears(text: string): string {
  const patterns = [
    /(\d+)\+?\s+years?\s+(?:of\s+)?(?:experience|exp)/gi,
    /(?:experience|exp)\s+(?:of\s+)?(\d+)\+?\s+years?/gi,
  ];

  for (const pattern of patterns) {
    const match = pattern.exec(text);
    if (match?.[1]) {
      return `${match[1]}+ years`;
    }
  }
  return "Not specified";
}

function detectSeniority(
  resumeText: string,
  jobText: string
): AnalysisResult["seniorityFit"] {
  const lowerResume = resumeText.toLowerCase();
  const lowerJob = jobText.toLowerCase();

  const seniorityLevels: Array<AnalysisResult["seniorityFit"]["level"]> = [
    "Lead", "Senior", "Mid", "Junior",
  ];
  let detectedFromJob: AnalysisResult["seniorityFit"]["level"] = "Unknown";

  for (const level of seniorityLevels) {
    if (lowerJob.includes(level.toLowerCase())) {
      detectedFromJob = level;
      break;
    }
  }

  let detectedFromResume: AnalysisResult["seniorityFit"]["level"] = "Unknown";
  for (const level of seniorityLevels) {
    if (lowerResume.includes(level.toLowerCase())) {
      detectedFromResume = level;
      break;
    }
  }

  // Check years of experience
  const expMatch = /(\d+)\+?\s+years?/i.exec(resumeText);
  const years = expMatch ? parseInt(expMatch[1], 10) : 0;

  if (detectedFromResume === "Unknown" && years > 0) {
    if (years >= 7) detectedFromResume = "Lead";
    else if (years >= 5) detectedFromResume = "Senior";
    else if (years >= 2) detectedFromResume = "Mid";
    else detectedFromResume = "Junior";
  }

  const isMatch = detectedFromJob === "Unknown" ||
    detectedFromResume === "Unknown" ||
    detectedFromJob === detectedFromResume ||
    (detectedFromJob === "Mid" && detectedFromResume === "Senior") ||
    (detectedFromJob === "Senior" && detectedFromResume === "Lead");

  const explanation = detectedFromJob === "Unknown"
    ? `No specific seniority level detected in job description. Your resume shows ${detectedFromResume} level experience.`
    : `Job requires ${detectedFromJob} level. Your profile indicates ${detectedFromResume} level.`;

  return {
    level: detectedFromJob === "Unknown" ? detectedFromResume : detectedFromJob,
    isMatch,
    explanation,
  };
}

export async function mockAnalyze(
  resumeText: string,
  jobDescription: string
): Promise<AnalysisResult> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const resumeSkills = extractSkillsFromText(resumeText);
  const jobSkills = extractSkillsFromText(jobDescription);

  const matchedSkills = resumeSkills.filter((skill) =>
    jobSkills.some((js) => js.toLowerCase() === skill.toLowerCase())
  );

  const missingKeywords = jobSkills.filter(
    (skill) =>
      !resumeSkills.some((rs) => rs.toLowerCase() === skill.toLowerCase())
  );

  const matchScore =
    jobSkills.length === 0
      ? 50
      : Math.min(
          100,
          Math.round((matchedSkills.length / jobSkills.length) * 100)
        );

  const experienceRequired = detectExperienceYears(jobDescription);
  const experienceDetected = detectExperienceYears(resumeText);

  const seniorityFit = detectSeniority(resumeText, jobDescription);

  const recommendations: string[] = [
    missingKeywords.length > 0
      ? `Add these missing keywords to your resume: ${missingKeywords.slice(0, 3).join(", ")}.`
      : "Your skill set aligns well with the job requirements.",
    "Quantify your achievements with specific metrics (e.g., 'Reduced load time by 40%').",
    "Tailor your professional summary to mirror the job description language.",
    "Add specific project examples that demonstrate the required technical skills.",
    matchScore < 60
      ? "Consider taking online courses to bridge the skill gaps identified."
      : "Highlight leadership and collaboration experiences to strengthen your application.",
    "Ensure your GitHub profile showcases relevant projects for this role.",
  ];

  const summary =
    matchScore >= 70
      ? `Your resume is a strong match for this position with ${matchScore}% alignment. You have most of the required skills, and your experience level aligns well with the job requirements.`
      : matchScore >= 40
      ? `Your resume shows partial alignment (${matchScore}%) with this position. While you have some relevant skills, there are key areas to address before applying.`
      : `Your resume shows limited alignment (${matchScore}%) with this position. Significant upskilling or resume tailoring may be needed to be competitive for this role.`;

  return {
    matchScore,
    matchedSkills: matchedSkills.length > 0 ? matchedSkills : ["Communication", "Problem Solving"],
    missingKeywords: missingKeywords.length > 0 ? missingKeywords : [],
    seniorityFit,
    recommendations,
    summary,
    experienceYears: {
      required: experienceRequired,
      detected: experienceDetected,
    },
  };
}
