export default function TypeBox({ placeholder = "Type your message...", onSend }) {

    function handleSend() {
        const input = document.getElementById("inputArea");
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
