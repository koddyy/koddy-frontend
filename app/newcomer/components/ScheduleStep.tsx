import { useState } from "react";
import { Radio, RadioGroup } from "@/components/RadioGroup";
import { ScheduleByDay } from "./ScheduleByDay";
import { ScheduleByWeek } from "./ScheduleByWeek";

type ScheduleByOptionType = "REPEAT" | "NOT_REPEAT";

const ScheduleByOption: Record<ScheduleByOptionType, string> = {
  REPEAT: "매일 시간 같아요",
  NOT_REPEAT: "요일별로 달라요",
} as const;

export const ScheduleStep = () => {
  const [scheduleBy, setIsScheduleBy] = useState<ScheduleByOptionType>("REPEAT");

  return (
    <>
      <div className="headline-1 mb-[32px] text-gray-600">
        커피챗을 할 수 있는 시간은 <br />
        언제인가요?
      </div>
      <RadioGroup
        name="scheduleBy"
        value={scheduleBy}
        onChangeValue={(value) => {
          if (value === "REPEAT" || value === "NOT_REPEAT") setIsScheduleBy(value);
        }}
      >
        <Radio value="REPEAT">{ScheduleByOption.REPEAT}</Radio>
        <Radio value="NOT_REPEAT">{ScheduleByOption.NOT_REPEAT}</Radio>
      </RadioGroup>
      <div>
        {scheduleBy === "REPEAT" && (
          <div className="mt-[36px]">
            <ScheduleByWeek />
          </div>
        )}
        {scheduleBy === "NOT_REPEAT" && (
          <div className="mt-[24px]">
            <ScheduleByDay />
          </div>
        )}
      </div>
    </>
  );
};
