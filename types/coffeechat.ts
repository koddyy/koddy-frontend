import { WeekType } from "@/types/user";

export interface MenteeApplyForm {
  date: Date;
  timeRange: [string, string];
  question: string;
}

export const CoffeeChatStatusList = [
  /** mentee apply flow */
  "MENTEE_APPLY",
  "MENTOR_APPROVE",
  "MENTOR_REJECT",
  "MENTEE_APPLY_COFFEE_CHAT_COMPLETE",

  /** mentor suggest flow */
  "MENTOR_SUGGEST",
  "MENTEE_PENDING",
  "MENTEE_REJECT",
  "MENTOR_FINALLY_APPROVE",
  "MENTOR_FINALLY_CANCEL",
  "MENTOR_SUGGEST_COFFEE_CHAT_COMPLETE",

  "CANCEL_FROM_MENTEE_FLOW",
  "CANCEL_FROM_MENTOR_FLOW",

  "AUTO_CANCEL_FROM_MENTEE_FLOW",
  "AUTO_CANCEL_FROM_MENTOR_FLOW",
] as const;

export type CoffeeChatStatus = (typeof CoffeeChatStatusList)[number];

export const isValidCoffeeCathStatus = (status: string): status is CoffeeChatStatus => {
  return CoffeeChatStatusList.includes(status as CoffeeChatStatus);
};

export const CoffeeChatCategoryList = ["suggested", "waiting", "scheduled", "passed"] as const;

export type CoffeeChatCategory = (typeof CoffeeChatCategoryList)[number];

export const isValidCoffeeChatCategory = (
  category: string
): category is Exclude<CoffeeChatCategory, "suggested"> => {
  if (category === "suggested") return false;

  return CoffeeChatCategoryList.includes(category as CoffeeChatCategory);
};

export const WaitingCoffeeChatStatusList = ["apply", "pending"] as const;
export const PassedCoffeeChatStatusList = ["complete", "reject", "cancel"] as const;

export type WaitingCoffeeChatStatus = (typeof WaitingCoffeeChatStatusList)[number];
export type PassedCoffeeChatStatus = (typeof PassedCoffeeChatStatusList)[number];

export const isValidWaitingCoffeeChatStatus = (
  status: string
): status is WaitingCoffeeChatStatus => {
  return WaitingCoffeeChatStatusList.includes(status as WaitingCoffeeChatStatus);
};

export const isValidPassedCoffeChatStatus = (status: string): status is PassedCoffeeChatStatus => {
  return PassedCoffeeChatStatusList.includes(status as PassedCoffeeChatStatus);
};

/**
 * =========================
 * @TODO remove
 * =========================
 */

type AvailableTimeRange = {
  startTime: string;
  endTime: string;
};

type AvailableTimes = AvailableTimeRange & {
  weeks: WeekType[];
};

export type { AvailableTimeRange, AvailableTimes };
