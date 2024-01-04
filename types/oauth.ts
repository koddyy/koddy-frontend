export type OauthProvider = "kakao" | "google";

export const isValidProvider = (provider: string): provider is OauthProvider => {
  return provider === "kakao" || provider === "google";
};
