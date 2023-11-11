type CoffeeChatStatus = "AGREE" | "REQUEST" | "SUGGEST" | "DONE" | "CANCEL";

type AvailableTimeRange = {
  startTime: string;
  endTime: string;
};

export type { AvailableTimeRange, CoffeeChatStatus };
