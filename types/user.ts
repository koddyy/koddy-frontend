type Role = "mentor" | "mentee";

type LanguageType = "메인 언어" | "서브 언어";

type LanguageCode = "KR" | "EN" | "CH" | "JP" | "VN";

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
  languages: Array<{ languageId: LanguageCode }>;
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
  languages: Array<{ languageId: LanguageCode }>;
  introduce?: string;
  mentorYn: "N";
}

/**
 *  =========================
 */

export type { AvailableTimes, LanguageCode, LanguageType, Mentee, Mentor, Role, User, WeekType };
