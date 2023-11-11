import { useMutation } from "@tanstack/react-query";
import { userApi } from "@/api/user/api";
import { SignupFormData } from "@/types/data";

export const useSignup = () => {
  return useMutation({
    mutationFn: (signupFormData: SignupFormData) => userApi.signup(signupFormData),
  });
};
