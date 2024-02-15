import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useGetMeAsMentor } from "@/apis/user/hooks/useGetMeAsMentor";
import { BottomButton } from "@/app/components/BottomButton";
import { Radio, RadioGroup } from "@/components/RadioGroup";
import { ScheduleByOption, ScheduleByOptionType } from "@/constants/schedule";
import { CompleteProfileForm } from "@/types/mentor";
import { convertSchedules } from "@/utils/schedules";
import { useCompleteProfileFormStore } from "../store";
import { ScheduleByNotRepeat } from "./ScheduleByNotRepeat";
import { ScheduleByRepeat } from "./ScheduleByRepeat";

interface ScheduleStepProps {
  onClickNextStep: () => void;
}

export const ScheduleStep = ({ onClickNextStep }: ScheduleStepProps) => {
  const { data: me } = useGetMeAsMentor();
  const [scheduleBy, setIsScheduleBy] = useState<ScheduleByOptionType>(
    me?.isScheduleBy ?? "REPEAT"
  );
  const { setSchedules } = useCompleteProfileFormStore();

  const methods = useForm<Pick<CompleteProfileForm, "schedulesByRepeat" | "schedulesByNotRepeat">>({
    values: {
      schedulesByRepeat: me?.schedulesByRepeat ?? { dayOfWeek: [], start: "09:00", end: "17:00" },
      schedulesByNotRepeat: me?.schedulesByNotRepeat ?? [],
    },
  });

  const {
    formState: { isValid, isDirty },
    handleSubmit,
    resetField,
  } = methods;

  return (
    <FormProvider {...methods}>
      <div className="headline-1 mb-[32px]">
        커피챗이 가능한
        <br />
        시간대를 알려주세요
      </div>
      <form
        onSubmit={handleSubmit(({ schedulesByRepeat, schedulesByNotRepeat }) => {
          setSchedules(
            scheduleBy === "REPEAT"
              ? convertSchedules({ schedulesByRepeat })
              : convertSchedules({ schedulesByNotRepeat })
          );
          onClickNextStep();
        })}
      >
        <RadioGroup
          name="scheduleBy"
          value={scheduleBy}
          onChangeValue={(value) => {
            if (value === "REPEAT" || value === "NOT_REPEAT") {
              resetField(value === "REPEAT" ? "schedulesByNotRepeat" : "schedulesByRepeat");
              setIsScheduleBy(value);
            }
          }}
        >
          <Radio value="REPEAT">{ScheduleByOption.REPEAT}</Radio>
          <Radio value="NOT_REPEAT">{ScheduleByOption.NOT_REPEAT}</Radio>
        </RadioGroup>
        {scheduleBy === "REPEAT" && (
          <div className="mt-[36px]">
            <ScheduleByRepeat />
          </div>
        )}
        {scheduleBy === "NOT_REPEAT" && (
          <div className="mt-[24px]">
            <ScheduleByNotRepeat />
          </div>
        )}
        <BottomButton type="submit" disabled={!isDirty || !isValid}>
          다음
        </BottomButton>
      </form>
    </FormProvider>
  );
};
