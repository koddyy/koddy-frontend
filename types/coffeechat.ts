type CoffeeChatStatus = "AGREE" | "REQUEST" | "SUGGEST" | "DONE" | "CANCEL";

type AvailableTimeRange = {
  startTime: string;
  endTime: string;
};

type FirstStepData = {
  date: Date;
  time: string;
};

type SecondStepData = {
  question: string;
};

type CoffeeChatForm = FirstStepData & SecondStepData;

export type { AvailableTimeRange, CoffeeChatForm, CoffeeChatStatus, FirstStepData, SecondStepData };
