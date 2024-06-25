import { useMemo } from "react";
import { useGetReservedSchedules } from "@/apis/mentor/hooks/useGetReservedSchedules";
import { toYYYYMMDD } from "@/utils/dateUtils";
import {
  convertReservedSchedulesToZoned,
  convertSchedulesDayOfWeekToDayIndex,
  createAvailableTimeSlots,
  createZonedMonthlySchedules,
  getAvailableMaxDate,
  getAvailableMinDate,
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
    minDate: period?.startDate ? getAvailableMinDate(period.startDate) : undefined,
    maxDate: period?.endDate ? getAvailableMaxDate(period.endDate) : undefined,
    monthlySchedules,
    availableTimeSlots,
  };
};
