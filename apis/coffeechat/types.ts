import { CoffeeChatStatus } from "@/types/coffeechat";
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
