import { WeekType } from "@/types/user";

export interface MenteeApplyForm {
  date: Date;
  timeRange: [string, string];
  question: string;
}

export type CoffeeChatStatus =
  | "APPROVE"
  | "APPLY"
  | "SUGGEST"
  | "PENDING"
  | "COMPLETE"
  | "CANCEL,REJECT";

export const isValidCoffeeCathStatus = (status: string): status is CoffeeChatStatus => {
  return ["APPROVE", "APPLY", "SUGGEST", "PENDING", "COMPLETE", "CANCEL,REJECT"].includes(status);
};

export type CoffeeChatCategory = "suggested" | "applied";

export const isValidCoffeeChatCategory = (category: string): category is CoffeeChatCategory => {
  return category === "suggested" || category === "applied";
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
