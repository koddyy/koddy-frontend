import { useMutation } from "@tanstack/react-query";
import { AxiosHeaders, isAxiosError } from "axios";
import { useRouter } from "@/libs/navigation";
import { authCookie } from "@/stores/auth";
import { useOauthInfoStore } from "@/stores/oauth-info";
import { useProviderStore } from "@/stores/provider";
import { authApi } from "../api";
import { OauthLoginNotFoundErrorResponse } from "../type";

export const useOauthLogin = () => {
  const router = useRouter();
  const { setOauthInfo } = useOauthInfoStore();
  const { setSocialId } = useProviderStore();

  return useMutation({
    mutationFn: authApi.oauthLogin,
    onSuccess: (response) => {
      if (response.headers instanceof AxiosHeaders) {
        const accessToken = response.headers.get("Authorization");

        if (accessToken && typeof accessToken === "string") {
          authCookie.set(accessToken);
        }
      }

      router.replace("/");
    },
    onError: (error) => {
      if (isAxiosError<OauthLoginNotFoundErrorResponse>(error) && error.response?.status === 404) {
        const { id, ...user } = error.response.data;
        setOauthInfo(user);
        setSocialId(id);

        router.replace("/signup");
      }
    },
  });
};
