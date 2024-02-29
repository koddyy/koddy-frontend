import { NationCode } from "./user";

export type Day = "월" | "화" | "수" | "목" | "금" | "토" | "일";

export type Time = { hour: number; minute: number };

export type Period = {
  startDate: string;
  endDate: string;
};

export interface Mentor {
  id: number;
  name: string;
  email: string;
  profileImageUrl?: string;
  introduction?: string;
  languages: {
    main: NationCode;
    sub: NationCode[];
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
    dayOfWeek: boolean[];
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

export interface UpdateMentorInfoForm
  extends Pick<
    Mentor,
    "name" | "school" | "major" | "enteredIn" | "languages" | "introduction" | "profileImageUrl"
  > {}
