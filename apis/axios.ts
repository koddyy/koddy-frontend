import axios from "axios";
import { useAuthStore } from "@/stores/auth";

export const apiInstance = axios.create({
  baseURL: process.env.NODE_ENV === "development" ? "/" : process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

apiInstance.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();

  if (accessToken) {
    config.headers.setAuthorization(accessToken);
  }

  return config;
});
