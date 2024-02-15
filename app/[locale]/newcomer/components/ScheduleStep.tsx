import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useGetMeAsMentor } from "@/apis/user/hooks/useGetMeAsMentor";
import { BottomButton } from "@/app/components/BottomButton";
import { Radio, RadioGroup } from "@/components/RadioGroup";
import { ScheduleByOptionType } from "@/constants/schedule";
import { Schedules } from "@/types/mentor";
import { convertSchedules, parseSchedules } from "@/utils/schedules";
import { useCompleteProfileFormStore } from "../mentor/store";
import { ScheduleByNotRepeat } from "./ScheduleByNotRepeat";
import { ScheduleByRepeat } from "./ScheduleByRepeat";

interface ScheduleStepProps {
  onClickNextStep: () => void;
}

export const ScheduleStep = ({ onClickNextStep }: ScheduleStepProps) => {
  const t = useTranslations("newcomer.ScheduleStep");

  const { data: me } = useGetMeAsMentor();
  const { schedules, setSchedules } = useCompleteProfileFormStore();
  const { isScheduleBy, schedulesByRepeat, schedulesByNotRepeat } = useMemo(
    () => parseSchedules(schedules),
    [schedules]
  );

  const [scheduleBy, setIsScheduleBy] = useState<ScheduleByOptionType>(
    me?.isScheduleBy ?? isScheduleBy ?? "REPEAT"
  );

  const methods = useForm<Pick<Schedules, "schedulesByRepeat" | "schedulesByNotRepeat">>({
    values: {
      schedulesByRepeat: me?.schedulesByRepeat ??
        schedulesByRepeat ?? { dayOfWeek: [], start: "09:00", end: "17:00" },
      schedulesByNotRepeat: me?.schedulesByNotRepeat ?? schedulesByNotRepeat ?? [],
    },
  });

  const {
    formState: { isValid, isDirty },
    handleSubmit,
    resetField,
  } = methods;

  return (
    <FormProvider {...methods}>
      <div className="headline-1 mb-[32px]">{t.rich("title", { br: () => <br /> })}</div>
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
          <Radio value="REPEAT">{t("repeat")}</Radio>
          <Radio value="NOT_REPEAT">{t("not-repeat")}</Radio>
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
          {t("next")}
        </BottomButton>
      </form>
    </FormProvider>
  );
};
