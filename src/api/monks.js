import apiClient from "./apiClient";
export const getMonks = () => apiClient.get("/api/monks");
