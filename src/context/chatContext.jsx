import { createContext, useContext, useState, useEffect } from 'react';
import { getUserChats, getChatMessages, createNewChat } from '../api/base.js';

const ChatContext = createContext();

export function ChatProvider({ children }) {
    const [username, setUsername] = useState(null);
    const [chats, setChats] = useState([]);
    const [currentChatId, setCurrentChatId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    // Load username from localStorage on mount
    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUsername(storedUsername);
            loadUserChats(storedUsername);
        }
    }, []);

    // Load all chats for user
    async function loadUserChats(user) {
        const result = await getUserChats(user);
        if (result.success) {
            setChats(result.chats);
        }
    }

    // Load messages for a specific chat
    async function loadChat(chatId) {
        if (!username) return;
        
        setLoading(true);
        const result = await getChatMessages(username, chatId);
        
        if (result.success) {
            // Convert from backend format to frontend format
            const formattedMessages = result.chat.messages.map(msg => ({
                role: msg.sender,
                text: msg.content
            }));
            setMessages(formattedMessages);
            setCurrentChatId(chatId);
        }
        setLoading(false);
    }

    // Create a new chat
    async function createChat(chatName = "New Chat") {
        if (!username) {
            alert("Please log in to create a chat");
            return null;
        }

        const result = await createNewChat(username, chatName);
        if (result.success) {
            const newChat = {
                chatId: result.chatId,
                chatName: result.chat.chatName,
                createdAt: result.chat.createdAt,
                messageCount: 0
            };
            setChats(prev => [...prev, newChat]);
            // Automatically switch to new chat
            setCurrentChatId(result.chatId);
            setMessages([]);
            return result.chatId;
        }
        return null;
    }

    // Add message to current chat (for UI updates)
    function addMessage(message) {
        setMessages(prev => [...prev, message]);
    }

    // Update chat list when messages are added
    function updateChatInList(chatId) {
        setChats(prev => prev.map(chat => 
            chat.chatId === chatId 
                ? { ...chat, messageCount: chat.messageCount + 1 }
                : chat
        ));
    }

    // Login function
    function login(user) {
        setUsername(user);
        localStorage.setItem("username", user);
        loadUserChats(user);
    }

    // Logout function
    function logout() {
        setUsername(null);
        setChats([]);
        setCurrentChatId(null);
        setMessages([]);
        localStorage.removeItem("username");
    }

    const value = {
        username,
        chats,
        currentChatId,
        messages,
        loading,
        loadChat,
        createChat,
        addMessage,
        updateChatInList,
        login,
        logout,
        setMessages
    };

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
}

// Custom hook to use the chat context
export function useChat() {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
}