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

type LanguageType = "KO" | "EN" | "CH" | "JP" | "VI";

type ThirdStepData = {
  nationality: string;
  languages: LanguageType[];
  zoomLink?: string;
  introduce?: string;
};

type WeekType = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";

type AvailableTimeRange = {
  startTime: string;
  endTime: string;
};

type FourthStepData = {
  availableTimes: (AvailableTimeRange & { week: WeekType })[];
};

type SignupFormData = Omit<FirstStepData, "confirm_password"> &
  SecondStepData &
  ThirdStepData &
  FourthStepData;

export type {
  AvailableTimeRange,
  FirstStepData,
  FourthStepData,
  LanguageType,
  SecondStepData,
  SignupFormData,
  ThirdStepData,
  WeekType,
};
