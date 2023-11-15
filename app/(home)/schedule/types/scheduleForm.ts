type FirstStep = {
  date: Date;
  timeRange: string;
};

type SecondStep = {
  question: string;
};

type ScheduleForm = FirstStep & SecondStep;

export type { FirstStep, ScheduleForm, SecondStep };
