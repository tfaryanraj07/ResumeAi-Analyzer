const { GoogleGenAI } = require("@google/genai");
const env = require("../config/env");

// Models to try in order of preference if one is rate-limited or unavailable
const CANDIDATE_MODELS = [
  "gemini-2.5-flash",
  "gemini-1.5-flash",
  "gemini-2.0-flash",
];

const getAiClient = () => {
  const apiKey = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is not configured in the server environment. Please set GEMINI_API_KEY in your .env file or deployment settings."
    );
  }
  return new GoogleGenAI({ apiKey });
};

/**
 * Extracts and parses JSON from model output, handling potential markdown fences or surrounding prose.
 */
const parseCleanJson = (rawText) => {
  if (!rawText || typeof rawText !== "string") {
    throw new Error("Empty response received from Gemini.");
  }

  let text = rawText.trim();

  // Strip markdown code fences if present: ```json ... ``` or ``` ... ```
  const codeBlockRegex = /```(?:json)?\s*([\s\S]*?)\s*```/i;
  const match = text.match(codeBlockRegex);
  if (match && match[1]) {
    text = match[1].trim();
  }

  // Find outermost JSON object braces { ... }
  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");

  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    text = text.substring(firstBrace, lastBrace + 1);
  }

  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("Failed to parse Gemini JSON output. Raw text:", rawText);
    throw new Error("Gemini returned a response that could not be parsed as JSON.");
  }
};

const analyzeResume = async (resumeText) => {
  if (!resumeText || resumeText.trim().length < 30) {
    throw new Error(
      "Insufficient text extracted from the resume. Please ensure the uploaded file contains selectable text and is not an empty or image-only scanned document."
    );
  }

  const ai = getAiClient();

  const prompt = `
You are an expert ATS (Applicant Tracking System) Auditor and Executive Career Coach.

Carefully evaluate the following resume text for ATS readability, keyword strength, measurable achievements, structural clarity, and formatting impact.

Return ONLY a valid JSON object matching the exact structure below:
{
  "atsScore": 0,
  "skills": ["string"],
  "missingSkills": ["string"],
  "strengths": ["string"],
  "weaknesses": ["string"],
  "summary": "string",
  "suggestions": ["string"],
  "interviewQuestions": ["string"]
}

Guidelines for the output:
- atsScore: An integer between 0 and 100 based on ATS best practices, formatting, impact metrics, and clarity.
- skills: A comprehensive list of relevant technical and professional skills detected in the resume.
- missingSkills: Crucial or in-demand skills for the candidate's target domain that are notably absent.
- strengths: Specific, actionable strengths identified in the resume (3-5 points).
- weaknesses: Clear weaknesses or red flags that could hurt ATS ranking or recruiter impression (3-5 points).
- summary: A concise, professional 2-3 sentence executive evaluation of the candidate's profile.
- suggestions: Actionable, high-impact recommendations to improve the resume and ATS score (3-5 points).
- interviewQuestions: 4-6 tailored interview questions specifically relevant to this candidate's background.

Resume Content:
${resumeText}
`;

  let lastError = null;

  for (const modelName of CANDIDATE_MODELS) {
    try {
      console.log(`[AI Service] Attempting resume analysis with model: ${modelName}`);

      const response = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.2,
        },
      });

      const rawText = response.text ? response.text.trim() : "";
      const parsed = parseCleanJson(rawText);

      // Validate core required fields
      if (typeof parsed.atsScore !== "number") {
        parsed.atsScore = Number(parsed.atsScore) || 70;
      }
      if (!Array.isArray(parsed.skills)) parsed.skills = [];
      if (!Array.isArray(parsed.missingSkills)) parsed.missingSkills = [];
      if (!Array.isArray(parsed.strengths)) parsed.strengths = [];
      if (!Array.isArray(parsed.weaknesses)) parsed.weaknesses = [];
      if (!Array.isArray(parsed.suggestions)) parsed.suggestions = [];
      if (!Array.isArray(parsed.interviewQuestions)) parsed.interviewQuestions = [];
      if (typeof parsed.summary !== "string") parsed.summary = "";

      console.log(`[AI Service] Successfully analyzed resume with model: ${modelName}`);
      return parsed;
    } catch (err) {
      console.warn(`[AI Service] Model ${modelName} failed:`, err.message);
      lastError = err;
      // Continue to next model in CANDIDATE_MODELS
    }
  }

  // If all models failed, throw the detailed error
  console.error("[AI Service] All candidate models failed. Last error:", lastError);
  throw new Error(
    `Gemini AI analysis failed: ${lastError?.message || "All Gemini models unavailable. Please check your GEMINI_API_KEY and quota."}`
  );
};

module.exports = {
  analyzeResume,
};