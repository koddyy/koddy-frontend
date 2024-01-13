import { LanguageType, User } from "./user";

export type Day = "월" | "화" | "수" | "목" | "금" | "토" | "일";

export type Time = { hour: number; minute: number };

export type Period = {
  startDate?: string;
  endDate?: string;
};

export interface Mentor extends User {
  id: number;
  introduction?: string;
  languages: LanguageType[];
  school: string;
  major: string;
  enteredIn: number;
  schedules?: Array<
    {
      dayOfWeek?: Day;
      startTime?: Time;
      endTime?: Time;
    } & Period
  >;
  profileComplete: boolean;
  role: "mentor";
}
