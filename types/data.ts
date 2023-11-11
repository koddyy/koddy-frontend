import { AvailableTimeRange } from "@/types/coffeechat";
import { LanguageType, WeekType } from "@/types/user";

type FirstStepData = {
  email: string;
  password: string;
  confirm_password?: string;
};

type SecondStepData = {
  name: string;
  school: string;
  grade: number;
  major: string;
};

type ThirdStepData = {
  nationality: string;
  languages: LanguageType[];
  zoomLink?: string;
  introduce?: string;
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
