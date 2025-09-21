const fullUrl = new URL(window.location);
const ip = fullUrl.searchParams.get("ip") || localStorage.getItem("ip");
if (ip) localStorage.setItem("ip", ip);

// Build the backend base URL
export const API_BASE_URL = ip ? `http://${ip}:3000` : "";
