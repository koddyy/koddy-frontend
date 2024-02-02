import { CoffeeChatCategory, CoffeeChatStatus } from "@/types/coffeechat";
import { Mentee } from "@/types/mentee";
import { Mentor } from "@/types/mentor";

export interface PostCoffeeChatFromMentorToMenteeRequest {
  menteeId: number;
  applyReason: string;
}

export interface PostCoffeeChatFromMentorToMenteeResponse {
  coffeeChatId: number;
}

export interface PostCoffeeChatFromMenteeToMentorRequest {
  mentorId: number;
  applyReason: string;
  start: string;
  end: string;
}

export interface PostCoffeeChatFromMenteeToMentorResponse {
  coffeeChatId: number;
}

export interface GetAppliedCoffeeChatListResponse {
  result: Array<
    Pick<
      Mentee,
      "id" | "name" | "profileImageUrl" | "nationality" | "interestSchool" | "interestMajor"
    >
  >;
  totalCount: number;
  hasNext: boolean;
}

export interface GetSuggestedCoffeeChatListResponse {
  result: Array<
    Pick<Mentor, "id" | "name" | "profileImageUrl" | "languages" | "school" | "major" | "enteredIn">
  >;
  totalCount: number;
  hasNext: boolean;
}

export interface GetCoffeeChatListRequest {
  category: CoffeeChatCategory;
  status?: CoffeeChatStatus;
  page: number;
}

export interface GetCoffeeChatListWithMentorResponse {
  result: Array<
    {
      id: number;
      status: CoffeeChatStatus;
      mentorId: number;
    } & Pick<Mentor, "name" | "profileImageUrl" | "school" | "major" | "enteredIn">
  >;
  hasNext: boolean;
}

export interface GetCoffeeChatListWithMenteeResponse {
  result: Array<
    {
      id: number;
      status: CoffeeChatStatus;
      menteeId: number;
    } & Pick<Mentee, "name" | "profileImageUrl" | "interestSchool" | "interestMajor">
  >;
  hasNext: boolean;
}

/**
 * =========================
 * @TODO remove
 * =========================
 */

export interface GetCoffeeChatByIdResponse {
  applicationId: string;
  mentor: Mentor;
  mentee: Mentee;
  status: CoffeeChatStatus;
  date?: string;
  startTime?: string;
  endTime?: string;
  statusDesc?: string;
  question?: string;
}

export type GetCoffeeChatListResponse = GetCoffeeChatByIdResponse[];

export interface PostCoffeeChatRequest {
  mentor: string;
  mentee: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  question?: string;
}

export interface PatchCoffeeChatStatusRequest {
  applicationId: string;
  status: CoffeeChatStatus;
  statusDesc?: string;
}
