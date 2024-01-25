import type { OauthProvider } from "@/types/oauth";
import { apiInstance } from "../axios";

const redirectUri = (provider: OauthProvider) =>
  (process.env.NODE_ENV === "development"
    ? "http://localhost:3000/login"
    : `${process.env.NEXT_PUBLIC_APP_URL}/login`) + `/${provider}`;

export const authApi = {
  getOauthUrl: async ({ provider }: { provider: OauthProvider }) => {
    const response = await apiInstance.get(
      `/api/oauth/access/${provider}?redirectUri=${redirectUri(provider)}`
    );
    return response.data;
  },

  oauthLogin: ({
    provider,
    authorizationCode,
    state,
  }: {
    provider: OauthProvider;
    authorizationCode: string;
    state: string;
  }) => {
    return apiInstance.post(`/api/oauth/login/${provider}`, {
      authorizationCode,
      state,
      redirectUri: redirectUri(provider),
    });
  },

  reissueToken: () => {
    return apiInstance.post("/api/token/reissue");
  },

  oauthLogout: () => {
    return apiInstance.post("/api/oauth/logout");
  },
};
