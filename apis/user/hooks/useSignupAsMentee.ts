import { useMutation } from "@tanstack/react-query";
import { AxiosHeaders } from "axios";
import { userApi } from "@/apis/user/api";
import { authCookie } from "@/stores/auth";

export const useSignupAsMentee = () => {
  return useMutation({
    mutationFn: userApi.signupAsMentee,
    onSuccess: (response) => {
      if (response.headers instanceof AxiosHeaders) {
        const accessToken = response.headers.get("Authorization");

        if (accessToken && typeof accessToken === "string") {
          authCookie.set(accessToken);
        }
      }
    },
  });
};
