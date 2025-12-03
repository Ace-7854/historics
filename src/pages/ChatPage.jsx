import { useState } from "react";
import TypeBox from "../assets/elements/TypeBox.jsx";
import TextBox from "../assets/elements/TextBox.jsx";
import { sendMessageToServer } from "../api/base.js";

export default function ChatPage() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    async function handleMessageSend(text) {
        // User message
        const userMessage = { role: "user", text };
        setMessages(prev => [...prev, userMessage]);

        setLoading(true);

        // Send raw text to server
        const response = await sendMessageToServer(text);

        // Bot message
        if (response && response.reply) {
            const botMessage = { role: "bot", text: response.reply };
            setMessages(prev => [...prev, botMessage]);
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
