import { useState } from "react";
import TypeBox from "../assets/elements/TypeBox.jsx";
import TextBox from "../assets/elements/TextBox.jsx";
import { sendMessageToServer } from "../api/base.js";

export default function ChatPage() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    async function handleMessageSend(text) {
        // 1. Add user message immediately
        const userMessage = { role: "user", text };
        setMessages(prevMsgs => [...prevMsgs, userMessage]);

        // 2. Show loader
        setLoading(true);

        try {
            const response = await sendMessageToServer(text);

            const serverMessage = { role: "assistant", text: response.reply };
            setMessages(prevMsgs => [...prevMsgs, serverMessage]);

        } catch (err) {
            // If server fails
            setMessages(prevMsgs => [
                ...prevMsgs,
                { role: "assistant", text: "❌ Server error." }
            ]);
        }

        setLoading(false);
    }

    return (
        <div className="chat-page">
            <TextBox 
                messages={messages}
                loading={loading}   // send loader status
            />
            <TypeBox 
                onSend={handleMessageSend}
            />
        </div>
    );
}
