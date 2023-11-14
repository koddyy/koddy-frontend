import { useMutation } from "@tanstack/react-query";
import { userApi } from "@/apis/user/api";
import type { SignupForm as MenteeSignupForm } from "@/app/signup/types/menteeForm";
import type { SignupForm as MentorSignupForm } from "@/app/signup/types/mentorForm";

export const useSignup = () => {
  return useMutation({
    mutationFn: (signupForm: MentorSignupForm | MenteeSignupForm) => userApi.signup(signupForm),
  });
};
