import { Time } from "@/types/mentor";

export const toTime = (HHMM: string): Time => {
  const [HH, MM] = HHMM.split(":");

  return {
    hour: Number(HH),
    minute: Number(MM),
  };
};
