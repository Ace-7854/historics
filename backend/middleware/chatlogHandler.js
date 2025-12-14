import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


/**
 * Loads all users from the database file.
 * @returns {array|null} Array of user objects, null on error
 */
function loadUsers() {
    // Try catch to handle file read errors
    try {
        const usersPath = path.join(__dirname, "..", "db", "users.json");
        const usersData = fs.readFileSync(usersPath, "utf8");
        return JSON.parse(usersData);
    } catch (error) {
        console.error("Error loading users.json:", error);
        return null;
    }
}

/**
 * Validates user data and returns error response if invalid.
 * @param {array|null} users - Array of user objects
 * @param {object} user - User object to validate
 * @returns {object|null} Error response object or null if valid
 */
// Universal error checker for loading user data and finding specific user
function checkUserDataErrors(users, user) {
    if (!users) {
        return { success: false, 
        error: "Failed to load users data" 
    };
    }


    if (!user) {
        return { success: false, 
        error: "User not found" 
    };
    }
    return null; // No errors
}

/**
 * Retrieves all chat logs for a specific user.
 * @param {string} username - The username
 * @returns {object} Success status with chats array or error message
 */
// This will just return all chat logs for a specific username
function getUserChatLogs(username) {
    const users = loadUsers();
    const user = users?.find(u => u.username === username);
    
    const errorResponse = checkUserDataErrors(users, user);

    // No errors will = null
    if (errorResponse) {
        return errorResponse;
    }
    
    // To display Chat messages: chats.messages.content(multi-line)
    return {
        success: true,
        username: user.username,
        chats: user.chats || []
    };
}

export {
    getUserChatLogs,
    loadUsers
};