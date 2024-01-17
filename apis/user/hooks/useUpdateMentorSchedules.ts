import { QueryClient, useMutation } from "@tanstack/react-query";
import { UpdateSchedulesForm } from "@/types/mentor";
import { convertPeriod, convertSchedules } from "@/utils/schedules";
import { userApi } from "../api";

export const useUpdateMentorSchedules = () => {
  const queryClient = new QueryClient();

  return useMutation({
    mutationFn: ({ period, schedulesByRepeat, schedulesByNotRepeat }: UpdateSchedulesForm) => {
      return userApi.patchMentorSchedules({
        period: convertPeriod(period),
        schedules: convertSchedules({ schedulesByRepeat, schedulesByNotRepeat }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
  });
};