const API_BASE_URL = "http://localhost:3001";

/**
 * Checks server health by pinging the health endpoint.
 * @async
 * @returns {Promise<object>} Health status object
 */
export async function fetchData() {
  try {
    const response = await fetch("http://localhost:3001/api/health");

    if (!response.ok) {
      return { status: "fail" };
    }

    return await response.json();
  } catch (err) {
    return { status: "fail" };
  }
}

export async function DataGet() {

}

/**
 * Sends a user message to the backend chat API.
 * @async
 * @param {string} text - The message text to send
 * @returns {Promise<object>} Server response with bot reply
 */
export async function sendMessageToServer(text) {
    try {
        const response = await fetch("http://localhost:3001/api/message", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: text })
        });

        // --- CRITICAL ---
        const data = await response.json(); 
        console.log("Parsed server JSON:", data);

        return data;
    } catch (err) {
        console.error("Error sending message:", err);
        return { role: "bot", text: "Error contacting server." };
    }
}

/**
 * Authenticates a user with provided credentials.
 * @async
 * @param {object} credentials - Login credentials (username and password)
 * @returns {Promise<object>} Login response with status and user data
 */
export async function loginUser(credentials) {
  const response = await fetch(`http://localhost:3001/api/login`, 
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    }
  )
  const data = await response.json();
  console.log("Login response data:", data); 
  return data;
}

/**
 * Registers a new user account.
 * @async
 * @param {object} credentials - Signup credentials
 * @returns {Promise<boolean>} True if signup successful, false otherwise
 */
export async function signupUser(credentials) {
  const response = await fetch("http://localhost:3001/api/signup", 
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: credentials,
    });  

  const data = await response.json();
  if (data.status === 'success') {
    console.log("Signup successful:", data);
    return true;
  }
  else {
    console.log("Signup failed:", data);
    return false;
  }

}

/**
 * Creates a new chat for a user.
 * @async
 * @param {string} username - The username
 * @param {string} [chatName="New Chat"] - Optional chat name
 * @returns {Promise<object>} Chat creation result with chatId
 */
export async function createNewChat(username, chatName = "New Chat") {
    try {
        const response = await fetch(`${API_BASE_URL}/api/chats/new`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, chatName })
        });
        return await response.json();
    } catch (err) {
        console.error("Error creating chat:", err);
        return { success: false, error: "Failed to create chat" };
    }
}

/**
 * Retrieves all chats for a user.
 * @async
 * @param {string} username - The username
 * @returns {Promise<object>} Response with chats array
 */
export async function getUserChats(username) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/chats/${username}`);
        return await response.json();
    } catch (err) {
        console.error("Error fetching chats:", err);
        return { success: false, error: "Failed to fetch chats" };
    }
}

/**
 * Retrieves all messages from a specific chat.
 * @async
 * @param {string} username - The username
 * @param {string} chatId - The chat ID
 * @returns {Promise<object>} Response with messages array
 */
export async function getChatMessages(username, chatId) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/chats/${username}/${chatId}`);
        return await response.json();
    } catch (err) {
        console.error("Error fetching messages:", err);
        return { success: false, error: "Failed to fetch messages" };
    }
}

/**
 * Saves a message to a chat.
 * @async
 * @param {string} username - The username
 * @param {string} chatId - The chat ID
 * @param {string} sender - The message sender (user or bot)
 * @param {string} content - The message content
 * @returns {Promise<object>} Save result response
 */
export async function saveMessage(username, chatId, sender, content) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/chats/message`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username,
                chatId,
                message: { sender, content }
            })
        });
        return await response.json();
    } catch (err) {
        console.error("Error saving message:", err);
        return { success: false, error: "Failed to save message" };
    }
}

/**
 * Deletes a chat and all its messages.
 * @async
 * @param {string} username - The username
 * @param {string} chatId - The chat ID to delete
 * @returns {Promise<object>} Deletion result response
 */
export async function deleteChat(username, chatId) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/chats/${username}/${chatId}`, {
            method: "DELETE"
        });
        return await response.json();
    } catch (err) {
        console.error("Error deleting chat:", err);
        return { success: false, error: "Failed to delete chat" };
    }
}