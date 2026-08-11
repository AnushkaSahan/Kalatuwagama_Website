import apiClient from "./apiClient";
export const getEvents = () => apiClient.get("/api/events");
export const getEvent = (id) => apiClient.get(`/api/events/${id}`);
