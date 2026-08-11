import apiClient from "./apiClient";
export const getTempleHistories = () => apiClient.get("/api/temple-history");
