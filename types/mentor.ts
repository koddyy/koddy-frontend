import { LanguageType, User } from "./user";

export type Day = "월" | "화" | "수" | "목" | "금" | "토" | "일";

export type Time = { hour: number; minute: number };

export type TimeRange = {
  start: Time;
  end: Time;
};

export interface Mentor extends User {
  introduction?: string;
  languages: LanguageType[];
  school: string;
  major: string;
  enteredIn: number;
  schedules?: Array<{
    day: Day;
    start: Time;
    end: Time;
  }>;
}
