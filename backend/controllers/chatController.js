import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { googleApi } from "../services/api.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function loadScriptPathway() {

    try {
        const scriptPath = path.join(__dirname, "..", "db", "script_pathway.json");
        const scriptData = fs.readFileSync(scriptPath, "utf8");
        return JSON.parse(scriptData);

    } catch (error) {

        console.error("Error loading script_pathway.json:", error);
        return null;

    }
}

// Find all matching keywords in user message for a given list of keywords
function findMatchingKeywords(userMessage, keywords) {

    const normalizedMessage = userMessage.toLowerCase().trim();

    return keywords.filter(keyword => normalizedMessage.includes(keyword.toLowerCase().trim()));

}

// Check if user message contains any topics requiring AI knowledge
function checkForAIRequiredTopics(userMessage, scriptPathway) {

    const topicsRequiringAI = scriptPathway?.topics_requiring_ai_knowledge || {};

    // Iterate through all AI-required topic categories to find matches
    for (const [category, keywords] of Object.entries(topicsRequiringAI)) {

        const matchedKeywords = findMatchingKeywords(userMessage, keywords);

        if (matchedKeywords.length > 0) {
            return true;
        }
    }

    return false;
}

// Get response from script pathway based on category and keyword
// Returns null if not found
function getResponseFromPathway(scriptPathway, category, keyword) {

    const responses = scriptPathway?.responses?.[category];

    if (!responses) return null;
    
    return responses[keyword] || null;
}

// Determine all matching categories and keywords for user input
function matchUserInput(userMessage, scriptPathway) {

    const normalizedMessage = userMessage.toLowerCase().trim();
    const topics_normal = scriptPathway?.topics_normal || {};
    const matches = []; // Array to store all matches

    // Iterate through all topic categories to find all matches
    for (const [category, keywords] of Object.entries(topics_normal)) {

        const matchedKeywords = findMatchingKeywords(normalizedMessage, keywords);

        for (const keyword of matchedKeywords) {
            matches.push({ category, keyword });
        }
    }

    return {
        matches: matches,
        matched: matches.length > 0
    };
}

// Extract persona context from script pathway
function getPersonaContext(scriptPathway) {

    const persona = scriptPathway?.persona || {};
    return `Name: ${persona.name}\nContext: ${persona.context}\nTone: ${persona.tone}`;
}

// Generate chat response based on user message and script pathway
function generateChatResponse(userMessage) {

    try {
        const scriptPathway = loadScriptPathway();

        if (!scriptPathway) {
            return {
                success: false,
                response: "I apologize, but I am unable to access my knowledge at this moment. Pray try again.",
            };
        }

        // First, check if message requires AI knowledge - this takes priority
        if (checkForAIRequiredTopics(userMessage, scriptPathway)) {
            /////AI GO HERE/////
            // const ai_resp = googleApi(userMessage);
            // AI model will be called here in the future
            return {
                success: true,
                // response: ai_resp,
                response:"AI",// Placeholder - AI model response will go here
                source: "ai_model",
                requiresAI: true
            };
        }

        // If no AI-required topics, check normal scripted responses
        const { matches, matched } = matchUserInput(userMessage, scriptPathway);

        if (matched && matches.length > 0) {

            // Found matches in the JSON script pathway
            const responses = [];
            const matchesData = [];

            // Collect all responses in order
            for (const { category, keyword } of matches) {

                const response = getResponseFromPathway(scriptPathway, category, keyword);

                if (response) {
                    responses.push(response);
                    matchesData.push({ category, keyword });
                }
            }

            if (responses.length > 0) {

                // Concatenate all responses with a line break separator
                const concatenatedResponse = responses.join("\n\n");

                return {
                    success: true,
                    response: concatenatedResponse,
                    source: "json",
                    matches: matchesData,
                    matchCount: responses.length
                };
            }
        }

        // No match found - would use AI model here in the future
        return {
            success: true,
            response: "Methinks thy question ventures beyond the bounds of what I have readily prepared. In time, I shall consult deeper wells of knowledge to answer thee more fully.",
            source: "ai_placeholder",
            note: `User asked: "${userMessage}" - Future AI integration needed`
        };

    } catch (error) {

        console.error("Error generating chat response:", error);

        return {
            success: false,
            response: "An unexpected problem hath arived. Prithee, try again.",
            source: "error"
        };
    }
}

// Main chat request handler
function chatRequest(body) {

    try {
        const { message } = body;

        // Generate response based on script pathway
        const chatResponse = generateChatResponse(message);

        if (!chatResponse.success) {
            return {
                success: false,
                error: chatResponse.response
            };
        }

        // Return formatted response
        return {
            success: true,
            userMessage: message,
            response: chatResponse.response,
            source: chatResponse.source,
            matches: chatResponse.matches || null,
            matchCount: chatResponse.matchCount || 0,
            timestamp: new Date().toISOString()
        };

    } catch (error) {

        console.error("Error handling chat request:", error);

        return {
            success: false,
            error: "Failed to process chat request"
        };
    }
}

export {
    chatRequest,
    generateChatResponse,
    matchUserInput,
    loadScriptPathway,
    getPersonaContext
};
