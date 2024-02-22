import { addMonths } from "date-fns";

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
