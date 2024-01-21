import { WeekType } from "@/types/user";

export interface MenteeApplyForm {
  date: Date;
  timeRange: [string, string];
  question: string;
}

/**
 * =========================
 * @TODO remove
 * =========================
 */

type CoffeeChatStatus = "AGREE" | "REQUEST" | "SUGGEST" | "DONE" | "CANCEL";

type AvailableTimeRange = {
  startTime: string;
  endTime: string;
};

type AvailableTimes = AvailableTimeRange & {
  weeks: WeekType[];
};

export type { AvailableTimeRange, AvailableTimes, CoffeeChatStatus };
