import { CoffeeChatStatus } from "@/types/coffeechat";
import { User } from "@/types/user";

export interface GetCoffeeChatListResponseData {
  applicationId: string;
  mentor: User;
  mentee: User;
  status: CoffeeChatStatus;
}

export interface PostCoffeeChatRequest {
  mentor: string;
  mentee: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  question?: string;
}
