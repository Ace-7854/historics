import { GoogleGenAI } from "@google/genai";
import "dotenv/config";   // Loads .env
import {loadScriptPathway} from "../controllers/chatController.js";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyCMLylAqO0NaD4QwedCfZigW8AZep0esfI",
});

function gettingSysPrompt() {
  const scriptPathway = loadScriptPathway();
  return scriptPathway.persona;
}

export async function googleApi(usrMsg) {
  const systemPrompt = gettingSysPrompt();
  console.log("System Prompt:", systemPrompt);
  console.log(ai.apiKey);
  const usrMsgWithSys = JSON.stringify(systemPrompt) + "\nUser: " + usrMsg;
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: usrMsg,
  });

  console.log(response.text);
  return response.text;
}
