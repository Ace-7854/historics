import dotenv from "dotenv";
dotenv.config();
import { 
    createNewChat, 
    addMessageToChat, 
    getUserChats, 
    getChatMessages,
    updateChatName,
    deleteChat 
} from "./controllers/chatHistoryController.js";

import express from "express";
import cors from "cors";
import accountLogin from "./middleware/loginHandler.js";
import {addUsers} from "./config/db_handler.js";
import { hashPassword } from "./security/hash.js";
import { chatRequest } from "./controllers/chatController.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
  //console.log("Health check received -> New client activated");
});

app.post("/api/login", (req, res) => {
  const data = req.body;

  //console.log("Login attempt for user:", data);
  
  const loginResult = accountLogin(data);
  res.json(loginResult);
});


app.post("/api/message", async (req, res) => {
  const data = req.body;
  //console.log("Message received:", data);
  try {
  const chatResult = await chatRequest(data);
    //console.log("Chat response:", chatResult.response);
  res.json({
    role: "bot",
    text: chatResult.response // frontend expects "text"
    });
    }  catch (error) {
    
      console.error("Error processing message:", error);
    res.status(500).json({ role: "bot", text: "An error occurred while processing your message." });
  }
});

app.post("/api/signup", async (req, res) => {
  const data = req.body;
  //console.log("Signup attempt for user:", data.username);
  try {
    data.password = await hashPassword(data.password);
    const signupResult = addUsers(data.username, data.password);
    res.json({ status: 'success', message: 'Signup successful' });
  }
  catch (error) {
    res.json({ status: error, message: "Signup failed" });
  }
});

// Create new chat
app.post("/api/chats/new", (req, res) => {
    const { username, chatName } = req.body;
    
    if (!username) {
        return res.status(400).json({ success: false, error: "Username required" });
    }
    
    const result = createNewChat(username, chatName);
    res.json(result);
});

// Get all chats for user
app.get("/api/chats/:username", (req, res) => {
    const { username } = req.params;
    const result = getUserChats(username);
    res.json(result);
});

// Get specific chat messages
app.get("/api/chats/:username/:chatId", (req, res) => {
    const { username, chatId } = req.params;
    const result = getChatMessages(username, chatId);
    res.json(result);
});

// Add message to chat
app.post("/api/chats/message", (req, res) => {
    const { username, chatId, message } = req.body;
    
    if (!username || !chatId || !message) {
        return res.status(400).json({ success: false, error: "Missing required fields" });
    }
    
    const result = addMessageToChat(username, chatId, message);
    res.json(result);
});

// Update chat name
app.put("/api/chats/rename", (req, res) => {
    const { username, chatId, newName } = req.body;
    const result = updateChatName(username, chatId, newName);
    res.json(result);
});

// Delete chat
app.delete("/api/chats/:username/:chatId", (req, res) => {
    const { username, chatId } = req.params;
    const result = deleteChat(username, chatId);
    res.json(result);
});


app.listen(3001, () => console.log("Backend running on port 3001"));