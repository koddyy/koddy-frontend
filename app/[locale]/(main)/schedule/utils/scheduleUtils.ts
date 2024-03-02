import { DAYS } from "@/constants/date";
import { Day } from "@/types/mentor";
import { toHHMM } from "@/utils/time";

export const getDisabledDays = (availableDays: Day[]) => {
  const disabledDays = DAYS.reduce((acc, cur, i) => {
    if (!availableDays.includes(cur)) return [...acc, i === 6 ? 0 : i + 1];
    return acc;
  }, [] as number[]);

  return disabledDays;
};

export const createTimeRangeList = (start: string, end: string, GAP = 30) => {
  const [startHH, startMM] = start.split(":").map(Number);
  const [endHH, endMM] = end.split(":").map(Number);

  const startTime = startHH * 60 + startMM;
  const endTime = endHH * 60 + endMM;

  const MINUTES_PER_DAY = 24 * 60;
  const MinutesDiff =
    startTime < endTime ? endTime - startTime : endTime + (MINUTES_PER_DAY - startTime);

  return new Array(Math.floor(MinutesDiff / GAP)).fill(startTime).map((startTime, i) => {
    const prevTime = (startTime + i * GAP) % MINUTES_PER_DAY;
    const nextTime = (startTime + (i + 1) * GAP) % MINUTES_PER_DAY;

    const prevHH = Math.floor(prevTime / 60)
      .toString()
      .padStart(2, "0");
    const prevMM = (prevTime % 60).toString().padStart(2, "0");

    const nextHH = Math.floor(nextTime / 60)
      .toString()
      .padStart(2, "0");
    const nextMM = (nextTime % 60).toString().padStart(2, "0");

    return [`${prevHH}:${prevMM}`, `${nextHH}:${nextMM}`];
  });
};

export const getClosestNextTimeAfterCurrent = (current: Date, timeUnit: 30 | 60 = 30) => {
  const hour = current.getHours();
  const minute = current.getMinutes();

  if (timeUnit === 60) {
    return toHHMM({ hour: hour + 1, minute: 0 });
  }

  if (minute < 30) {
    return toHHMM({ hour, minute: 30 });
  } else {
    return toHHMM({ hour: hour + 1, minute: 0 });
  }
};
