import { Language, Nationality } from "./user";

export interface Mentee {
  id: number;
  name: string;
  email: string;
  profileImageUrl?: string;
  nationality: Nationality;
  introduction?: string;
  languages: {
    main: Language;
    sub: Language[];
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
