import { LanguageType, User } from "./user";

export interface Mentee extends User {
  id: number;
  nationality: string;
  introduction?: string;
  languages: LanguageType[];
  interestSchool: string;
  interestMajor: string;
  profileComplete: boolean;
  role: "mentee";
}
