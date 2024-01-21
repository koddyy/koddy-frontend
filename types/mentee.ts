import { Nationality } from "@/constants/nationality";
import { NationCode, User } from "./user";

export interface Mentee extends User {
  id: number;
  nationality: Nationality;
  introduction?: string;
  languages: {
    main: NationCode;
    sub: NationCode[];
  };
  interestSchool: string;
  interestMajor: string;
  profileComplete: boolean;
  role: "mentee";
}

export type CompleteProfileForm = Pick<Mentee, "introduction">;

export interface UpdateMenteeInfoForm
  extends Pick<
    Mentee,
    | "name"
    | "interestSchool"
    | "interestMajor"
    | "nationality"
    | "languages"
    | "introduction"
    | "profileImageUrl"
  > {}
