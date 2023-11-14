type UserType = "mentor" | "mentee";

type LanguageType = "KO" | "EN" | "CH" | "JP" | "VI";

type WeekType = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";

interface User {
  userId: string;
  name: string;
  email: string;
  school: string;
  major: string;
  nationality: string;
  languages: Array<{ languageId: LanguageType }>;
  introduce?: string;
}

interface Mentor extends User {
  mentorYn: "Y";
  grade: number;
  zoomLink?: string;
  availableTimes: Array<{
    week: WeekType;
    startTime: string;
    endTime: string;
  }>;
}

interface Mentee extends User {
  mentorYn: "N";
}

export type { LanguageType, Mentee, Mentor, User, UserType, WeekType };
