import { useController, useFormContext } from "react-hook-form";
import { CompleteProfileForm, Day } from "@/types/mentor";
import { DaysAndTimeRangeSelect } from "./DaysAndTimeRangeSelect";

export const ScheduleByRepeat = () => {
  const { control } = useFormContext<Pick<CompleteProfileForm, "schedulesByRepeat">>();

  const { field: dayOfWeek } = useController({
    control,
    name: "schedulesByRepeat.dayOfWeek",
    rules: {
      validate: (value) => value.length > 0,
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
    const index = copy.indexOf(day);
    if (index === -1) copy.push(day);
    else copy.splice(index, 1);
    dayOfWeek.onChange(copy);
  };

  const changeTimeRange = ({ start, end }: { start: string; end: string }) => {
    startTime.onChange(start);
    endTime.onChange(end);
  };

  return (
    <DaysAndTimeRangeSelect
      days={dayOfWeek.value}
      timeRange={{
        start: startTime.value,
        end: endTime.value,
      }}
      onChangeDays={(day) => changeDays(day)}
      onChangeTimeRange={(timeRange) => changeTimeRange(timeRange)}
    />
  );
};
