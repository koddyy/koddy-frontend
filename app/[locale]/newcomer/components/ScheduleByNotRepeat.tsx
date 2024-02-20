import { useTranslations } from "next-intl";
import { useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import TrashBin from "@/assets/trash_bin.svg";
import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider/Divider";
import { Select } from "@/components/Select";
import { Toggle } from "@/components/Toggle";
import { TIMES } from "@/constants/date";
import { CompleteProfileForm, Day } from "@/types/mentor";
import { DaysAndTimeRangeSelect } from "./DaysAndTimeRangeSelect";

export const ScheduleByNotRepeat = () => {
  const t = useTranslations("edit.schedule.schedules");
  const constants = useTranslations("constants");

  const { control } = useFormContext<Pick<CompleteProfileForm, "schedulesByNotRepeat">>();

  const {
    fields: scheduleFields,
    append,
    update,
    remove,
  } = useFieldArray({
    control,
    name: "schedulesByNotRepeat",
  });

  const [days, setDays] = useState<Day[]>([]);
  const [timeRange, setTimeRange] = useState({ start: "09:00", end: "17:00" });

  const changeDays = (day: Day) => {
    setDays((prev) => {
      const copy = [...prev];
      const index = copy.indexOf(day);
      if (index === -1) copy.push(day);
      else copy.splice(index, 1);
      return copy;
    });
  };

  const changeTimeRange = ({ start, end }: { start: string; end: string }) => {
    setTimeRange({ start, end });
  };

  const addSchedules = () => {
    if (days.length === 0) return;
    days.forEach((dayOfWeek) => append({ dayOfWeek, start: timeRange.start, end: timeRange.end }));
    setDays([]);
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
          {t("add")}
        </Button>
      </div>
      <Divider className="border-4 border-gray-100" />
      <ul className="my-[20px] flex flex-col gap-[12px]">
        {scheduleFields.map(({ id, ...field }, i) => {
          return (
            <Controller
              key={id}
              control={control}
              name={`schedulesByNotRepeat.${i}`}
              defaultValue={field}
              render={() => (
                <li className="flex justify-between gap-[8px]">
                  <Toggle>{constants(`day-of-week.${field.dayOfWeek}`)[0]}</Toggle>
                  <div className="flex grow items-center gap-[10px]">
                    <Select
                      options={TIMES}
                      value={field.start}
                      onChangeValue={(value) => update(i, { ...field, start: value })}
                    />
                    <span>~</span>
                    <Select
                      options={TIMES}
                      value={field.end}
                      onChangeValue={(value) => update(i, { ...field, end: value })}
                    />
                  </div>
                  <button onClick={() => remove(i)}>
                    <TrashBin />
                  </button>
                </li>
              )}
            />
          );
        })}
      </ul>
    </>
  );
};
