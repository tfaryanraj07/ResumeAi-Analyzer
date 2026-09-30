const { GoogleGenAI } = require("@google/genai");
const env = require("../config/env");

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

const validateAnalysisResult = (parsed) => {
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
  return parsed;
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

  const errors = [];

  // ==========================================
  // Strategy 1: Modern Interactions API (Required for Gemini 3.8 Flash)
  // ==========================================
  if (ai.interactions && typeof ai.interactions.create === "function") {
    for (const model of ["gemini-3.8-flash", "models/gemini-3.8-flash"]) {
      try {
        console.log(`[AI Service] Attempting Interactions API with model: ${model}`);
        const interaction = await ai.interactions.create({
          model,
          input: prompt,
        });

        const outputText =
          interaction.output_text ||
          (typeof interaction.output === "string" ? interaction.output : "") ||
          (interaction.outputs && interaction.outputs[0]?.text) ||
          "";

        if (outputText) {
          console.log(`[AI Service] Successfully analyzed with Interactions API (${model})`);
          return validateAnalysisResult(parseCleanJson(outputText));
        }
      } catch (err) {
        console.warn(`[AI Service] Interactions API (${model}) failed:`, err.message);
        errors.push(`Interactions API (${model}): ${err.message}`);
      }
    }
  }

  // ==========================================
  // Strategy 2: Dynamic Models List Discovery
  // ==========================================
  let dynamicModels = [];
  try {
    const pager = await ai.models.list();
    if (pager && pager.page && Array.isArray(pager.page)) {
      dynamicModels = pager.page
        .map((m) => m.name || m.id || "")
        .filter(Boolean);
      console.log("[AI Service] Dynamically discovered models:", dynamicModels);
    }
  } catch (err) {
    console.warn("[AI Service] Models.list failed:", err.message);
  }

  // Combine discovered models with candidates
  const candidateModels = Array.from(
    new Set([
      "gemini-3.8-flash",
      "models/gemini-3.8-flash",
      ...dynamicModels,
      "gemini-2.5-flash",
      "models/gemini-2.5-flash",
      "gemini-2.0-flash",
      "gemini-1.5-flash",
    ])
  );

  // ==========================================
  // Strategy 3: generateContent with candidate models
  // ==========================================
  for (const modelName of candidateModels) {
    try {
      console.log(`[AI Service] Attempting generateContent with model: ${modelName}`);

      const response = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.2,
        },
      });

      const rawText = response.text ? response.text.trim() : "";
      if (rawText) {
        console.log(`[AI Service] Successfully analyzed resume with model: ${modelName}`);
        return validateAnalysisResult(parseCleanJson(rawText));
      }
    } catch (err) {
      console.warn(`[AI Service] Model ${modelName} failed:`, err.message);
      errors.push(`${modelName}: ${err.message}`);
    }
  }

  console.error("[AI Service] All strategies failed:", errors);
  // Pick the most helpful error message to return to the user
  const primaryError = errors.find((e) => !e.includes("not found")) || errors[0] || "Unknown error";
  throw new Error(`Gemini AI analysis failed: ${primaryError}`);
};

module.exports = {
  analyzeResume,
};