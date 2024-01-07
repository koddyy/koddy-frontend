import { useMutation } from "@tanstack/react-query";
import { userApi } from "@/apis/user/api";

export const useSignupAsMentor = () => {
  return useMutation({
    mutationFn: userApi.signupAsMentor,
  });
};
