import { useQuery } from "@tanstack/react-query";
import { mentorApi } from "../api";
import { GetReservedSchedulesRequest } from "../types";

export const useGetReservedSchedules = (
  mentorId: number,
  { year, month }: GetReservedSchedulesRequest
) => {
  return useQuery({
    queryKey: ["reservedSchedules"],
    queryFn: () => mentorApi.getReservedSchedules(mentorId, { year, month }),
  });
};
