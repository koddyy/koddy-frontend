import { CoffeeChatType } from "@/constants/coffeechat";

export interface PatchCoffeeChatMenteeApprovedRequest {
  coffeeChatId: number;
  start: string;
  end: string;
  question: string;
}

export interface PatchCoffeeChatRejectedRequest {
  coffeeChatId: number;
  rejectReason: string;
}

export interface PatchCoffeeChatMentorApprovedRequest {
  coffeeChatId: number;
  chatType: CoffeeChatType;
  chatValue: string;
}
