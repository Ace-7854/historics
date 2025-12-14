import { useRef } from "react";

export default function TypeBox({ placeholder = "Type your message...", onSend }) {
    const inputRef = useRef(null);

    function handleSend() {
        // const input = document.getElementById("inputArea");
        const input = inputRef.current;
        const message = input.value.trim();

        if (message.length === 0) return;

        onSend(message);   // ONLY send clean text
        input.value = "";
    }

    function handleKeyDown(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSend();
        }
    }

    return (
        <div className="type-box">
            <input
                ref={inputRef}
                id="inputArea"
                className="input-area"
                type="text"
                placeholder={placeholder}
                maxLength={150}
                onKeyDown={handleKeyDown}
            />
            <button className="send-button" onClick={handleSend}>
                Send
            </button>
        </div>
    );
}
