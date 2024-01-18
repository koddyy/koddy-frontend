import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CompleteProfileForm } from "@/types/mentor";
import { convertPeriod, convertSchedules } from "@/utils/schedules";
import { userApi } from "../api";

export const useUpdateMentorProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      introduction,
      period,
      schedulesByRepeat,
      schedulesByNotRepeat,
    }: CompleteProfileForm) => {
      return userApi.patchMentorProfile({
        introduction,
        period: convertPeriod(period),
        schedules: convertSchedules({ schedulesByRepeat, schedulesByNotRepeat }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};
