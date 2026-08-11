import apiClient from "./apiClient";
export const getTeachers = () => apiClient.get("/api/teachers");
