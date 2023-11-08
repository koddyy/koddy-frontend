import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/Button";
import { FormControl, FormLabel } from "@/components/FormControl";
import { Select } from "@/components/Select";
import { Toggle } from "@/components/Toggle";
import { dayOfWeek, FourthStepData } from "@/types/data";

interface FourthStepProps {
  onSubmitForm: (data: FourthStepData) => void;
}

export const FourthStep = ({ onSubmitForm }: FourthStepProps) => {
  const { control, handleSubmit } = useForm<FourthStepData>();
  const [isChecked, setIsChecked] = useState<Array<boolean>>(new Array(7).fill(false));

  return (
    <form className="mt-[1.81rem]" onSubmit={handleSubmit(onSubmitForm)}>
      <div className="headline-3 mb-[1.5rem]">
        커피챗이 가능한
        <br />
        시간대를 알려주세요
      </div>
      <FormControl className="mb-5">
        <FormLabel htmlFor="timeRange">이용 가능 시간</FormLabel>
        <Controller
          control={control}
          name="timeRange"
          render={({ field }) => (
            <div className="flex items-center gap-[0.63rem]">
              <Select
                className="w-28 px-[0.75rem] py-[0.5625rem]"
                options={["09:00", "10:00", "11:00", "12:00", "13:00"]}
                value={field.value?.start ?? "09:00"}
                onChangeValue={(value) => field.onChange({ ...field.value, start: value })}
              />
              <span>~</span>
              <Select
                className="w-28 px-[0.75rem] py-[0.5625rem]"
                options={["09:00", "10:00", "11:00", "12:00", "13:00"]}
                value={field.value?.end ?? "09:00"}
                onChangeValue={(value) => field.onChange({ ...field.value, end: value })}
              />
            </div>
          )}
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="daysOfWeek">이용 가능 요일</FormLabel>
        <div className="flex gap-2">
          {dayOfWeek.map((value, i) => (
            <Toggle
              key={i}
              pressed={isChecked[i]}
              onChangePressed={() => {
                setIsChecked((prev) => {
                  const cloned = [...prev];
                  cloned[i] = !cloned[i];
                  return cloned;
                });
              }}
            >
              {value}
            </Toggle>
          ))}
        </div>
      </FormControl>
      <div className="absolute inset-x-5 bottom-[2.38rem]">
        <Button type="submit">코띠 시작하기</Button>
      </div>
    </form>
  );
};
