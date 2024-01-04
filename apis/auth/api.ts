import type { OauthProvider } from "@/types/oauth";
import { apiInstance } from "../axios";

const redirectUri =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/login"
    : `${process.env.NEXT_PUBLIC_APP_URL}/login`;

export const authApi = {
  getOauthUrl: async ({ provider }: { provider: OauthProvider }) => {
    const response = await apiInstance.get(
      `/api/oauth/access/${provider}?redirectUri=${redirectUri}`
    );
    return response.data;
  },
};
