import TypeBox from "../assets/elements/TypeBox.jsx";
import TextBox from "../assets/elements/TextBox.jsx";
import { sendMessageToServer, saveMessage } from "../api/base.js";
import { useChat } from "../context/chatContext.jsx";

export default function ChatPage() {
    const { 
        username, 
        currentChatId, 
        messages, 
        loading, 
        addMessage, 
        updateChatInList,
        createChat 
    } = useChat();

    async function handleMessageSend(text) {
        // Check if user is logged in
        if (!username) {
            alert("Please log in to send messages");
            return;
        }

        // If no chat is selected, create one automatically
        let chatId = currentChatId;
        if (!chatId) {
            chatId = await createChat("New Conversation");
            if (!chatId) return; // Failed to create chat
        }

        // Add user message to UI
        const userMessage = { role: "user", text };
        addMessage(userMessage);

        // Save user message to backend
        await saveMessage(username, chatId, "user", text);
        updateChatInList(chatId);

        // Get bot response
        const response = await sendMessageToServer(text);

        if (response && response.text) {
            const botMessage = { role: "bot", text: response.text };
            addMessage(botMessage);
            
            // Save bot message to backend
            await saveMessage(username, chatId, "shakespeare", response.text);
            updateChatInList(chatId);
        }
    }

    return (
        <div className="chat-page">
            {!username && (
                <div className="login-prompt">
                    <p>Please log in to start chatting</p>
                </div>
            )}
            {username && !currentChatId && messages.length === 0 && (
                <div className="empty-chat-prompt">
                    <p>Select a chat or create a new one to start</p>
                </div>
            )}
            <TextBox messages={messages} loading={loading} />
            <TypeBox onSend={handleMessageSend} />
        </div>
    );
}