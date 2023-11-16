import { AvailableTimes as ClientAvailableTimes } from "@/types/coffeechat";
import { AvailableTimes } from "@/types/user";

export const convertAvailableTimes = (availableTimes: AvailableTimes): ClientAvailableTimes => {
  const weeks = availableTimes.map(({ week }) => week);
  const { startTime, endTime } = availableTimes[0];

  return { weeks, startTime, endTime };
};

export const revertAvailableTimes = (availableTimes: ClientAvailableTimes): AvailableTimes => {
  const { weeks, startTime, endTime } = availableTimes;

  return weeks.map((week) => ({ week, startTime, endTime }));
};
