import { apiInstance } from "@/apis/axios";
import type { ResponseType } from "@/apis/types";
import { PostAvailableTimesRequest } from "@/apis/user/types";
import type { SignupForm as MenteeSignupForm } from "@/app/signup/types/menteeForm";
import type { SignupForm as MentorSignupForm } from "@/app/signup/types/mentorForm";
import type { Mentee, UpdateMenteeInfoForm } from "@/types/mentee";
import type { Mentor, UpdateMentorInfoForm } from "@/types/mentor";
import type { Mentee as DeprecatedMentee, Mentor as DeprecatedMentor, User } from "@/types/user";

class UserApi {
  signupAsMentor = (signupForm: MentorSignupForm & User) => {
    return apiInstance.post("/api/mentors", signupForm);
  };

  signupAsMentee = (signupForm: MenteeSignupForm & User) => {
    return apiInstance.post("/api/mentees", signupForm);
  };

  getMe = async () => {
    const response = await apiInstance.get<Mentor | Mentee>("/api/members/me");
    return response.data;
  };

  patchMentorProfile = (profile: Pick<Mentor, "introduction" | "period" | "schedules">) => {
    return apiInstance.patch("/api/mentors/me/complete", profile);
  };

  patchMenteeProfile = (profile: Pick<Mentee, "introduction">) => {
    return apiInstance.patch("/api/mentees/me/complete", profile);
  };

  patchMentorSchedules = (schedules: Pick<Mentor, "period" | "schedules">) => {
    return apiInstance.patch("/api/mentors/me/schedules", schedules);
  };

  patchMentorInfo = (
    info: Omit<UpdateMentorInfoForm, "profileImageFile"> & Pick<Mentor, "profileImageUrl">
  ) => {
    return apiInstance.patch("/api/mentors/me/basic-info", info);
  };

  patchMenteeInfo = (
    info: Omit<UpdateMenteeInfoForm, "profileImageFile"> & Pick<Mentee, "profileImageUrl">
  ) => {
    return apiInstance.patch("/api/mentees/me/basic-info", info);
  };

  getUserById = async (id: string) => {
    const response = await apiInstance.get<ResponseType<DeprecatedMentor | DeprecatedMentee>>(
      `/api/users/${id}`
    );
    return response.data;
  };

  getMentorList = async () => {
    const response = await apiInstance.get<ResponseType<DeprecatedMentor[]>>("/api/users/mentor");
    return response.data;
  };

  getMenteeList = async () => {
    const response = await apiInstance.get<ResponseType<DeprecatedMentee[]>>("/api/users/mentee");
    return response.data;
  };

  postAvailableTimes = (availableTimesData: PostAvailableTimesRequest) => {
    return apiInstance.post("/api/users/available-time", availableTimesData);
  };
}

export const userApi = new UserApi();
