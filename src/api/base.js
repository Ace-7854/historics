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
        const response = await fetch("http://localhost:3000/api/message", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: text })   // <<< FIXED
        });

        return await response.json();
    } catch (error) {
        console.error("Error sending message:", error);
        return { reply: "Server error ❌" };
    }
}
