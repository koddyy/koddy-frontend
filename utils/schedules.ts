import { Mentor, Schedules } from "@/types/mentor";
import { toTime } from "./time";

export const convertPeriod = (period: Mentor["period"]) => {
  if (period && period.startDate && period.endDate) return period;
};

export const convertSchedules = ({ schedulesByRepeat, schedulesByNotRepeat }: Schedules) => {
  if (schedulesByRepeat) {
    return [...schedulesByRepeat.dayOfWeek].map((dayOfWeek) => ({
      dayOfWeek,
      start: toTime(schedulesByRepeat.start),
      end: toTime(schedulesByRepeat.end),
    }));
  } else if (schedulesByNotRepeat) {
    return schedulesByNotRepeat.map((schedule) => ({
      dayOfWeek: schedule.dayOfWeek,
      start: toTime(schedule.start),
      end: toTime(schedule.end),
    }));
  }
};
