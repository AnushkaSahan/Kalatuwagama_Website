import apiClient from "./apiClient";
export const getFoundationProjects = () => apiClient.get("/api/foundation-projects");
