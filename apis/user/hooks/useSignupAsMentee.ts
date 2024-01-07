import { useMutation } from "@tanstack/react-query";
import { userApi } from "@/apis/user/api";

export const useSignupAsMentee = () => {
  return useMutation({
    mutationFn: userApi.signupAsMentee,
  });
};
