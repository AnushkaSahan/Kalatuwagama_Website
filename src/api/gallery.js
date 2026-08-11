import apiClient from "./apiClient";
export const getGalleryItems = () => apiClient.get("/api/gallery");
