import { useQuery } from "@tanstack/react-query";
import { OauthProvider } from "@/types/oauth";
import { authApi } from "../api";

export const useGetOauthUrl = (provider?: OauthProvider) => {
  return useQuery({
    queryKey: ["getOauthUrl", provider],
    queryFn: () => authApi.getOauthUrl({ provider: provider! }),
    select: (data) => data.result,
    enabled: Boolean(provider),
  });
};
