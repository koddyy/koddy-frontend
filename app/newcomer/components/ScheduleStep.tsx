import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { BottomButton } from "@/app/components/BottomButton";
import { Radio, RadioGroup } from "@/components/RadioGroup";
import { ProfileForm } from "../stores";
import { ScheduleByDay } from "./ScheduleByDay";
import { ScheduleByWeek } from "./ScheduleByWeek";

type ScheduleByOptionType = "REPEAT" | "NOT_REPEAT";

const ScheduleByOption: Record<ScheduleByOptionType, string> = {
  REPEAT: "매일 시간 같아요",
  NOT_REPEAT: "요일별로 달라요",
} as const;

export const ScheduleStep = () => {
  const [scheduleBy, setIsScheduleBy] = useState<ScheduleByOptionType>("REPEAT");

  const schedulesByWeekMethods = useForm<Pick<ProfileForm, "schedulesByWeek">>();
  const schedulesByDayMethods = useForm<Pick<ProfileForm, "schedulesByDay">>();

  const handleClickComplete = ({
    schedulesByWeek,
    schedulesByDay,
  }: Pick<ProfileForm, "schedulesByWeek" | "schedulesByDay">) => {
    console.log(schedulesByWeek, schedulesByDay);
  };

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
      {scheduleBy === "REPEAT" && (
        <FormProvider {...schedulesByWeekMethods}>
          <form
            className="mt-[36px]"
            onSubmit={schedulesByWeekMethods.handleSubmit(handleClickComplete)}
          >
            <ScheduleByWeek />
            <BottomButton type="submit" disabled={!schedulesByWeekMethods.formState.isValid}>
              완료
            </BottomButton>
          </form>
        </FormProvider>
      )}
      {scheduleBy === "NOT_REPEAT" && (
        <FormProvider {...schedulesByDayMethods}>
          <form
            className="mt-[24px]"
            onSubmit={schedulesByDayMethods.handleSubmit(handleClickComplete)}
          >
            <ScheduleByDay />
            <BottomButton type="submit" disabled={!schedulesByDayMethods.formState.isValid}>
              완료
            </BottomButton>
          </form>
        </FormProvider>
      )}
    </>
  );
};
