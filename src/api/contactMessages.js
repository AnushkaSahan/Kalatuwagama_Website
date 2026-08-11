import apiClient from "./apiClient";
export const sendContactMessage = (data) =>
  apiClient.post("/api/contact-messages", data);
