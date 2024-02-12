import { useTranslations } from "next-intl";
import { Select } from "@/components/Select";
import { Toggle } from "@/components/Toggle";
import { DAYS, TIMES } from "@/constants/date";
import type { Day } from "@/types/mentor";

interface DaysAndTimeRangeSelectProps {
  days: Day[];
  timeRange: { start: string; end: string };
  onChangeDays: (day: Day) => void;
  onChangeTimeRange: (timeRange: { start: string; end: string }) => void;
}

export const DaysAndTimeRangeSelect = ({
  days,
  timeRange,
  onChangeDays,
  onChangeTimeRange,
}: DaysAndTimeRangeSelectProps) => {
  const constants = useTranslations("constants");

  return (
    <>
      <div className="mb-[13px] flex justify-between">
        {DAYS.map((day, i) => {
          return (
            <Toggle key={i} pressed={days.includes(day)} onChangePressed={() => onChangeDays(day)}>
              {constants(`day-of-week.${day}`)[0]}
            </Toggle>
          );
        })}
      </div>
      <div className="mb-[13px] flex items-center gap-[12px]">
        <Select
          options={TIMES}
          value={timeRange.start}
          onChangeValue={(value) => onChangeTimeRange({ ...timeRange, start: value })}
        />
        <span>~</span>
        <Select
          options={TIMES}
          value={timeRange.end}
          onChangeValue={(value) => onChangeTimeRange({ ...timeRange, end: value })}
        />
      </div>
    </>
  );
};
