import axios, { AxiosHeaders } from "axios";
import { authCookie } from "@/stores/auth";
import { authApi } from "./auth/api";

export const apiInstance = axios.create({
  baseURL: process.env.NODE_ENV === "development" ? "/" : process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

apiInstance.interceptors.request.use((config) => {
  const accessToken = authCookie.get();

  if (accessToken) {
    config.headers.setAuthorization(accessToken);
  }

  return config;
});

apiInstance.interceptors.response.use(undefined, async (error) => {
  if (
    error.response?.status === 401 &&
    error.response.data.errorCode === "AUTH_002" &&
    error.config.url !== "/api/token/reissue"
  ) {
    authCookie.clear();

    try {
      const response = await authApi.reissueToken();
      if (response.headers instanceof AxiosHeaders && response.headers.hasAuthorization()) {
        const accessToken = response.headers.getAuthorization();

        if (accessToken && typeof accessToken === "string") {
          authCookie.set(accessToken);
        }
      }

      return apiInstance(error.config);
    } catch (error) {
      window.location.href = "/login";
    }
  }

  return Promise.reject(error);
});
