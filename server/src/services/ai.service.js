const { GoogleGenAI } = require("@google/genai");
const env = require("../config/env");

const ai = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});

const analyzeResume = async (resumeText) => {
  try {
    const prompt = `
You are a professional ATS Resume Analyzer.

Analyze the resume and return ONLY valid JSON.

Do not write explanations.
Do not use markdown.
Do not wrap the JSON in \`\`\`.

Return exactly this structure:

{
  "atsScore": 0,
  "skills": [],
  "missingSkills": [],
  "strengths": [],
  "weaknesses": [],
  "summary": "",
  "suggestions": [],
  "interviewQuestions": []
}

Resume:

${resumeText}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    const text = response.text.trim();

    // Remove markdown if Gemini returns ```json ... ```
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    try {
  return JSON.parse(cleaned);
} catch (err) {
  console.error("Invalid JSON returned by Gemini");
  console.log(cleaned);

  throw new Error("Gemini returned invalid JSON.");
}

  } catch (error) {
    console.error("AI Error:", error);
    throw error;
  }
};

module.exports = {
  analyzeResume,
};