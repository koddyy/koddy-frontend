import { useMutation } from "@tanstack/react-query";
import { userApi } from "@/api/user/api";

export const useLogin = () => {
  return useMutation({
    mutationFn: userApi.login,
  });
};
