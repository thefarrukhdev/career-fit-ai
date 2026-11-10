import { NextRequest, NextResponse } from "next/server";
import { analyzeWithGemini } from "@/lib/gemini";
import { mockAnalyze } from "@/lib/mock-analyzer";
import { parsePDF } from "@/lib/pdf-parser";

export const maxDuration = 30; // Max allowed execution time for Vercel Serverless

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const resumeFile = formData.get("resume");
    const jobDescription = formData.get("jobDescription");

    if (!jobDescription || typeof jobDescription !== "string") {
      return NextResponse.json(
        { error: "Job description is required" },
        { status: 400 }
      );
    }

    if (!resumeFile) {
      return NextResponse.json(
        { error: "Resume is required" },
        { status: 400 }
      );
    }

    let resumeText: string;

    if (resumeFile instanceof File) {
      const buffer = await resumeFile.arrayBuffer();

      if (resumeFile.type === "application/pdf" || resumeFile.name.endsWith(".pdf")) {
        resumeText = await parsePDF(buffer);
      } else {
        // Plain text file
        resumeText = new TextDecoder().decode(buffer);
      }
    } else {
      // It's already a string (pasted text)
      resumeText = resumeFile as string;
    }

    if (!resumeText.trim()) {
      return NextResponse.json(
        { error: "Could not extract text from resume" },
        { status: 400 }
      );
    }

    // Try Gemini first with a 7-second timeout, fall back to mock
    let result;
    try {
      const geminiTimeout = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Gemini API call timed out after 7s")), 7000)
      );
      result = await Promise.race([
        analyzeWithGemini(resumeText, jobDescription),
        geminiTimeout,
      ]);
    } catch (geminiError) {
      console.warn(
        "Gemini API unavailable or timed out, falling back to mock analyzer:",
        geminiError instanceof Error ? geminiError.message : "Unknown error"
      );
      result = await mockAnalyze(resumeText, jobDescription);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error
          ? error.message
          : "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}
