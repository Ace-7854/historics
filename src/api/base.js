const API_BASE_URL = "https://api.example.com/v1";

export async function fetchData(endpoint) {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return await response.json();
}

