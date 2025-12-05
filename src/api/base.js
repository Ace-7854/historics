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

