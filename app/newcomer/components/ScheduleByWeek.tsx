import { useState } from "react";
import { BottomButton } from "@/app/components/BottomButton";
import { Day } from "@/types/mentor";
import { toTime } from "@/utils/time";
import { DaysAndTimeRangeSelect } from "./DaysAndTimeRangeSelect";

export const ScheduleByWeek = () => {
  const [days, setDays] = useState<Set<Day>>(new Set());
  const [timeRange, setTimeRange] = useState({ start: "09:00", end: "17:00" });

  const changeDays = (day: Day) => {
    setDays((prev) => {
      const copy = new Set(prev);
      if (copy.has(day)) copy.delete(day);
      else copy.add(day);
      return copy;
    });
  };

  const changeTimeRange = ({ start, end }: { start: string; end: string }) => {
    setTimeRange({ start, end });
  };

  const handleSubmit = () => {
    console.log(
      [...days].map((day) => ({ day, start: toTime(timeRange.start), end: toTime(timeRange.end) }))
    );
  };

  return (
    <>
      <DaysAndTimeRangeSelect
        days={days}
        timeRange={timeRange}
        onChangeDays={(day) => changeDays(day)}
        onChangeTimeRange={(timeRange) => changeTimeRange(timeRange)}
      />
      <BottomButton disabled={days.size === 0} onClick={handleSubmit}>
        완료
      </BottomButton>
    </>
  );
};
