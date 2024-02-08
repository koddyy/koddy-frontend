export type OauthProvider = "kakao" | "google" | "zoom";

export const isValidProvider = (provider: string): provider is OauthProvider => {
  return provider === "kakao" || provider === "google" || provider === "zoom";
};
