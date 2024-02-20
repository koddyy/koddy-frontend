import { useMutation } from "@tanstack/react-query";
import { AxiosHeaders, isAxiosError } from "axios";
import { useRouter } from "@/libs/navigation";
import { authCookie } from "@/stores/auth";
import { useProviderStore } from "@/stores/provider";
import { useUserStore } from "@/stores/user";
import { authApi } from "../api";
import { OauthLoginNotFoundErrorResponse } from "../type";

export const useOauthLogin = () => {
  const router = useRouter();
  const { setUser } = useUserStore();
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
        setUser(user);
        setSocialId(id);

        router.replace("/signup");
      }
    },
  });
};
