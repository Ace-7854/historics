import { useState } from "react";
import TypeBox from "../assets/elements/TypeBox.jsx";
import TextBox from "../assets/elements/TextBox.jsx";

export default function ChatPage() {
    const [messages, setMessages] = useState([]);

    function handleMessageSend(newMessage) {
        setMessages([...messages, newMessage]);
    }

    return (
        <div className="chat-page">
            <TextBox 
            messages={messages}
            />
            <TypeBox 
            onSend={handleMessageSend}
            />
        </div>
    );
}
