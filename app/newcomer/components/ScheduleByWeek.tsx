import { useController, useFormContext } from "react-hook-form";
import { Day } from "@/types/mentor";
import { DaysAndTimeRangeSelect } from "./DaysAndTimeRangeSelect";

export const ScheduleByWeek = () => {
  const { control } = useFormContext();

  const { field: dayOfWeek } = useController({
    control,
    name: "schedulesByWeek.dayOfWeek",
    defaultValue: new Set<Day>(),
  });

  const { field: startTime } = useController({
    control,
    name: "schedulesByWeek.startTime",
    defaultValue: "09:00",
    rules: {
      required: true,
    },
  });

  const { field: endTime } = useController({
    control,
    name: "schedulesByWeek.endTime",
    defaultValue: "17:00",
    rules: {
      required: true,
    },
  });

  const changeDays = (day: Day) => {
    const copy = new Set(dayOfWeek.value);
    if (copy.has(day)) copy.delete(day);
    else copy.add(day);
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
