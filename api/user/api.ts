import { apiInstance } from "@/api/axios";
import { SignupFormData } from "@/types/data";

class UserApi {
  signup = (signupFormData: SignupFormData) => {
    return apiInstance.post("/api/oauth/signup", signupFormData);
  };
}

export const userApi = new UserApi();
