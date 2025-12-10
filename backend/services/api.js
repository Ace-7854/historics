import { GoogleGenAI } from "@google/genai";
import { loadScriptPathway } from "../controllers/chatController.js";

console.log("Loaded GOOGLE_API_KEY:", process.env.GOOGLE_API_KEY); // DEBUG

if (!process.env.GOOGLE_API_KEY) {
  throw new Error("GOOGLE_API_KEY is missing from .env");
}

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

function gettingSysPrompt() {
  const scriptPathway = loadScriptPathway();
  return scriptPathway.persona;
}

export async function googleApi(usrMsg) {
  const systemPrompt = gettingSysPrompt();

  const prompt = `
${JSON.stringify(systemPrompt)}
User: ${usrMsg}
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}
