import { useMemo } from "react";
import { Day, Mentor } from "@/types/mentor";
import { toHHMM } from "@/utils/time";
import { createTimeRangeList, getDisabledDays } from "../utils/scheduleUtils";

export const useSchedules = (schedules: NonNullable<Mentor["schedules"]>) => {
  const disabledDays = useMemo(
    () => getDisabledDays(schedules.map(({ dayOfWeek }) => dayOfWeek)),
    [schedules]
  );

  const timeRangeListPerDay = useMemo(() => {
    return schedules?.reduce(
      (acc, { dayOfWeek, start, end }) => ({
        ...acc,
        [dayOfWeek]: createTimeRangeList(toHHMM(start), toHHMM(end)),
      }),
      {} as { [key in Day]: string[][] }
    );
  }, [schedules]);

  return { disabledDays, timeRangeListPerDay };
};
