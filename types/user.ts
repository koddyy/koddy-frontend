export type Role = "mentor" | "mentee";

export type Language = "KO" | "EN" | "CN" | "JA" | "VI";

export type Nationality = "KR" | "US" | "CN" | "JP" | "VN" | "ETC";
export interface User {
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

/**
 *  =========================
 */

export type { AvailableTimes, WeekType };
