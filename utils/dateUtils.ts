import { addMonths } from "date-fns";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";
import { localeCookie } from "./locale";
import { timezoneCookie } from "./timezone";

export const toYYYYMMDD = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const toHHMMSS = (date: Date) => {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};

export const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};

export const getToday = () => {
  const timeZone = timezoneCookie.get();
  const utc = new Date().toISOString();

  return utcToZonedTime(utc, timeZone);
};

export const getNextMonth = () => {
  return addMonths(getToday(), 1);
};

export const parseISO = (iso: string) => {
  const [yyyymmdd, hhmmss] = iso.split("T");

  return { yyyymmdd, hhmmss };
};

export const formatISO = (date: Date) => {
  const yyyymmdd = toYYYYMMDD(date);
  const hhmmss = toHHMMSS(date);

  return `${yyyymmdd}T${hhmmss}`;
};

export const hhmmssTohhmm = (hhmmss: string) => {
  const [hh, mm] = hhmmss.split(":");

  return [hh, mm].join(":");
};

export const formatDateTimeByLocale = (date: Date, options?: Intl.DateTimeFormatOptions) => {
  const locale = localeCookie.get();

  return new Intl.DateTimeFormat(locale, options).format(date);
};

/** timezone */

export const getZonedToday = (targetTimeZone = "Asia/Seoul") => {
  const utcISOString = new Date().toISOString();

  return utcToZonedTime(utcISOString, targetTimeZone);
};

export const localToZonedDate = (date: string, targetTimeZone = "Asia/Seoul") => {
  const localTimeZone = timezoneCookie.get();
  const utc = zonedTimeToUtc(date, localTimeZone);

  return utcToZonedTime(utc, targetTimeZone);
};

export const zonedToLocalDate = (date: string, sourceTimeZone = "Asia/Seoul") => {
  const utc = zonedTimeToUtc(date, sourceTimeZone);

  const localTimeZone = timezoneCookie.get();
  return utcToZonedTime(utc, localTimeZone);
};
