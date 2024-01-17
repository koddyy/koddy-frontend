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
