import { GetReservedSchedulesResponse } from "@/apis/mentor/types";
import { DAYS } from "@/constants/date";
import { Day, Mentor } from "@/types/mentor";
import {
  formatLocalDateTime,
  getDaysInMonth,
  getToday,
  KSTtoZonedDate,
  parseLocalDateTime,
  toHHMMSS,
  toYYYYMMDD,
} from "@/utils/dateUtils";
import { compareHHMM, toHHMM } from "@/utils/time";

export const getDisabledDays = (availableDays: Day[]) => {
  const disabledDays = DAYS.reduce((acc, cur, i) => {
    if (!availableDays.includes(cur)) return [...acc, i === 6 ? 0 : i + 1];
    return acc;
  }, [] as number[]);

  return disabledDays;
};

/**
 * 요일 리터럴을 인덱스로 변경
 */
export const convertSchedulesDayOfWeekToDayIndex = (schedules: Mentor["schedules"]) => {
  return schedules?.map(({ dayOfWeek, start, end }) => {
    const dayIndex = DAYS.indexOf(dayOfWeek);
    return {
      dayOfWeek: dayIndex === 6 ? 0 : dayIndex + 1,
      start,
      end,
    };
  });
};

/**
 * 예약된 스케줄 타임존 반영
 */
export const convertReservedSchedulesToZoned = (
  reserved: GetReservedSchedulesResponse["reserved"]
) => {
  return reserved?.reduce(
    (acc, { start, end }) => {
      const zonedStart = formatLocalDateTime(KSTtoZonedDate(start));
      const zonedEnd = formatLocalDateTime(KSTtoZonedDate(end));

      const { yyyymmdd, hhmmss: startHhmmss } = parseLocalDateTime(zonedStart);
      const { hhmmss: endHhmmss } = parseLocalDateTime(zonedEnd);

      return {
        ...acc,
        [yyyymmdd]: [...(acc[yyyymmdd] ?? []), [startHhmmss, endHhmmss]],
      };
    },
    {} as { [key: string]: string[][] }
  );
};

/**
 * 로컬 타임존이 반영된 월별 스케줄 생성
 */
export const createZonedMonthlySchedules = (
  year: number,
  month: number,
  schedules: ReturnType<typeof convertSchedulesDayOfWeekToDayIndex>
) => {
  const datesInYearMonth = Array.from(
    { length: getDaysInMonth(year, month) },
    (_, i) => new Date(year, month - 1, i + 1)
  );

  return datesInYearMonth.reduce(
    (acc, date) => {
      const schedule = schedules?.find(({ dayOfWeek }) => dayOfWeek === date.getDay());
      if (!schedule) return acc;

      const { start, end } = schedule;

      const startTime = new Date(date);
      startTime.setHours(start.hour, start.minute);

      const endTime = new Date(date);
      endTime.setHours(end.hour, end.minute);

      const zonedStartTime = KSTtoZonedDate(formatLocalDateTime(startTime));
      const zonedEndTime = KSTtoZonedDate(formatLocalDateTime(endTime));

      const zonedStartYYYYMMDD = toYYYYMMDD(zonedStartTime);
      const zonedEndYYYYMMDD = toYYYYMMDD(zonedEndTime);

      if (zonedStartYYYYMMDD === zonedEndYYYYMMDD) {
        return {
          ...acc,
          [zonedStartYYYYMMDD]: [
            ...(acc[zonedStartYYYYMMDD] ?? []),
            { start: zonedStartTime, end: zonedEndTime },
          ],
        };
      } else {
        const beforeMidnight = new Date(startTime);
        beforeMidnight.setHours(24, 0);

        const midnight = new Date(endTime);
        midnight.setHours(0, 0);

        return {
          ...acc,
          [zonedStartYYYYMMDD]: [
            ...(acc[zonedStartYYYYMMDD] ?? []),
            { start: zonedStartTime, end: beforeMidnight },
          ],
          [zonedEndYYYYMMDD]: [
            ...(acc[zonedEndYYYYMMDD] ?? []),
            { start: midnight, end: zonedEndTime },
          ],
        };
      }
    },
    {} as { [yyyymmdd: string]: Array<{ start: Date; end: Date }> }
  );
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

/**
 * 예약 가능한 타임 슬롯 생성
 */
export const createAvailableTimeSlots = (
  currentDate: Date,
  dailySchedules: ReturnType<typeof createZonedMonthlySchedules>[string],
  reservedSchedules: ReturnType<typeof convertReservedSchedulesToZoned>[string]
) => {
  const currentYYYYMMDD = toYYYYMMDD(currentDate);

  if (!dailySchedules) return [];

  const timeSlots = dailySchedules.reduce((acc, schedule) => {
    const { start, end } = schedule;

    return [...acc, ...createTimeRangeList(toHHMMSS(start), toHHMMSS(end))];
  }, [] as string[][]);

  const isReservedTimeSlot = (start: string, end: string) => {
    return reservedSchedules?.some(
      ([reservedStart, reservedEnd]) =>
        reservedStart.startsWith(start) && reservedEnd.startsWith(end)
    );
  };

  const isPassedTimeSlot = (start: string) => {
    const isToday = currentYYYYMMDD === toYYYYMMDD(new Date());

    if (isToday) {
      const closestNextTime = getClosestNextTimeAfterCurrent(getToday());
      return compareHHMM(closestNextTime, start) === 1;
    }

    return false;
  };

  return timeSlots.filter(
    ([start, end]) => !isReservedTimeSlot(start, end) && !isPassedTimeSlot(start)
  );
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
