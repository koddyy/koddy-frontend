import { useQuery } from "@tanstack/react-query";
import { parseLocalDateTime } from "@/utils/dateUtils";
import { mentorApi } from "../api";
import { GetReservedSchedulesRequest } from "../types";

export const useGetReservedSchedules = (
  mentorId: number,
  { year, month }: GetReservedSchedulesRequest
) => {
  return useQuery({
    queryKey: ["reservedSchedules"],
    queryFn: () => mentorApi.getReservedSchedules(mentorId, { year, month }),
    select: ({ reserved, ...rest }) => ({
      reserved: reserved.reduce(
        (acc, { start, end }) => {
          const { yyyymmdd, hhmmss: startHhmmss } = parseLocalDateTime(start);
          const { hhmmss: endHhmmss } = parseLocalDateTime(end);

          return {
            ...acc,
            [yyyymmdd]: [...(acc[yyyymmdd] ?? []), [startHhmmss, endHhmmss]],
          };
        },
        {} as { [key in string]: string[][] }
      ),
      ...rest,
    }),
  });
};
