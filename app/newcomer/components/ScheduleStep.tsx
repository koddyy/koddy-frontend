import { useState } from "react";
import { RadioGroup } from "@/components/RadioGroup";
import { ScheduleByDay } from "./ScheduleByDay";
import { ScheduleByWeek } from "./ScheduleByWeek";

export const ScheduleStep = () => {
  const [isTimeRangeRepeat, setIsTimeRangeRepeat] = useState(true);

  return (
    <>
      <div className="headline-1 mb-[32px] text-gray-600">
        커피챗을 할 수 있는 시간은 <br />
        언제인가요?
      </div>
      <RadioGroup
        name="repeat"
        values={["매일 시간 같아요", "요일별로 달라요"]}
        onChangeValue={(value) => setIsTimeRangeRepeat(value === "매일 시간 같아요" ? true : false)}
      />
      <div>
        {isTimeRangeRepeat ? (
          <div className="mt-[36px]">
            <ScheduleByWeek />
          </div>
        ) : (
          <div className="mt-[24px]">
            <ScheduleByDay />
          </div>
        )}
      </div>
    </>
  );
};
