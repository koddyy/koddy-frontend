import { apiInstance } from "../axios";
import { GetReservedSchedulesRequest, GetReservedSchedulesResponse } from "./types";

export const mentorApi = {
  getReservedSchedules: async (mentorId: number, { year, month }: GetReservedSchedulesRequest) => {
    const response = await apiInstance.get<GetReservedSchedulesResponse>(
      `/api/mentors/${mentorId}/reserved-schedule`,
      {
        params: {
          year,
          month,
        },
      }
    );
    return (await response).data;
  },
};
