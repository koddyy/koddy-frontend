"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUpdateAvailableTimes } from "@/apis/user/hooks/useUpdateAvailableTimes";
import { useGetMyAvailableTimes } from "@/app/(main)/mypage/hooks/useGetMyAvailableTimes";
import { NavigationBar } from "@/app/components/NavigationBar";
import { Button } from "@/components/Button";
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

const Page = () => {
  const router = useRouter();
  const { startTime, endTime, weeks } = useGetMyAvailableTimes();
  const [availableTimeRange, setAvailableTimeRange] = useState<AvailableTimeRange>({
    startTime,
    endTime,
  });
  const [availableWeeks, setAvailableWeeks] = useState<WeekType[]>(weeks);
  const { mutate: updateAvailableTimes } = useUpdateAvailableTimes();

  const handleSubmitForm = () => {
    if (isValid) {
      updateAvailableTimes({ weeks: availableWeeks, ...availableTimeRange });
    }
  };

  const isValid = Boolean(
    availableTimeRange.startTime && availableTimeRange.endTime && availableWeeks.length > 0
  );

  return (
    <>
      <NavigationBar title="커피챗 시간 수정" onClickGoback={() => router.back()} />
      <div className="px-5 py-[0.88rem]">
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
        <div className="fixed bottom-[5.75rem] left-1/2 z-header w-full max-w-screen-sm -translate-x-1/2 border-t border-t-gray-200 bg-white">
          <div className="px-[1.25rem] py-[0.69rem]">
            <Button onClick={handleSubmitForm} disabled={!isValid}>
              수정하기
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
