import { ElementType } from "react";
import GoogleMeet from "@/assets/google_meet.svg";
import Zoom from "@/assets/zoom.svg";
import { CoffeeChatStatus } from "@/types/coffeechat";
import { Role } from "@/types/user";

export type Meeting = "zoom" | "google";

export type SNS = "kakao" | "line" | "wechat";

export type CoffeeChatType = Meeting | SNS;

export const CoffeeChatTypeLabel: Record<CoffeeChatType, string> = {
  zoom: "Zoom",
  google: "Google meet",
  kakao: "카카오톡",
  line: "라인",
  wechat: "위챗",
};

export const MeetingOptions: Meeting[] = ["zoom", "google"];

export const SNSOptions: SNS[] = ["kakao", "line", "wechat"];

export const CoffeeChatTypeIcon: Record<Meeting, ElementType> = {
  zoom: Zoom,
  google: GoogleMeet,
};

type CoffeeChatStatusTextType = Record<CoffeeChatStatus, string>;

export const CoffeeChatStatusText: Record<Role, CoffeeChatStatusTextType> = {
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
