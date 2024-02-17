import { ElementType } from "react";
import GoogleMeet from "@/assets/google_meet.svg";
import Zoom from "@/assets/zoom.svg";
import { CoffeeChatCategory, CoffeeChatStatus } from "@/types/coffeechat";
import { Role } from "@/types/user";

export type Meeting = "zoomAuto" | "zoom" | "google";

export type SNS = "kakao" | "line" | "wechat";

export type CoffeeChatType = Meeting | SNS;

export const CoffeeChatTypeLabel: Record<CoffeeChatType, string> = {
  zoomAuto: "Zoom (자동 연동)",
  zoom: "Zoom (수동 연동)",
  google: "Google meet (수동 연동)",
  kakao: "카카오톡",
  line: "라인",
  wechat: "위챗",
};

export const MeetingOptions: Meeting[] = ["zoomAuto", "zoom", "google"];

export const SNSOptions: SNS[] = ["kakao", "line", "wechat"];

export const CoffeeChatTypeIcon: Record<Meeting, ElementType> = {
  zoomAuto: Zoom,
  zoom: Zoom,
  google: GoogleMeet,
};

export const CoffeeChatStatusOptions: Record<CoffeeChatStatus, string> = {
  APPROVE: "예정",
  APPLY: "신청",
  SUGGEST: "제안",
  PENDING: "수락",
  COMPLETE: "완료",
  "CANCEL,REJECT": "취소",
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

export const CoffeeChatCategoryOptions: Record<Exclude<CoffeeChatCategory, "suggest">, string> = {
  waiting: "대기",
  scheduled: "예정",
  passed: "지난",
};
