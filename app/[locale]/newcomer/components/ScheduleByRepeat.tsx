import { useController, useFormContext } from "react-hook-form";
import { DAYS } from "@/constants/date";
import { CompleteProfileForm, Day } from "@/types/mentor";
import { DaysAndTimeRangeSelect } from "./DaysAndTimeRangeSelect";

export const ScheduleByRepeat = () => {
  const { control } = useFormContext<Pick<CompleteProfileForm, "schedulesByRepeat">>();

  const { field: dayOfWeek } = useController({
    control,
    name: "schedulesByRepeat.dayOfWeek",
    rules: {
      validate: (value) => value.some((v) => Boolean(v)),
    },
  });

  const { field: startTime } = useController({
    control,
    name: "schedulesByRepeat.start",
    defaultValue: "09:00",
  });

  const { field: endTime } = useController({
    control,
    name: "schedulesByRepeat.end",
    defaultValue: "17:00",
  });

  const changeDays = (day: Day) => {
    const copy = [...dayOfWeek.value];
    const index = DAYS.indexOf(day);
    if (index === -1) return;

    copy[index] = !copy[index];
    dayOfWeek.onChange(copy);
  };

  const changeTimeRange = ({ start, end }: { start: string; end: string }) => {
    startTime.onChange(start);
    endTime.onChange(end);
  };

  const days = DAYS.filter((_, i) => dayOfWeek.value[i]);

  return (
    <DaysAndTimeRangeSelect
      days={days}
      timeRange={{
        start: startTime.value,
        end: endTime.value,
      }}
      onChangeDays={(day) => changeDays(day)}
      onChangeTimeRange={(timeRange) => changeTimeRange(timeRange)}
    />
  );
};
