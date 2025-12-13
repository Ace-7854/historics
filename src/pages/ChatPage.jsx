import { useState, useEffect } from "react";
import TypeBox from "../assets/elements/TypeBox.jsx";
import TextBox from "../assets/elements/TextBox.jsx";
import { 
    sendMessageToServer, 
    createNewChat, 
    getChatMessages, 
    saveMessage 
} from "../api/base.js";

export default function ChatPage() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentChatId, setCurrentChatId] = useState(null);
    const [username, setUsername] = useState(null); // Get from login state

    // Initialize: Create chat if user is logged in
    useEffect(() => {
        // TODO: Get username from your auth state/context
        const loggedInUser = localStorage.getItem("username"); // Example
        
        if (loggedInUser) {
            setUsername(loggedInUser);
            initializeChat(loggedInUser);
        }
    }, []);

    async function initializeChat(user) {
        // Create a new chat or load existing
        const result = await createNewChat(user, "New Conversation");
        
        if (result.success) {
            setCurrentChatId(result.chatId);
        }
    }

    async function loadChatHistory(user, chatId) {
        const result = await getChatMessages(user, chatId);
        
        if (result.success) {
            // Convert from backend format to frontend format
            const formattedMessages = result.chat.messages.map(msg => ({
                role: msg.sender,
                text: msg.content
            }));
            setMessages(formattedMessages);
        }
    }

    async function handleMessageSend(text) {
        if (!username || !currentChatId) {
            alert("Please log in to send messages");
            return;
        }

        // Add user message to UI
        const userMessage = { role: "user", text };
        setMessages(prev => [...prev, userMessage]);

        // Save user message to backend
        await saveMessage(username, currentChatId, "user", text);

        setLoading(true);

        // Get bot response
        const response = await sendMessageToServer(text);

        if (response && response.text) {
            const botMessage = { role: "bot", text: response.text };
            setMessages(prev => [...prev, botMessage]);
            
            // Save bot message to backend
            await saveMessage(username, currentChatId, "bot", response.text);
        }

        setLoading(false);
    }

    return (
        <div className="chat-page">
            <TextBox messages={messages} loading={loading} />
            <TypeBox onSend={handleMessageSend} />
        </div>
    );
}