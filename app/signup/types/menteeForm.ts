import { Mentee } from "@/types/mentee";

export type SignupForm = Pick<
  Mentee,
  "interestSchool" | "interestMajor" | "nationality" | "languages"
>;
