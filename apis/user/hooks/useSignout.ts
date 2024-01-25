import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/auth";
import { userApi } from "../api";

export const useSignout = () => {
  const clear = useAuthStore((state) => state.clear);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.signout,
    onSuccess: () => {
      clear();
      queryClient.clear();
    },
  });
};
