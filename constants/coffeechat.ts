import { CoffeeChatStatus } from "@/types/coffeechat";

type UserType = "mentor" | "mentee";

type CoffeeChatStatusTextType = { [key in CoffeeChatStatus]: string };

export const CoffeeChatStatusText: {
  [key in UserType]: CoffeeChatStatusTextType;
} = {
  mentor: {
    expected: "커피챗 예정이에요",
    requested: "멘티에게 커피챗 제안을 했어요",
    recieved: "멘티에게 커피챗 신청이 왔어요",
    completed: "커피챗을 완료했어요",
    canceled: "커피챗이 취소됐어요",
  },
  mentee: {
    expected: "커피챗 예정이에요",
    requested: "멘토에게 커피챗 신청을 했어요",
    recieved: "멘토에게 커피챗 제안이 왔어요",
    completed: "커피챗을 완료했어요",
    canceled: "커피챗이 취소됐어요",
  },
};
