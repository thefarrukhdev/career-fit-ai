export interface AnalysisResult {
  matchScore: number; // 0-100
  matchedSkills: string[];
  missingKeywords: string[];
  seniorityFit: {
    level: "Junior" | "Mid" | "Senior" | "Lead" | "Unknown";
    isMatch: boolean;
    explanation: string;
  };
  recommendations: string[];
  summary: string;
  experienceYears: {
    required: string;
    detected: string;
  };
}

export interface SampleJob {
  id: string;
  title: string;
  company: string;
  description: string;
}

export type AnalysisStatus = "idle" | "parsing" | "analyzing" | "done" | "error";
