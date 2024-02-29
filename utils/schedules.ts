import { DAYS } from "@/constants/date";
import { Mentor, Schedules } from "@/types/mentor";
import { toHHMM, toTime } from "./time";

export const convertPeriod = (period: Mentor["period"]) => {
  if (period && period.startDate && period.endDate) return period;
};

export const convertSchedules = ({ schedulesByRepeat, schedulesByNotRepeat }: Schedules) => {
  if (schedulesByRepeat) {
    return DAYS.filter((_, i) => schedulesByRepeat.dayOfWeek[i]).map((dayOfWeek) => ({
      dayOfWeek,
      start: toTime(schedulesByRepeat.start),
      end: schedulesByRepeat.end === "24:00" ? toTime("23:59") : toTime(schedulesByRepeat.end),
    }));
  } else if (schedulesByNotRepeat) {
    return schedulesByNotRepeat.map((schedule) => ({
      dayOfWeek: schedule.dayOfWeek,
      start: toTime(schedule.start),
      end: schedule.end === "24:00" ? toTime("23:59") : toTime(schedule.end),
    }));
  }
};

export const parseSchedules = (_schedules: Mentor["schedules"]) => {
  if (!_schedules || _schedules.length === 0) return {};

  /** @NOTE "24:00" 시간에 대한 예외 처리를 위해 "23:59"로 변환 */
  const schedules =
    _schedules.map((v) => ({
      ...v,
      start: toHHMM(v.start),
      end: toHHMM(v.end) === "23:59" ? "24:00" : toHHMM(v.end),
    })) ?? [];

  const isRepeat = schedules.every(
    ({ start, end }) => start === schedules[0].start && end === schedules[0].end
  );

  if (isRepeat) {
    return {
      isScheduleBy: "REPEAT" as const,
      schedulesByRepeat: {
        dayOfWeek: DAYS.map((v) => schedules.some(({ dayOfWeek }) => v === dayOfWeek)),
        start: schedules[0].start,
        end: schedules[0].end,
      },
    };
  }

  return {
    isScheduleBy: "NOT_REPEAT" as const,
    schedulesByNotRepeat: schedules.map((v) => ({
      ...v,
      start: v.start,
      end: v.end,
    })),
  };
};
