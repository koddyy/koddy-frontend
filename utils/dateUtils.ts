import { addMonths } from "date-fns";
import { toDate, utcToZonedTime } from "date-fns-tz";
import { timezoneCookie } from "./timezone";

export const toYYYYMMDD = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};

export const getToday = () => {
  return new Date();
};

export const getNextMonth = () => {
  return addMonths(getToday(), 1);
};

export const parseLocalDateTime = (localDateTime: string) => {
  const [yyyymmdd, hhmmss] = localDateTime.split("T");

  return { yyyymmdd, hhmmss };
};

export const hhmmssTohhmm = (hhmmss: string) => {
  const [hh, mm] = hhmmss.split(":");

  return [hh, mm].join(":");
};

/** KST */

export const getKSTToday = () => {
  const utcISOString = new Date().toISOString();

  return utcToZonedTime(utcISOString, "Asia/Seoul");
};

export const toKSTDate = (date: string) => {
  const utc = new Date(date).toISOString();

  return utcToZonedTime(utc, "Asia/Seoul");
};

/** @NOTE offset이 포함되지 않은 date 문자열 */
export const KSTtoZonedDate = (date: string) => {
  const localTime = toDate(date, { timeZone: "Asia/Seoul" });

  const timeZone = timezoneCookie.get();
  return utcToZonedTime(localTime.toISOString(), timeZone);
};
