export default function TextBox({ messages, loading }) {

    return (
        <div className="text-area">
            {messages.map((msg, index) => (
                <div
                    key={index}
                    className={`message ${msg.role === "user" ? "user-msg" : "bot-msg"}`}
                >
                    {msg.text}
                </div>
            ))}

            {loading && (
                <div className="message bot-msg">
                    Typing...
                </div>
            )}
        </div>
    );
}
