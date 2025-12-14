import { GoogleGenAI } from "@google/genai";
import { loadScriptPathway } from "../controllers/chatController.js";

// console.log("Loaded GOOGLE_API_KEY:", process.env.GOOGLE_API_KEY); // DEBUG

if (!process.env.GOOGLE_API_KEY) {
  throw new Error("GOOGLE_API_KEY is missing from .env");
}

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

/**
 * Loads the system prompt from the script pathway.
 * @returns {object} Persona object containing name, context, and tone
 */
function gettingSysPrompt() {
  const scriptPathway = loadScriptPathway();
  return scriptPathway.persona;
}

/**
 * Generates content using Google's Gemini API with persona context.
 * @async
 * @param {string} usrMsg - The user's message
 * @param {string} [model="gemini-2.0-flash"] - The model to use
 * @returns {Promise<string>} Generated response text
 */
export async function googleApi(usrMsg, model = "gemini-2.0-flash") {
  const systemPrompt = gettingSysPrompt();

  const prompt = `${JSON.stringify(systemPrompt)}\nUser: ${usrMsg}`;

  const response = await ai.models.generateContent({
    model: model,
    contents: prompt,
  });
  
    return response.text;
}
