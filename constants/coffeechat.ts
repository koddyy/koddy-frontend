import { CoffeeChatStatus } from "@/types/coffeechat";
import { UserType } from "@/types/user";

type CoffeeChatStatusTextType = Record<CoffeeChatStatus, string>;

export const CoffeeChatStatusText: Record<UserType, CoffeeChatStatusTextType> = {
  mentor: {
    AGREE: "커피챗 예정이에요",
    SUGGEST: "멘티에게 커피챗 제안을 했어요",
    REQUEST: "멘티에게 커피챗 신청이 왔어요",
    DONE: "커피챗을 완료했어요",
    CANCEL: "커피챗이 취소됐어요",
  },
  mentee: {
    AGREE: "커피챗 예정이에요",
    REQUEST: "멘토에게 커피챗 신청을 했어요",
    SUGGEST: "멘토에게 커피챗 제안이 왔어요",
    DONE: "커피챗을 완료했어요",
    CANCEL: "커피챗이 취소됐어요",
  },
};
