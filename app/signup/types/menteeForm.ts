import * as mentorForm from "@/app/signup/types/mentorForm";
import { LanguageType } from "@/types/user";

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
  languages: LanguageType[];
}

export type { FirstStepForm, SecondStepForm, SignupForm, ThirdStepForm };
