import * as mentorForm from "@/app/signup/types/mentorForm";
import { LanguageCode, LanguageType } from "@/types/user";

/**
 * =========================
 * @TODO remove
 * =========================
 */

type FirstStepForm = mentorForm.FirstStepForm;

type SecondStepForm = Omit<mentorForm.SecondStepForm, "grade">;

type ThirdStepForm = Omit<mentorForm.ThirdStepForm, "zoomLink">;

/**
 *  =========================
 */

interface SignupForm {
  interestSchool: string;
  interestMajor: string;
  nationality: string;
  languages: Array<{ category: LanguageCode; type: LanguageType }>;
}

export type { FirstStepForm, SecondStepForm, SignupForm, ThirdStepForm };
