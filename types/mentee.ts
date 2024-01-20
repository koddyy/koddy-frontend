import { LanguageCode, User } from "./user";

export interface Mentee extends User {
  id: number;
  nationality: string;
  introduction?: string;
  languages: {
    main: LanguageCode;
    sub: LanguageCode[];
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
