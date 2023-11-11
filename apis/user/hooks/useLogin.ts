import { useMutation } from "@tanstack/react-query";
import { userApi } from "@/apis/user/api";

export const useLogin = () => {
  return useMutation({
    mutationFn: userApi.login,
  });
};
