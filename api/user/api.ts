import { apiInstance } from "@/api/axios";
import { SignupFormData } from "@/types/data";

class UserApi {
  signup = (signupFormData: SignupFormData) => {
    return apiInstance.post("/api/oauth/signup", signupFormData);
  };

  login = (loginFormData: { email: string; password: string }) => {
    return apiInstance.post("/api/oauth/login", loginFormData);
  };

  getMe = async () => {
    const response = await apiInstance.get("/api/users/me");
    return response.data;
  };
}

export const userApi = new UserApi();
