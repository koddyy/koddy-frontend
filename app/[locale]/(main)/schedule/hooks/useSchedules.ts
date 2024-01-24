import { useMemo } from "react";
import { useGetReservedSchedules } from "@/apis/mentor/hooks/useGetReservedSchedules";
import { Day } from "@/types/mentor";
import { toYYYYMMDD } from "@/utils/dateUtils";
import { toHHMM } from "@/utils/time";
import { createTimeRangeList, getDisabledDays } from "../utils/scheduleUtils";

export const useSchedules = (mentorId: number, currentDate: Date) => {
  const { data } = useGetReservedSchedules(mentorId, {
    year: currentDate?.getFullYear(),
    month: currentDate?.getMonth() + 1,
  });
  const { schedules, reserved } = data ?? {};

  const disabledDays = useMemo(
    () => getDisabledDays(schedules?.map(({ dayOfWeek }) => dayOfWeek) ?? []),
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

  const currentDay = new Intl.DateTimeFormat("ko-KR", {
    weekday: "short",
  }).format(currentDate) as Day;

  const availableTimeRangeList = useMemo(
    () =>
      timeRangeListPerDay?.[currentDay]?.filter((timeRange) => {
        return !reserved?.[toYYYYMMDD(currentDate)]?.some(
          ([start, end]) => start.startsWith(timeRange[0]) && end.startsWith(timeRange[1])
        );
      }),
    [currentDate, currentDay, reserved, timeRangeListPerDay]
  );

  return { disabledDays, availableTimeRangeList };
};
