import { apiInstance } from "@/apis/axios";
import type { ResponseType } from "@/apis/types";
import { PostAvailableTimesRequest } from "@/apis/user/types";
import type { SignupForm as MenteeSignupForm } from "@/app/signup/types/menteeForm";
import type { SignupForm as MentorSignupForm } from "@/app/signup/types/mentorForm";
import type { Mentee, Mentor, User } from "@/types/user";

class UserApi {
  signupAsMentor = (signupForm: MentorSignupForm & User) => {
    return apiInstance.post("/api/mentors", signupForm);
  };

  signupAsMentee = (signupForm: MenteeSignupForm & User) => {
    return apiInstance.post("/api/mentees", signupForm);
  };

  getMe = async () => {
    const response = await apiInstance.get<ResponseType<Mentor | Mentee>>("/api/users/me");
    return response.data;
  };

  getUserById = async (id: string) => {
    const response = await apiInstance.get<ResponseType<Mentor | Mentee>>(`/api/users/${id}`);
    return response.data;
  };

  getMentorList = async () => {
    const response = await apiInstance.get<ResponseType<Mentor[]>>("/api/users/mentor");
    return response.data;
  };

  getMenteeList = async () => {
    const response = await apiInstance.get<ResponseType<Mentee[]>>("/api/users/mentee");
    return response.data;
  };

  postAvailableTimes = (availableTimesData: PostAvailableTimesRequest) => {
    return apiInstance.post("/api/users/available-time", availableTimesData);
  };
}

export const userApi = new UserApi();
