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

export type CoffeeChatCategory = "suggested" | "applied";

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
