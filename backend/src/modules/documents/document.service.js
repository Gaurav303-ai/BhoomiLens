const fs = require('fs');
const { GoogleGenAI } = require("@google/genai");
const documentRepository = require('./document.repository');

// Initialize Gemini with API Key from .env
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const uploadDocument = async ({ user_id, file }) => {
    // 1. Save file metadata into PostgreSQL database first
    const document = await documentRepository.createDocument({
        uploaded_by: user_id,
        original_name: file.originalname,
        stored_name: file.filename,
        file_path: file.path,
        mime_type: file.mimetype,
        file_size: file.size
    });

    try {
        // 2. Read the saved file from uploads folder to pass to Gemini
        const fileBuffer = fs.readFileSync(file.path);
        const base64Data = fileBuffer.toString("base64");

        // 3. Strict Prompt for Land Records OCR
        const promptInstruction = `
            You are an expert Indian Land Record Data Extractor for the Bhoomi Lens system. 
            Analyze this land record document (Khasra/Khatauni/Jamabandi) and extract the details.
            
            Return ONLY a valid JSON object with these exact keys. Do not wrap it in markdown block like \`\`\`json:
            {
              "ownerName": "Full name of the land owner",
              "khasraNumber": "Survey or Khasra number",
              "village": "Village name",
              "totalArea": "Total land area with units e.g. 1.25 Hectares",
              "confidenceScore": 92
            }
            Make sure confidenceScore is a pure number between 1 and 100 representing how clearly you read the document.
        `;

        // 4. Call Gemini Flash Model
        // 4. Call Gemini Flash Model (Updated to gemini-3.6-flash)
        const response = await ai.models.generateContent({
            model: 'gemini-3.6-flash',
            contents: [
                {
                    inlineData: {
                        data: base64Data,
                        mimeType: file.mimetype
                    }
                },
                {
                    text: promptInstruction
                }
            ]
        });

        const rawText = response.text;
        console.log("Gemini Raw Response:", rawText);

        let parsedData;
        try {
            // Clean markdown if Gemini accidentally includes it
            const cleanJson = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
            parsedData = JSON.parse(cleanJson);
        } catch (parseError) {
            console.error("JSON Parse Error, fallback applied:", parseError);
            parsedData = {
                ownerName: "Extraction Error / Manual Check Required",
                khasraNumber: "N/A",
                village: "N/A",
                totalArea: "N/A",
                confidenceScore: 40
            };
        }

        // Determine HITL status based on confidence score
        const score = Number(parsedData.confidenceScore) || 50;
        let recordStatus = "Verified";
        if (score < 75) {
            recordStatus = "Low Confidence";
        } else if (score < 95) {
            recordStatus = "Pending Review";
        }

        // Return combined database record + OCR parsed data to the controller
        return {
            ...document,
            ocrData: parsedData,
            status: recordStatus
        };

    } catch (ocrError) {
        console.error("Gemini OCR Pipeline Failed:", ocrError);
        // Fallback so the app doesn't crash completely if AI fails
        return {
            ...document,
            ocrData: {
                ownerName: "OCR Failed",
                khasraNumber: "N/A",
                village: "N/A",
                totalArea: "N/A",
                confidenceScore: 30
            },
            status: "Low Confidence"
        };
    }
};

module.exports = {
    uploadDocument
};