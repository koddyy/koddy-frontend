import { WeekType } from "@/types/user";

export const getDisabledDays = (availableWeeks: WeekType[]) => {
  const days: WeekType[] = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const disabledDays = days.reduce((acc, cur, i) => {
    if (!availableWeeks.includes(cur)) return [...acc, i];
    return acc;
  }, [] as number[]);

  return disabledDays;
};

export const createTimeRangeList = (start: string, end: string, GAP = 30) => {
  const [startHH, startMM] = start.split(":").map(Number);
  const [endHH, endMM] = end.split(":").map(Number);

  const startTime = startHH * 60 + startMM;
  const endTime = endHH * 60 + endMM;

  return new Array(Math.floor((endTime - startTime) / GAP)).fill(startTime).map((startTime, i) => {
    const prevTime = startTime + i * GAP;
    const nextTime = startTime + (i + 1) * GAP;

    const prevHH = Math.floor(prevTime / 60)
      .toString()
      .padStart(2, "0");
    const prevMM = (prevTime % 60).toString().padStart(2, "0");

    const nextHH = Math.floor(nextTime / 60)
      .toString()
      .padStart(2, "0");
    const nextMM = (nextTime % 60).toString().padStart(2, "0");

    return [
      [prevHH, prevMM],
      [nextHH, nextMM],
    ];
  });
};
