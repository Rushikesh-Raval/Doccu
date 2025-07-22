require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Use this stable model
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Agent 1: Summarizer
 */
async function summarizeWithGemini(text) {
  try {
    const result = await model.generateContent(text);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("❌ Gemini Summarizer Error:", error);
    throw error;
  }
}

/**
 * Agent 2: Risk Detector
 */
async function detectRisksWithGemini(text) {
  const riskPrompt = `You are a document risk detector. Read the following document and list any hidden clauses, misleading statements, or confusing terms that could harm the user. Explain in simple terms why each one is risky:\n\n${text}`;

  return await summarizeWithGemini(riskPrompt);
}

/**
 * Agent 3: Tone Analyzer
 */
// async function analyzeToneWithGemini(text) {
//   const tonePrompt = `You are a tone and language analyst. Read this document and describe the tone (e.g., friendly, legal-heavy, technical, threatening, helpful). Also mention if it's easy to understand for an average person:\n\n${text}`;

//   return await summarizeWithGemini(tonePrompt);
// }

/**Agent 4: Tutor**/
async function explainSimplyWithGemini(text) {
  const simplePrompt = `You are a helpful AI tutor. Rewrite the following document in very simple and beginner-friendly language, like you're explaining it to a 10th grader:\n\n${text}`;
  return await summarizeWithGemini(simplePrompt);
}

// Action Suggestion---
async function suggestActionsWithGemini(text) {
  const prompt = `You are a helpful assistant. Read the document below and suggest what actions a person should take after reading it. 
Give clear, actionable advice in bullet points:\n\n${text}`;
  return await summarizeWithGemini(prompt);
}
// Chat Box---
async function answerQuestionWithGemini(text, userQuestion) {
  const prompt = `You are a helpful assistant. Use only the information from the following document to answer the user's question. 

Document:
${text}

User Question:
${userQuestion}

Answer in a clear and concise way. If the answer isn't in the document, say "I cannot answer this, please ask something about the document."`;

  return await summarizeWithGemini(prompt);
}



module.exports = {
  summarizeWithGemini,
  detectRisksWithGemini,
  // analyzeToneWithGemini,
  explainSimplyWithGemini,
  suggestActionsWithGemini,
  answerQuestionWithGemini,
 
};
