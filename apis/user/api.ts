import { apiInstance } from "@/apis/axios";
import { ResponseType } from "@/apis/types";
import { SignupFormData } from "@/types/data";
import { User } from "@/types/user";

class UserApi {
  signup = (signupFormData: SignupFormData) => {
    return apiInstance.post("/api/oauth/signup", signupFormData);
  };

  login = (loginFormData: { email: string; password: string }) => {
    return apiInstance.post("/api/oauth/login", loginFormData);
  };

  getMe = async () => {
    const response = await apiInstance.get<ResponseType<User>>("/api/users/me");
    return response.data;
  };

  getMentorList = async () => {
    const response = await apiInstance.get<ResponseType<User[]>>("/api/users/mentor");
    return response.data;
  };

  getMenteeList = async () => {
    const response = await apiInstance.get<ResponseType<User[]>>("/api/users/mentee");
    return response.data;
  };
}

export const userApi = new UserApi();
