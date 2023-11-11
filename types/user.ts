type UserType = "mentor" | "mentee";

type LanguageType = "KO" | "EN" | "CH" | "JP" | "VI";

type WeekType = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";

interface User {
  userId: string;
  name: string;
  mentorYn: "Y" | "N";
  email: string;
  school: string;
  grade?: number;
  major: string;
  nationality: string;
  zoomLink?: string;
  introduce?: string;
  languages: Array<{ languageId: LanguageType }>;
  availableTimes?: Array<{
    week: WeekType;
    startTime: string;
    endTime: string;
  }>;
}

export type { LanguageType, User, UserType, WeekType };
