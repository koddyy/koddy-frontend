import { LanguageCode, User } from "./user";

export type Day = "월" | "화" | "수" | "목" | "금" | "토" | "일";

export type Time = { hour: number; minute: number };

export type Period = {
  startDate: string;
  endDate: string;
};

export interface Mentor extends User {
  id: number;
  introduction?: string;
  languages: {
    main: LanguageCode;
    sub: LanguageCode[];
  };
  school: string;
  major: string;
  enteredIn: number;
  period?: Period;
  schedules?: Array<{
    dayOfWeek: Day;
    start: Time;
    end: Time;
  }>;
  profileComplete: boolean;
  role: "mentor";
}

export interface CompleteProfileForm extends Pick<Mentor, "introduction" | "period"> {
  schedulesByWeek?: {
    dayOfWeek: Set<Day>;
    start: string;
    end: string;
  };
  schedulesByDay?: Array<{
    dayOfWeek: Day;
    start: string;
    end: string;
  }>;
}
