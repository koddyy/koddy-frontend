import { Time } from "@/types/mentor";

export const toTime = (HHMM: string): Time => {
  const [HH, MM] = HHMM.split(":");

  return {
    hour: Number(HH),
    minute: Number(MM),
  };
};

export const toHHMM = (time: Time) => {
  return String(time.hour).padStart(2, "0") + ":" + String(time.minute).padStart(2, "0");
};

export const compareHHMM = (timeA: string, timeB: string) => {
  if (timeA > timeB) return 1;
  else if (timeA < timeB) return -1;

  return 0;
};
