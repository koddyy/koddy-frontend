import { useMutation } from "@tanstack/react-query";
import { userApi } from "@/api/user/api";

export const useSignup = () => {
  return useMutation({
    mutationFn: userApi.signup,
  });
};
