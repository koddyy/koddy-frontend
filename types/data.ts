type FirstStepData = {
  email: string;
  password: string;
  confirm_password: string;
};

type SecondStepData = {
  name: string;
  school: string;
  grade: number;
  major: string;
};

type ThirdStepData = {
  nationality: string;
  languages: string[];
  link?: string;
  introduce?: string;
};

const dayOfWeek = ["월", "화", "수", "목", "금", "토", "일"] as const;

type dayOfWeekType = typeof dayOfWeek;

type FourthStepData = {
  timeRange: { start?: string; end?: string };
  daysOfWeek: dayOfWeekType[];
};

export { dayOfWeek };
export type { dayOfWeekType, FirstStepData, FourthStepData, SecondStepData, ThirdStepData };
