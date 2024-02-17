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
  "MENTOR_FINALLY_REJECT",
  "MENTOR_SUGGEST_COFFEE_CHAT_COMPLETE",

  "MENTEE_CANCEL",
  "MENTOR_CANCEL",
] as const;

export type CoffeeChatStatus = (typeof CoffeeChatStatusList)[number];

export const isValidCoffeeCathStatus = (status: string): status is CoffeeChatStatus => {
  return ["APPROVE", "APPLY", "SUGGEST", "PENDING", "COMPLETE", "CANCEL,REJECT"].includes(status);
};

export const CoffeeChatCategoryList = ["suggest", "waiting", "scheduled", "passed"] as const;

export type CoffeeChatCategory = (typeof CoffeeChatCategoryList)[number];

export const isValidCoffeeChatCategory = (category: string): category is CoffeeChatCategory => {
  return CoffeeChatCategoryList.includes(category as CoffeeChatCategory);
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
