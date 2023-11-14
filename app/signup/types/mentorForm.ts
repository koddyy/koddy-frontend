import { AvailableTimeRange } from "@/types/coffeechat";
import { LanguageType, WeekType } from "@/types/user";

type FirstStepForm = {
  email: string;
  password: string;
};

type SecondStepForm = {
  name: string;
  school: string;
  grade: number;
  major: string;
};

type ThirdStepForm = {
  nationality: string;
  languages: LanguageType[];
  zoomLink?: string;
  introduce?: string;
};

type FourthStepForm = {
  availableTimes: Array<AvailableTimeRange & { week: WeekType }>;
};

interface SignupForm extends FirstStepForm, SecondStepForm, ThirdStepForm, FourthStepForm {
  mentorYn: "Y";
}

export type { FirstStepForm, FourthStepForm, SecondStepForm, SignupForm, ThirdStepForm };
