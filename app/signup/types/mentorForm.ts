import { AvailableTimeRange } from "@/types/coffeechat";
import { LanguageCode, LanguageType, WeekType } from "@/types/user";

/**
 * =========================
 * @TODO remove
 * =========================
 */

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

/**
 *  =========================
 */

type SignupForm = {
  school: string;
  enteredIn: number;
  major: string;
  languages: Array<{ category: LanguageCode; type: LanguageType }>;
};

export type { FirstStepForm, FourthStepForm, SecondStepForm, SignupForm, ThirdStepForm };
