import { CoffeeChatStatus } from "@/types/coffeechat";
import { Mentee, Mentor } from "@/types/user";

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
