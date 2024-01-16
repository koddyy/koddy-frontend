import { AvailableTimeRange } from "@/types/coffeechat";
import { Mentor } from "@/types/mentor";
import { LanguageType, WeekType } from "@/types/user";

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

type SignupForm = Pick<Mentor, "school" | "enteredIn" | "major" | "languages">;

export type { FirstStepForm, FourthStepForm, SecondStepForm, SignupForm, ThirdStepForm };
