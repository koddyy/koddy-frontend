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

export interface Schedules {
  schedulesByRepeat?: {
    dayOfWeek: Day[];
    start: string;
    end: string;
  };
  schedulesByNotRepeat?: Array<{
    dayOfWeek: Day;
    start: string;
    end: string;
  }>;
}

export interface UpdateSchedulesForm extends Pick<Mentor, "period">, Schedules {}

export interface CompleteProfileForm extends Pick<Mentor, "introduction">, UpdateSchedulesForm {}
