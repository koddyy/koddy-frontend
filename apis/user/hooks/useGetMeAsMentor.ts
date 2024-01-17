import { useQuery } from "@tanstack/react-query";
import { userApi } from "@/apis/user/api";
import { toHHMM } from "@/utils/time";

export const useGetMeAsMentor = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: userApi.getMe,
    select: (me) => {
      if (me.role === "mentor") {
        const schedules =
          me.schedules?.map((v) => ({
            ...v,
            start: toHHMM(v.start),
            end: toHHMM(v.end),
          })) ?? [];

        const isScheduleBy: "REPEAT" | "NOT_REPEAT" = schedules.every(
          ({ start, end }) => start === schedules[0].start && end === schedules[0].end
        )
          ? "REPEAT"
          : "NOT_REPEAT";

        return {
          ...me,
          isScheduleBy,
          schedulesByRepeat:
            isScheduleBy === "REPEAT" && schedules.length > 0
              ? {
                  dayOfWeek: new Set(schedules.map(({ dayOfWeek }) => dayOfWeek)),
                  start: schedules[0].start,
                  end: schedules[0].end,
                }
              : undefined,
          schedulesByNotRepeat:
            isScheduleBy === "NOT_REPEAT"
              ? schedules?.map((v) => ({
                  ...v,
                  start: v.start,
                  end: v.end,
                }))
              : undefined,
        };
      }
    },
    staleTime: Infinity,
  });
};
