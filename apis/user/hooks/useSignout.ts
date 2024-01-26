import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth";
import { userApi } from "../api";

export const useSignout = () => {
  const router = useRouter();
  const clear = useAuthStore((state) => state.clear);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.signout,
    onSuccess: () => {
      clear();
      queryClient.clear();
      router.push("/login");
    },
  });
};
