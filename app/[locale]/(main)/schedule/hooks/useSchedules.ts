import { useMemo } from "react";
import { useGetReservedSchedules } from "@/apis/mentor/hooks/useGetReservedSchedules";
import { getKSTToday, toKSTDate, toYYYYMMDD } from "@/utils/dateUtils";
import {
  convertReservedSchedulesToZoned,
  convertSchedulesDayOfWeekToDayIndex,
  createAvailableTimeSlots,
  createZonedMonthlySchedules,
} from "../utils/scheduleUtils";

export const useSchedules = (mentorId: number, currentDate: Date) => {
  const { year, month } = {
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1,
  };

  const { data } = useGetReservedSchedules(mentorId, { year, month });
  const { period, schedules, reserved } = data ?? {};

  const monthlySchedules = useMemo(
    () => createZonedMonthlySchedules(year, month, convertSchedulesDayOfWeekToDayIndex(schedules)),
    [month, schedules, year]
  );

  const reservedSchedules = useMemo(
    () => convertReservedSchedulesToZoned(reserved ?? []),
    [reserved]
  );

  const availableTimeSlots = useMemo(
    () =>
      createAvailableTimeSlots(
        currentDate,
        monthlySchedules[toYYYYMMDD(currentDate)],
        reservedSchedules[toYYYYMMDD(currentDate)]
      ),
    [currentDate, monthlySchedules, reservedSchedules]
  );

  return {
    minDate: period?.startDate
      ? toKSTDate(
          period.startDate < toYYYYMMDD(getKSTToday())
            ? toYYYYMMDD(getKSTToday())
            : period.startDate
        )
      : undefined,
    maxDate: period?.endDate ? toKSTDate(period.endDate) : undefined,
    monthlySchedules,
    availableTimeSlots,
  };
};
