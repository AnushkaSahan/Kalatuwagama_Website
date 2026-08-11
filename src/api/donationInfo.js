import apiClient from "./apiClient";
export const getDonationInfos = () => apiClient.get("/api/donation-info");
