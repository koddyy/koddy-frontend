"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { FormProvider, useController, useForm } from "react-hook-form";
import { useGetMeAsMentor } from "@/apis/user/hooks/useGetMeAsMentor";
import { useUpdateMentorSchedules } from "@/apis/user/hooks/useUpdateMentorSchedules";
import { PeriodSelect } from "@/app/[locale]/newcomer/components/PeriodSelect";
import { ScheduleByNotRepeat } from "@/app/[locale]/newcomer/components/ScheduleByNotRepeat";
import { ScheduleByRepeat } from "@/app/[locale]/newcomer/components/ScheduleByRepeat";
import { BottomButton } from "@/app/components/BottomButton";
import { NavigationBar } from "@/app/components/NavigationBar";
import { Divider } from "@/components/Divider/Divider";
import { Radio, RadioGroup } from "@/components/RadioGroup";
import { ScheduleByOptionType } from "@/constants/schedule";
import { useRouter } from "@/libs/navigation";
import { UpdateSchedulesForm } from "@/types/mentor";
import { cn } from "@/utils/cn";

const formLabelStyle =
  "body-1-bold flex items-center before:mr-[8px] before:inline-block before:h-[8px] before:w-[8px] before:rounded-full before:bg-primary before:content-['']";

const Page = () => {
  const t = useTranslations("edit.schedule");

  const router = useRouter();
  const { data: me } = useGetMeAsMentor();
  const { mutate: updateMentorSchedules } = useUpdateMentorSchedules();
  const { isScheduleBy, period, schedulesByRepeat, schedulesByNotRepeat } = me ?? {};
  const [scheduleBy, setScheduleBy] = useState<ScheduleByOptionType>(isScheduleBy ?? "REPEAT");

  const methods = useForm({
    values: {
      period,
      schedulesByRepeat,
      schedulesByNotRepeat,
    },
    shouldUnregister: true,
  });

  const {
    control,
    formState: { isDirty },
  } = methods;

  const { field: startDate } = useController({
    control,
    name: "period.startDate",
    rules: { required: true },
  });

  const { field: endDate } = useController({
    control,
    name: "period.endDate",
    rules: { required: true },
  });

  const handleClickEdit = ({
    period,
    schedulesByRepeat,
    schedulesByNotRepeat,
  }: UpdateSchedulesForm) => {
    updateMentorSchedules(
      { period, schedulesByRepeat, schedulesByNotRepeat },
      {
        onSuccess: () => {
          alert("수정되었습니다");
          router.push("/mypage");
        },
      }
    );
  };

  useEffect(() => {
    if (isScheduleBy) {
      setScheduleBy(isScheduleBy);
    }
  }, [isScheduleBy]);

  return (
    <>
      <NavigationBar
        title={t("title")}
        titleFontWeight="regular"
        onClickGoback={() => router.back()}
      />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleClickEdit)}>
          <div className="my-[24px] px-[20px]">
            <div className={cn(formLabelStyle, "mb-[16px]")}>{t("period.label")}</div>
            <PeriodSelect
              startDate={startDate.value}
              endDate={endDate.value}
              onChangeStartDate={(date) => startDate.onChange(date)}
              onChangeEndDate={(date) => endDate.onChange(date)}
            />
          </div>
          <Divider className="border-[4px] border-gray-100" />
          <div className="mb-[109px] mt-[26px] px-[20px]">
            <div className={cn(formLabelStyle, "mb-[16px]")}>{t("schedules.label")}</div>
            <RadioGroup
              name="scheduleBy"
              value={scheduleBy}
              onChangeValue={(value) => {
                if (value === "REPEAT" || value === "NOT_REPEAT") setScheduleBy(value);
              }}
            >
              <Radio value="REPEAT">{t("schedules.schedule-by-repeat")}</Radio>
              <Radio value="NOT_REPEAT">{t("schedules.schedule-by-not-repeat")}</Radio>
            </RadioGroup>
            {scheduleBy === "REPEAT" && (
              <div className="mt-[20px]">
                <ScheduleByRepeat />
              </div>
            )}
            {scheduleBy === "NOT_REPEAT" && (
              <div className="mt-[24px]">
                <ScheduleByNotRepeat />
              </div>
            )}
          </div>
          <BottomButton type="submit" disabled={!isDirty}>
            {t("edit")}
          </BottomButton>
        </form>
      </FormProvider>
    </>
  );
};

export default Page;
