export type CoffeeChatStatus = "received" | "canceled";

export type NotificationTextType = { [key in CoffeeChatStatus]: string };

export const NotificationText: {
  [key in "mentor" | "mentee"]: NotificationTextType;
} = {
  mentor: {
    received: "님에게 커피챗 신청이 왔어요.",
    canceled: "님이 커피챗을 취소했어요",
  },
  mentee: {
    received: "님에게 커피챗 제안이 왔어요",
    canceled: "님이 커피챗을 취소했어요",
  },
};
