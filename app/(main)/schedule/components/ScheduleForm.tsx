import { Nullable } from "primereact/ts-helpers";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import type { FirstStep, SecondStep } from "@/app/(main)/schedule/types/scheduleForm";
import { createTimeRangeList, getDisabledDays } from "@/app/(main)/schedule/utils/scheduleUtils";
import { Button } from "@/components/Button";
import { Calendar } from "@/components/Calendar";
import { Divider } from "@/components/Divider/Divider";
import { FormControl, FormLabel } from "@/components/FormControl";
import { TextArea } from "@/components/TextArea";
import { Toggle } from "@/components/Toggle";
import type { AvailableTimes } from "@/types/coffeechat";
import { cn } from "@/utils/cn";

interface FirstStepProps {
  availableTimes: AvailableTimes;
  onClickNextStep: (data: FirstStep) => void;
}

const FirstStep = ({ availableTimes, onClickNextStep }: FirstStepProps) => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<FirstStep>();

  const availableDays = useMemo(() => availableTimes.map(({ week }) => week), [availableTimes]);

  const disabledDays = useMemo(() => getDisabledDays(availableDays), [availableDays]);

  const timeRangeList = useMemo(
    () => createTimeRangeList(availableTimes[0].startTime, availableTimes[0].endTime),
    [availableTimes]
  );

  const currentTime = new Intl.DateTimeFormat("ko", { timeStyle: "short" }).format(new Date());

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onClickNextStep)}>
      <FormControl>
        <FormLabel className="body-1-bold mb-2">날짜 선택</FormLabel>
        <Controller
          control={control}
          name="date"
          render={({ field }) => (
            <div className="border border-gray-200">
              <Calendar
                disabledDays={disabledDays}
                value={field.value}
                onChange={(value: Nullable<Date>) => field.onChange(value)}
              />
            </div>
          )}
          rules={{
            required: true,
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel className="body-1-bold mb-2">시간 선택</FormLabel>
        <Controller
          control={control}
          name="timeRange"
          render={({ field }) => (
            <div className="flex flex-wrap gap-3">
              {timeRangeList.map(([startTime, endTime], i) => {
                const value = `${startTime} ~ ${endTime}`;
                return (
                  <Toggle
                    key={i}
                    className={cn(field.value === value && "bg-[#DCFEEB] text-gray-600")}
                    pressed={field.value === value}
                    onChangePressed={() => field.onChange(value)}
                  >
                    {value}
                  </Toggle>
                );
              })}
            </div>
          )}
          rules={{
            required: true,
          }}
        />
      </FormControl>
      <Divider />
      <div className="body-3-bold mb-[2.12rem] flex items-center gap-1 text-gray-600">
        <img className="h-4 w-4" src="/images/earth.png" />
        <div>현재 한국 시간 기준 {currentTime}</div>
      </div>
      <div className="fixed bottom-[5.75rem] left-1/2 z-header w-full max-w-screen-sm -translate-x-1/2 border-t border-t-gray-200 bg-white">
        <div className="px-[1.25rem] py-[0.69rem]">
          <Button type="submit" disabled={!isValid}>
            다음
          </Button>
        </div>
      </div>
    </form>
  );
};

interface SecondStepProps {
  onSubmitSchedule: (data: SecondStep) => void;
}

const SecondStep = ({ onSubmitSchedule }: SecondStepProps) => {
  const { register, handleSubmit } = useForm<SecondStep>();

  return (
    <form onSubmit={handleSubmit(onSubmitSchedule)}>
      <FormControl>
        <FormLabel className="body-1-bold mb-2">멘토에게 궁금한 점 적기</FormLabel>
        <TextArea {...register("question")} />
      </FormControl>
      <div className="fixed bottom-[5.75rem] left-1/2 z-header w-full max-w-screen-sm -translate-x-1/2 border-t border-t-gray-200 bg-white">
        <div className="px-[1.25rem] py-[0.69rem]">
          <Button type="submit">신청하기</Button>
        </div>
      </div>
    </form>
  );
};

export const ScheduleForm = {
  FirstStep,
  SecondStep,
};
