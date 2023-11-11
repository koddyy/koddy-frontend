type CoffeeChatStatus = "expected" | "requested" | "recieved" | "completed" | "canceled";

type AvailableTimeRange = {
  startTime: string;
  endTime: string;
};

export type { AvailableTimeRange, CoffeeChatStatus };
