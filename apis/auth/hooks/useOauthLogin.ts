import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/user";
import { authApi } from "../api";

export const useOauthLogin = () => {
  const router = useRouter();
  const { setUser } = useUserStore();

  return useMutation({
    mutationFn: authApi.oauthLogin,
    onSuccess: () => {
      router.replace("/");
    },
    onError: (error) => {
      if (isAxiosError(error) && error.response?.status === 404) {
        setUser(error.response.data);
        router.replace("/signup");
      }
    },
  });
};
