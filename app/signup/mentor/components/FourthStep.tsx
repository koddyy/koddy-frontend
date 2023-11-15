import { useState } from "react";
import { BottomButton } from "@/app/components/BottomButton";
import type { FourthStepForm } from "@/app/signup/types/mentorForm";
import { FormControl, FormLabel } from "@/components/FormControl";
import { Select } from "@/components/Select";
import { Toggle } from "@/components/Toggle";
import type { AvailableTimeRange } from "@/types/coffeechat";
import type { WeekType } from "@/types/user";

const DAYS_OF_WEEK = {
  MON: "월",
  TUE: "화",
  WED: "수",
  THU: "목",
  FRI: "금",
  SAT: "토",
  SUN: "일",
} as const;

const TIMES = new Array(24).fill(0).reduce((acc, _, i) => {
  const HH = String(i).padStart(2, "0");
  return [...acc, `${HH}:00`, `${HH}:30`];
}, []);

interface FourthStepProps {
  onSubmitForm: (data: FourthStepForm) => void;
}

export const FourthStep = ({ onSubmitForm }: FourthStepProps) => {
  const [availableTimeRange, setAvailableTimeRange] = useState<AvailableTimeRange>({
    startTime: "",
    endTime: "",
  });
  const [availableWeeks, setAvailableWeeks] = useState<WeekType[]>([]);

  const handleSubmitForm = () => {
    if (isValid) {
      onSubmitForm({
        availableTimes: availableWeeks.map((week) => ({ week, ...availableTimeRange })),
      });
    }
  };

  const isValid = Boolean(
    availableTimeRange.startTime && availableTimeRange.endTime && availableWeeks.length > 0
  );

  return (
    <div className="mt-[1.81rem]">
      <div className="headline-3 mb-[1.5rem]">
        커피챗이 가능한
        <br />
        시간대를 알려주세요
      </div>
      <FormControl className="mb-5">
        <FormLabel htmlFor="availableTimes">이용 가능 시간</FormLabel>
        <div className="flex items-center gap-[0.63rem]">
          <Select
            className="w-28 px-[0.75rem] py-[0.5625rem]"
            options={TIMES}
            value={availableTimeRange.startTime || "09:00"}
            onChangeValue={(value) =>
              setAvailableTimeRange((prev) => ({ ...prev, startTime: value }))
            }
          />
          <span>~</span>
          <Select
            className="w-28 px-[0.75rem] py-[0.5625rem]"
            options={TIMES}
            value={availableTimeRange.endTime || "09:00"}
            onChangeValue={(value) =>
              setAvailableTimeRange((prev) => ({ ...prev, endTime: value }))
            }
          />
        </div>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="availableTimes">이용 가능 요일</FormLabel>
        <div className="flex gap-2">
          {Object.entries(DAYS_OF_WEEK).map(([key, value]) => {
            const isPressed = availableWeeks.some((week) => week === key);
            return (
              <Toggle
                key={key}
                pressed={isPressed}
                onChangePressed={() =>
                  setAvailableWeeks((prev) =>
                    isPressed ? prev.filter((week) => week !== key) : prev.concat(key as WeekType)
                  )
                }
              >
                {value}
              </Toggle>
            );
          })}
        </div>
      </FormControl>
      <BottomButton disabled={!isValid} onClick={handleSubmitForm}>
        코띠 시작하기
      </BottomButton>
    </div>
  );
};
