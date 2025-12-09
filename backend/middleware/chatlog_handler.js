import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


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