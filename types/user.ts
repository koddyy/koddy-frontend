type Role = "mentor" | "mentee";

type LanguageType = "KR" | "EN" | "CH" | "JP" | "VN";

interface User {
  name: string;
  email: string;
  profileImageUrl: string;
}

/**
 * =========================
 * @TODO remove
 * =========================
 */

type WeekType = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";

type AvailableTimes = Array<{
  week: WeekType;
  startTime: string;
  endTime: string;
}>;

interface Mentor {
  userId: string;
  name: string;
  email: string;
  school: string;
  major: string;
  nationality: string;
  languages: Array<{ languageId: LanguageType }>;
  introduce?: string;
  mentorYn: "Y";
  grade: number;
  zoomLink?: string;
  availableTimes: AvailableTimes;
}

interface Mentee {
  userId: string;
  name: string;
  email: string;
  school: string;
  major: string;
  nationality: string;
  languages: Array<{ languageId: LanguageType }>;
  introduce?: string;
  mentorYn: "N";
}

/**
 *  =========================
 */

export type { AvailableTimes, LanguageType, Mentee, Mentor, Role, User, WeekType };
