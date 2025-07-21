const express = require("express");
const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const {
  summarizeWithGemini,
  detectRisksWithGemini,
  // analyzeToneWithGemini,
  explainSimplyWithGemini,
  suggestActionsWithGemini,
   answerQuestionWithGemini,/////
} = require("../utils/gemini");

const router = express.Router();
const upload = multer({ dest: "uploads/" })
let lastUploadedText = "";/////

router.post("/upload", upload.single("pdfFile"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    console.log("✅ File uploaded:", req.file);
    const buffer = fs.readFileSync(req.file.path);
    console.log("✅ File read into buffer");

    const pdfData = await pdfParse(buffer);
    const text = pdfData.text;
    console.log("✅ PDF parsed");
    lastUploadedText = text;//////

    // 🔹 Agent 1: Short summary (as table of contents-style bullet points)
    const summaryPrompt = `You are a smart AI. Summarize the document below by identifying only the key important sections or points a reader should pay attention to. 
Respond in short bullet points like a table of contents. 
Do not explain everything,just explain in one line or two lines max if hardly needed, just list the points:\n\n${text}`;
    const summary = await summarizeWithGemini(summaryPrompt);

    // 🔹 Agent 2: Risk Detector
    const risks = await detectRisksWithGemini(text);

    // // 🔹 Agent 3: Tone Analyzer
    // const tone = await analyzeToneWithGemini(text);

    // 🔹 Agent 4: 5th-grade-level explanation
    const simpleExplanation = await explainSimplyWithGemini(text);

    // Agent 5: Action Suggestions
    const actionSuggestions = await suggestActionsWithGemini(text);



    res.json({ summary, risks, simpleExplanation, actionSuggestions });
  } catch (error) {
    console.error("❌ Backend error:", error.message);
    res.status(500).json({ message: "Failed to analyze PDF" });
  }
});
////////
router.post("/ask", async (req, res) => {
  const { question } = req.body;
  if (!lastUploadedText) return res.status(400).json({ message: "No document uploaded yet." });
  if (!question) return res.status(400).json({ message: "No question provided." });

  try {
    const answer = await answerQuestionWithGemini(lastUploadedText, question);
    res.json({ answer });
  } catch (err) {
    console.error("❌ Question error:", err.message);
    res.status(500).json({ message: "Failed to answer question" });
  }
});

module.exports = router;
