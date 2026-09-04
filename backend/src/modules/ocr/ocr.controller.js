const fs = require('fs');
const { GoogleGenAI } = require("@google/genai"); // Official Google GenAI SDK

// Initialize Gemini client (make sure GEMINI_API_KEY is in your .env)
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function extractLandRecordOCR(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No document uploaded." });
    }

    // Since multer is using diskStorage, read the file from req.file.path
    const filePath = req.file.path;
    const fileBuffer = fs.readFileSync(filePath);
    const base64Data = fileBuffer.toString("base64");
    const mimeType = req.file.mimetype;

    // Call Gemini for structured data extraction
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash', // Free tier viable & lightning fast
      contents: [
        {
          inlineData: {
            data: base64Data,
            mimeType: mimeType
          }
        },
        {
          text: "Extract land record details from this document and return strictly in JSON format with keys: ownerName, khasraNumber, village, totalArea, and confidenceScore (percentage)."
        }
      ]
    });

    // Clean up local temp file immediately after reading
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    const extractedText = response.text;
    
    // Parse JSON safely
    let parsedData;
    try {
      // Clean markdown code blocks if Gemini returns ```json ... ```
      const cleanJson = extractedText.replace(/```json/g, "").replace(/```/g, "").trim();
      parsedData = JSON.parse(cleanJson);
    } catch (e) {
      parsedData = { rawText: extractedText };
    }

    return res.status(200).json({
      success: true,
      message: "OCR extraction successful via Gemini Flash",
      data: parsedData
    });

  } catch (error) {
    console.error("OCR Error:", error);
    
    // Ensure temporary file cleanup even if error occurs
    if (req.file && req.file.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({ success: false, message: "AI extraction failed", error: error.message });
  }
}

module.exports = extractLandRecordOCR;