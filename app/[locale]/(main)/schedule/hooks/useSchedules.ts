import { useMemo } from "react";
import { useGetReservedSchedules } from "@/apis/mentor/hooks/useGetReservedSchedules";
import { DAYS } from "@/constants/date";
import { getToday, toYYYYMMDD } from "@/utils/dateUtils";
import { compareHHMM, toHHMM } from "@/utils/time";
import {
  createTimeRangeList,
  getClosestNextTimeAfterCurrent,
  getDisabledDays,
} from "../utils/scheduleUtils";

export const useSchedules = (mentorId: number, currentDate: Date) => {
  const { data } = useGetReservedSchedules(mentorId, {
    year: currentDate?.getFullYear(),
    month: currentDate?.getMonth() + 1,
  });
  const { period, schedules, reserved } = data ?? {};

  const disabledDays = useMemo(
    () => getDisabledDays(schedules?.map(({ dayOfWeek }) => dayOfWeek) ?? []),
    [schedules]
  );

  const timeRangeListPerDay = useMemo(() => {
    return schedules?.reduce(
      (acc, { dayOfWeek, start, end }) => {
        return {
          ...acc,
          [DAYS.indexOf(dayOfWeek)]: createTimeRangeList(toHHMM(start), toHHMM(end)),
        };
      },
      {} as { [key: string]: string[][] }
    );
  }, [schedules]);

  const currentDay = currentDate.getDay();

  const availableTimeRangeList = useMemo(
    () =>
      timeRangeListPerDay?.[currentDay]?.filter((timeRange) => {
        return !reserved?.[toYYYYMMDD(currentDate)]?.some(
          ([start, end]) => start.startsWith(timeRange[0]) && end.startsWith(timeRange[1])
        );
      }),
    [currentDate, currentDay, reserved, timeRangeListPerDay]
  );

  const availableTimeRangeListOfToday = useMemo(() => {
    const today = getToday().getDay();
    const closestNextTime = getClosestNextTimeAfterCurrent(new Date());

    return timeRangeListPerDay?.[today]?.filter((timeRange) => {
      return compareHHMM(closestNextTime, timeRange[0]) !== 1;
    });
  }, [timeRangeListPerDay]);

  return {
    startDate: period?.startDate ? new Date(period.startDate) : undefined,
    endDate: period?.endDate ? new Date(period.endDate) : undefined,
    disabledDays,
    availableTimeRangeList,
    availableTimeRangeListOfToday,
  };
};
