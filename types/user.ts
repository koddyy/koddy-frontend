type Role = "mentor" | "mentee";

type LanguageType = "KO" | "EN" | "CH" | "JP" | "VI";

type WeekType = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";

type AvailableTimes = Array<{
  week: WeekType;
  startTime: string;
  endTime: string;
}>;

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
  availableTimes: AvailableTimes;
}

interface Mentee extends User {
  mentorYn: "N";
}

export type { AvailableTimes, LanguageType, Mentee, Mentor, Role, User, WeekType };
