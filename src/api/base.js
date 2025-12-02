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

export async function sendMessageToServer(location = "api/message", data) {
  
  const path = `${API_BASE_URL}/${location}`;
  const res = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  
  if (!res.ok) {
    return { status: "fail" };
  }

  return res.json();
}