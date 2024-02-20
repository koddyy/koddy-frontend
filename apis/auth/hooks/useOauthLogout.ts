import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@/libs/navigation";
import { authCookie } from "@/stores/auth";
import { authApi } from "../api";

export const useOauthLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.oauthLogout,
    onSuccess: () => {
      authCookie.clear();
      queryClient.removeQueries();
      router.push("/login");
    },
  });
};
