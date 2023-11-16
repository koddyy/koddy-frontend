import { WeekType } from "@/types/user";

type CoffeeChatStatus = "AGREE" | "REQUEST" | "SUGGEST" | "DONE" | "CANCEL";

type AvailableTimeRange = {
  startTime: string;
  endTime: string;
};

type AvailableTimes = AvailableTimeRange & {
  weeks: WeekType[];
};

export type { AvailableTimeRange, AvailableTimes, CoffeeChatStatus };
