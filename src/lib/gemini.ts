import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import type { AnalysisResult } from "@/types/analysis";

const AnalysisSchema = z.object({
  matchScore: z.number().min(0).max(100),
  matchedSkills: z.array(z.string()),
  missingKeywords: z.array(z.string()),
  seniorityFit: z.object({
    level: z.enum(["Junior", "Mid", "Senior", "Lead", "Unknown"]),
    isMatch: z.boolean(),
    explanation: z.string(),
  }),
  recommendations: z.array(z.string()),
  summary: z.string(),
  experienceYears: z.object({
    required: z.string(),
    detected: z.string(),
  }),
});

export async function analyzeWithGemini(
  resumeText: string,
  jobDescription: string
): Promise<AnalysisResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY not configured");
  }

  const client = new GoogleGenAI({ apiKey });

  const prompt = `You are an expert ATS (Applicant Tracking System) analyzer. Analyze this resume against the job description and return a detailed assessment.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Analyze and return a JSON object with:
- matchScore: integer 0-100 (how well the resume matches the job)
- matchedSkills: array of skills/keywords present in both resume AND job description
- missingKeywords: array of important skills/keywords from job description NOT found in resume
- seniorityFit: { level: "Junior"|"Mid"|"Senior"|"Lead"|"Unknown", isMatch: boolean, explanation: string }
- recommendations: array of 4-6 specific, actionable improvements to tailor resume for this job
- summary: 2-3 sentence overall assessment
- experienceYears: { required: string (from job desc), detected: string (from resume) }

Be thorough, specific, and accurate. Focus on technical skills, tools, frameworks, and domain knowledge.`;

  const interaction = await client.interactions.create({
    model: "gemini-3.8-flash",
    input: prompt,
    store: false,
    response_format: {
      type: "text",
      mime_type: "application/json",
    },
    generation_config: {
      temperature: 0.1,
    },
  });

  const rawText = interaction.output_text;
  if (!rawText) throw new Error("Empty response from Gemini");

  const parsed: unknown = JSON.parse(rawText);
  return AnalysisSchema.parse(parsed) as AnalysisResult;
}
