import { useQuery } from "@tanstack/react-query";
import { userApi } from "@/apis/user/api";
import { parseSchedules } from "@/utils/schedules";

export const useGetMeAsMentor = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: userApi.getMe,
    select: (me) => {
      if (me.role === "mentor") {
        const { isScheduleBy, schedulesByRepeat, schedulesByNotRepeat } = parseSchedules(
          me.schedules
        );

        return {
          ...me,
          isScheduleBy,
          schedulesByRepeat,
          schedulesByNotRepeat,
        };
      }
    },
    staleTime: Infinity,
  });
};
