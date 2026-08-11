import apiClient from "./apiClient";
export const getAnnouncements = () => apiClient.get("/api/announcements");
