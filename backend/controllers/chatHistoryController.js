import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const USERS_FILE = path.join(__dirname, "..", "db", "users.json");

/**
 * Loads all users from the database file.
 * @returns {array} Array of user objects, empty array on error
 */
// Load users from file
function loadUsers() {
    try {
        const data = fs.readFileSync(USERS_FILE, "utf8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error loading users:", error);
        return [];
    }
}

/**
 * Persists users array to the database file.
 * @param {array} users - Array of user objects to save
 * @returns {boolean} True on success, false on error
 */
// Save users to file
function saveUsers(users) {
    try {
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
        return true;
    } catch (error) {
        console.error("Error saving users:", error);
        return false;
    }
}

/**
 * Creates a new chat for a user.
 * @param {string} username - The username
 * @param {string} [chatName="New Chat"] - Optional chat name
 * @returns {object} Success status with chatId or error message
 */
// Create a new chat for a user
export function createNewChat(username, chatName = "New Chat") {
    const users = loadUsers();
    const user = users.find(u => u.username === username);
    
    if (!user) {
        return { success: false, error: "User not found" };
    }

    const chatId = `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newChat = {
        chatId,
        chatName,
        createdAt: new Date().toISOString(),
        messages: []
    };

    user.chats.push(newChat);
    
    if (saveUsers(users)) {
        return { success: true, chatId, chat: newChat };
    }
    
    return { success: false, error: "Failed to save chat" };
}

/**
 * Adds a message to a specific chat.
 * @param {string} username - The username
 * @param {string} chatId - The chat ID
 * @param {object} message - Message object with sender and content
 * @returns {object} Success status with message or error message
 */
// Add a message to a specific chat
export function addMessageToChat(username, chatId, message) {
    const users = loadUsers();
    const user = users.find(u => u.username === username);
    
    if (!user) {
        return { success: false, error: "User not found" };
    }

    const chat = user.chats.find(c => c.chatId === chatId);
    
    if (!chat) {
        return { success: false, error: "Chat not found" };
    }

    const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newMessage = {
        messageId,
        sender: message.sender, // "user" or "shakespeare"
        timestamp: new Date().toISOString(),
        content: message.content
    };

    chat.messages.push(newMessage);
    
    if (saveUsers(users)) {
        return { success: true, message: newMessage };
    }
    
    return { success: false, error: "Failed to save message" };
}

/**
 * Retrieves all chats for a user with metadata.
 * @param {string} username - The username
 * @returns {object} Success status with array of chats or error message
 */
// Get all chats for a user
export function getUserChats(username) {
    const users = loadUsers();
    const user = users.find(u => u.username === username);
    
    if (!user) {
        return { success: false, error: "User not found" };
    }

    return {
        success: true,
        chats: user.chats.map(chat => ({
            chatId: chat.chatId,
            chatName: chat.chatName,
            createdAt: chat.createdAt,
            messageCount: chat.messages.length,
            lastMessage: chat.messages[chat.messages.length - 1]?.content.substring(0, 50) || ""
        }))
    };
}

/**
 * Retrieves all messages for a specific chat.
 * @param {string} username - The username
 * @param {string} chatId - The chat ID
 * @returns {object} Success status with messages or error message
 */
// Get messages from a specific chat
export function getChatMessages(username, chatId) {
    const users = loadUsers();
    const user = users.find(u => u.username === username);
    
    if (!user) {
        return { success: false, error: "User not found" };
    }

    const chat = user.chats.find(c => c.chatId === chatId);
    
    if (!chat) {
        return { success: false, error: "Chat not found" };
    }

    return {
        success: true,
        chat: {
            chatId: chat.chatId,
            chatName: chat.chatName,
            messages: chat.messages
        }
    };
}

/**
 * Updates the name of an existing chat.
 * @param {string} username - The username
 * @param {string} chatId - The chat ID
 * @param {string} newName - The new chat name
 * @returns {object} Success status or error message
 */
// Update chat name
export function updateChatName(username, chatId, newName) {
    const users = loadUsers();
    const user = users.find(u => u.username === username);
    
    if (!user) {
        return { success: false, error: "User not found" };
    }

    const chat = user.chats.find(c => c.chatId === chatId);
    
    if (!chat) {
        return { success: false, error: "Chat not found" };
    }

    chat.chatName = newName;
    
    if (saveUsers(users)) {
        return { success: true };
    }
    
    return { success: false, error: "Failed to update chat name" };
}

/**
 * Deletes a chat and all its messages.
 * @param {string} username - The username
 * @param {string} chatId - The chat ID to delete
 * @returns {object} Success status or error message
 */
// Delete a chat
export function deleteChat(username, chatId) {
    const users = loadUsers();
    const user = users.find(u => u.username === username);
    
    if (!user) {
        return { success: false, error: "User not found" };
    }

    const chatIndex = user.chats.findIndex(c => c.chatId === chatId);
    
    if (chatIndex === -1) {
        return { success: false, error: "Chat not found" };
    }

    user.chats.splice(chatIndex, 1);
    
    if (saveUsers(users)) {
        return { success: true };
    }
    
    return { success: false, error: "Failed to delete chat" };
}