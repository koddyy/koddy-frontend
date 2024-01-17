export type ScheduleByOptionType = "REPEAT" | "NOT_REPEAT";

export const ScheduleByOption: Record<ScheduleByOptionType, string> = {
  REPEAT: "매일 시간 같아요",
  NOT_REPEAT: "요일별로 달라요",
} as const;
