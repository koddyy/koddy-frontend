import * as mentorForm from "@/app/signup/types/mentorForm";

type FirstStepForm = mentorForm.FirstStepForm;

type SecondStepForm = Omit<mentorForm.SecondStepForm, "grade">;

type ThirdStepForm = Omit<mentorForm.ThirdStepForm, "zoomLink">;

interface SignupForm extends FirstStepForm, SecondStepForm, ThirdStepForm {
  mentorYn: "N";
}

export type { FirstStepForm, SecondStepForm, SignupForm, ThirdStepForm };
