import { CoffeeChatStatus } from "@/types/coffeechat";
import { Mentee, Mentor } from "@/types/user";

export interface GetCoffeeChatListResponseData {
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

export interface PostCoffeeChatRequest {
  mentor: string;
  mentee: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  question?: string;
}

export interface patchCoffeeChatStatusRequest {
  applicationId: string;
  status: CoffeeChatStatus;
  statusDesc?: string;
}
