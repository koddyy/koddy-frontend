import { ElementType } from "react";
import GoogleMeet from "@/assets/google_meet.svg";
import Zoom from "@/assets/zoom.svg";
import {
  CoffeeChatCategory,
  PassedCoffeeChatStatusList,
  WaitingCoffeeChatStatusList,
} from "@/types/coffeechat";

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

export const isMeetingOptions = (option: string): option is Meeting => {
  return MeetingOptions.includes(option as Meeting);
};

export const isSNSOptions = (option: string): option is SNS => {
  return SNSOptions.includes(option as SNS);
};

export const CoffeeChatTypeIcon: Record<Meeting, ElementType> = {
  zoomAuto: Zoom,
  zoom: Zoom,
  google: GoogleMeet,
};

export const CoffeeChatCategoryOptions: Record<Exclude<CoffeeChatCategory, "suggested">, string> = {
  waiting: "대기",
  scheduled: "예정",
  passed: "지난",
};

export const CoffeeChatStatusOptions: {
  waiting: typeof WaitingCoffeeChatStatusList;
  passed: typeof PassedCoffeeChatStatusList;
} = {
  waiting: WaitingCoffeeChatStatusList,
  passed: PassedCoffeeChatStatusList,
};
