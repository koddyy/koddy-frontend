export interface PatchCoffeeChatMenteeApprovedRequest {
  coffeeChatId: number;
  start: string;
  end: string;
}

export interface PatchCoffeeChatMenteeRejectedRequest {
  coffeeChatId: number;
  rejectReason: string;
}
