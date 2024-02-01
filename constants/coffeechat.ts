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

export const CoffeeChatStatusText: Record<Role, Record<CoffeeChatStatus, string>> = {
  mentor: {
    APPROVE: "커피챗 예정이에요",
    APPLY: "커피챗 신청이 왔어요",
    SUGGEST: "커피챗 제안을 했어요",
    PENDING: "커피챗을 수락했어요",
    COMPLETE: "커피챗을 완료했어요",
    "CANCEL,REJECT": "커피챗이 취소됐어요",
  },
  mentee: {
    APPROVE: "커피챗 예정이에요",
    APPLY: "커피챗 신청을 했어요",
    SUGGEST: "커피챗 제안이 왔어요",
    PENDING: "커피챗 제안을 수락했어요",
    COMPLETE: "커피챗을 완료했어요",
    "CANCEL,REJECT": "커피챗이 취소됐어요",
  },
};
