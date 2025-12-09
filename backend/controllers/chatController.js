import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

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
    const topics = scriptPathway?.topics || {};
    const matches = []; // Array to store all matches

    // Iterate through all topic categories to find all matches
    for (const [category, keywords] of Object.entries(topics)) {
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

        // Match user input against script pathway - now returns all matches
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
        const { username, message } = body;

        // Validate input
        if (!username || !message) {
            return {
                success: false,
                error: "Username and message are required"
            };
        }

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
            username: username,
            userMessage: message,
            botResponse: chatResponse.response,
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
