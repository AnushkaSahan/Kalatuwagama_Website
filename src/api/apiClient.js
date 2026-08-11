import axios from "axios";

// Public site — read-only, no auth token needed (backend permits these
// GET routes anonymously). Contact form POST is also public.
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});

export default apiClient;
