import { apiInstance } from "@/apis/axios";
import {
  GetMenteeByIdResponse,
  GetMenteeListRequest,
  GetMenteeListResponse,
  GetMentorByIdResponse,
  GetMentorListRequest,
  GetMentorListResponse,
  PostAvailableTimesRequest,
} from "@/apis/user/types";
import type { SignupForm as MenteeSignupForm } from "@/app/[locale]/signup/types/menteeForm";
import type { SignupForm as MentorSignupForm } from "@/app/[locale]/signup/types/mentorForm";
import { ProviderState } from "@/stores/provider";
import type { Mentee, UpdateMenteeInfoForm } from "@/types/mentee";
import type { Mentor, UpdateMentorInfoForm } from "@/types/mentor";
import type { User } from "@/types/user";

class UserApi {
  signupAsMentor = (
    signupForm: MentorSignupForm & User & Required<Pick<ProviderState, "provider" | "socialId">>
  ) => {
    return apiInstance.post("/api/mentors", signupForm);
  };

  signupAsMentee = (
    signupForm: MenteeSignupForm & User & Required<Pick<ProviderState, "provider" | "socialId">>
  ) => {
    return apiInstance.post("/api/mentees", signupForm);
  };

  signout = () => {
    return apiInstance.delete("/api/members");
  };

  getMe = async () => {
    const response = await apiInstance.get<Mentor | Mentee>("/api/members/me");
    return response.data;
  };

  getMentorById = async (mentorId: number) => {
    const response = await apiInstance.get<GetMentorByIdResponse>(`/api/mentors/${mentorId}`);
    return response.data;
  };

  getMenteeById = async (menteeId: number) => {
    const response = await apiInstance.get<GetMenteeByIdResponse>(`/api/mentors/${menteeId}`);
    return response.data;
  };

  getMentorList = async ({ page, languages }: GetMentorListRequest) => {
    const response = await apiInstance.get<GetMentorListResponse>("/api/mentors", {
      params: {
        page,
        languages,
      },
    });
    return response.data;
  };

  getMenteeList = async ({ page, nationalities, languages }: GetMenteeListRequest) => {
    const response = await apiInstance.get<GetMenteeListResponse>("/api/mentees", {
      params: {
        page,
        nationalities,
        languages,
      },
    });
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

  /** deprecated */

  getUserById = async (id: number) => {
    const response = await apiInstance.get<Mentor | Mentee>(`/api/users/${id}`);
    return response.data;
  };

  postAvailableTimes = (availableTimesData: PostAvailableTimesRequest) => {
    return apiInstance.post("/api/users/available-time", availableTimesData);
  };
}

export const userApi = new UserApi();
