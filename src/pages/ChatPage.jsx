import { useState } from "react";
import TypeBox from "../assets/elements/TypeBox.jsx";
import TextBox from "../assets/elements/TextBox.jsx";
import { sendMessageToServer } from "../api/base.js";

export default function ChatPage() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    async function handleMessageSend(text) {
        // Add user message immediately
        const userMessage = { role: "user", text };
        setMessages(prev => [...prev, userMessage]);

        setLoading(true);

        // Send raw text to your server
        const response = await sendMessageToServer(text);

        console.log("Raw server response:", response);

        // ADD THIS — server returns { role: "bot", text: "..." }
        if (response && response.text) {
            const botMessage = { role: "bot", text: response.text };
            setMessages(prev => [...prev, botMessage]);
        } else {
            console.warn("Server returned no text field");
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
