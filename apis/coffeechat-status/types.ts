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

export interface PatchCoffeeChatCanceledRequest {
  coffeeChatId: number;
  cancelReason: string;
}

export interface PatchCoffeeChatMentorApprovedRequest {
  coffeeChatId: number;
  chatType: Exclude<CoffeeChatType, "zoomAuto">;
  chatValue: string;
}

export interface PatchCoffeeChatApplyToApproveRequest {
  coffeeChatId: number;
  chatType: Exclude<CoffeeChatType, "zoomAuto">;
  chatValue: string;
  question: string;
}

export interface PatchCoffeeChatApplyToRejectRequest {
  coffeeChatId: number;
  rejectReason: string;
}

export interface PatchCoffeeChatToCancelRequest {
  coffeeChatId: number;
  cancelReason: string;
}
