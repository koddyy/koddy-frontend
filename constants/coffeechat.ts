import { ElementType } from "react";
import GoogleMeet from "@/assets/google_meet.svg";
import Zoom from "@/assets/zoom.svg";
import {
  CoffeeChatCategory,
  PassedCoffeeChatStatusList,
  WaitingCoffeeChatStatusList,
} from "@/types/coffeechat";

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

export const isMeetingOptions = (option: string): option is Meeting => {
  return MeetingOptions.includes(option as Meeting);
};

export const isSNSOptions = (option: string): option is SNS => {
  return SNSOptions.includes(option as SNS);
};

export const CoffeeChatTypeIcon: Record<Meeting, ElementType> = {
  zoom: Zoom,
  google: GoogleMeet,
};

export const CoffeeChatCategoryOptions: Array<Exclude<CoffeeChatCategory, "suggested">> = [
  "waiting",
  "scheduled",
  "passed",
];

export const CoffeeChatStatusOptions: {
  waiting: typeof WaitingCoffeeChatStatusList;
  passed: typeof PassedCoffeeChatStatusList;
} = {
  waiting: WaitingCoffeeChatStatusList,
  passed: PassedCoffeeChatStatusList,
};
