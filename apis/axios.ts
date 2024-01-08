import axios, { AxiosHeaders } from "axios";
import { useAuthStore } from "@/stores/auth";
import { authApi } from "./auth/api";

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

apiInstance.interceptors.response.use(
  (response) => {
    if (response.headers instanceof AxiosHeaders && response.headers.hasAuthorization()) {
      const accessToken = response.headers.get("Authorization");

      if (accessToken && typeof accessToken === "string") {
        useAuthStore.setState({ accessToken });
      }
    }
    return response;
  },
  async (error) => {
    if (error.response?.status === 401 && error.config.url !== "/api/token/reissue") {
      useAuthStore.getState().clear();

      try {
        await authApi.reissueToken();
        return apiInstance(error.config);
      } catch (error) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);
