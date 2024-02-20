import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@/libs/navigation";
import { authCookie } from "@/stores/auth";
import { userApi } from "../api";

export const useSignout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.signout,
    onSuccess: () => {
      authCookie.clear();
      queryClient.removeQueries();
      router.push("/login");
    },
  });
};
