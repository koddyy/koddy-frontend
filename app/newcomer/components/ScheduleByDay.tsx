import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { BottomButton } from "@/app/components/BottomButton";
import TrashBin from "@/assets/trash_bin.svg";
import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider/Divider";
import { Select } from "@/components/Select";
import { Toggle } from "@/components/Toggle";
import { TIMES } from "@/constants/date";
import { Day, Mentor } from "@/types/mentor";
import { toHHMM, toTime } from "@/utils/time";
import { DaysAndTimeRangeSelect } from "./DaysAndTimeRangeSelect";

export const ScheduleByDay = () => {
  const { control } = useFormContext<Pick<Mentor, "schedules">>();
  const {
    fields: scheduleFields,
    append,
    remove,
    update,
  } = useFieldArray<Pick<Mentor, "schedules">>({
    control,
    name: "schedules",
  });

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

  const addSchedules = () => {
    if (days.size === 0) return;
    days.forEach((day) =>
      append({ day, start: toTime(timeRange.start), end: toTime(timeRange.end) })
    );
    setDays(new Set());
    setTimeRange({ start: "09:00", end: "17:00" });
  };

  return (
    <>
      <div className="mb-[16px] rounded-[10px] border border-gray-300 p-[12px]">
        <DaysAndTimeRangeSelect
          days={days}
          timeRange={timeRange}
          onChangeDays={changeDays}
          onChangeTimeRange={changeTimeRange}
        />
        <Button variant="outline" className="h-[46px] border" onClick={addSchedules}>
          추가
        </Button>
      </div>
      <Divider className="border-4 border-gray-100" />
      <ul className="my-[20px] flex flex-col gap-[12px]">
        {scheduleFields.map((field, i) => (
          <li key={field.id} className="flex justify-between gap-[8px]">
            <Toggle>{field.day}</Toggle>
            <div className="flex grow items-center gap-[10px]">
              <Select
                options={TIMES}
                value={toHHMM(field.start)}
                onChangeValue={(value) => update(i, { ...field, start: toTime(value) })}
              />
              <span>~</span>
              <Select
                options={TIMES}
                value={toHHMM(field.end)}
                onChangeValue={(value) => update(i, { ...field, end: toTime(value) })}
              />
            </div>
            <button onClick={() => remove(i)}>
              <TrashBin />
            </button>
          </li>
        ))}
      </ul>
      <BottomButton onClick={() => console.log(scheduleFields)}>다음</BottomButton>
    </>
  );
};
