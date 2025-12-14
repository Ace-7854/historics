const API_BASE_URL = "http://localhost:3001";

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

export async function getUserChats(username) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/chats/${username}`);
        return await response.json();
    } catch (err) {
        console.error("Error fetching chats:", err);
        return { success: false, error: "Failed to fetch chats" };
    }
}

export async function getChatMessages(username, chatId) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/chats/${username}/${chatId}`);
        return await response.json();
    } catch (err) {
        console.error("Error fetching messages:", err);
        return { success: false, error: "Failed to fetch messages" };
    }
}

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