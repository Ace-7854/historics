import { useEffect, useRef } from "react";

export default function TextBox({ messages, loading }) {
    const endRef = useRef(null);

    // Auto-scroll when messages change OR loading state changes
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    return (
        <div className="text-box-container">
            <div className="messages-wrapper">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={msg.role === "user" ? "user-msg" : "bot-msg"}
                    >
                        {msg.text}
                    </div>
                ))}

                {loading && (
                    <div className="bot-msg loading-msg">Typing...</div>
                )}

                {/* This is the auto-scroll anchor */}
                <div ref={endRef}></div>

                <br />
            </div>
        </div>
    );
}
