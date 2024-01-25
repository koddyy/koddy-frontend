import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/auth";
import { authApi } from "../api";

export const useOauthLogout = () => {
  const clear = useAuthStore((state) => state.clear);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.oauthLogout,
    onSuccess: () => {
      clear();
      queryClient.clear();
    },
  });
};
