import * as mentorForm from "@/app/signup/types/mentorForm";
import { Mentee } from "@/types/mentee";

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

type SignupForm = Pick<Mentee, "interestSchool" | "interestMajor" | "nationality" | "languages">;

export type { FirstStepForm, SecondStepForm, SignupForm, ThirdStepForm };
