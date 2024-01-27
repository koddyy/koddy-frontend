"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useGetMeAsMentor } from "@/apis/user/hooks/useGetMeAsMentor";
import { useUpdateMentorSchedules } from "@/apis/user/hooks/useUpdateMentorSchedules";
import { PeriodStep } from "@/app/[locale]/newcomer/components/PeriodStep";
import { ScheduleByNotRepeat } from "@/app/[locale]/newcomer/components/ScheduleByNotRepeat";
import { ScheduleByRepeat } from "@/app/[locale]/newcomer/components/ScheduleByRepeat";
import { BottomButton } from "@/app/components/BottomButton";
import { NavigationBar } from "@/app/components/NavigationBar";
import { Divider } from "@/components/Divider/Divider";
import { Radio, RadioGroup } from "@/components/RadioGroup";
import { ScheduleByOption, ScheduleByOptionType } from "@/constants/schedule";
import { UpdateSchedulesForm } from "@/types/mentor";
import { cn } from "@/utils/cn";

const formLabelStyle =
  "body-1-bold flex items-center before:mr-[8px] before:inline-block before:h-[8px] before:w-[8px] before:rounded-full before:bg-primary before:content-['']";

const Page = () => {
  const router = useRouter();
  const { data: me } = useGetMeAsMentor();
  const { mutate: updateMentorSchedules } = useUpdateMentorSchedules();
  const { isScheduleBy, period, schedulesByRepeat, schedulesByNotRepeat } = me ?? {};
  const [scheduleBy, setIsScheduleBy] = useState<ScheduleByOptionType>(isScheduleBy ?? "REPEAT");

  const methods = useForm({
    values: {
      period,
      schedulesByRepeat,
      schedulesByNotRepeat,
    },
    shouldUnregister: true,
  });

  const { isDirty } = methods.formState;

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

  return (
    <>
      <NavigationBar
        title="커피챗 기간 수정"
        titleFontWeight="regular"
        onClickGoback={() => router.back()}
      />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleClickEdit)}>
          <div className="my-[24px] px-[20px]">
            <div className={cn(formLabelStyle, "mb-[16px]")}>커피챗 진행 예정 기간</div>
            <PeriodStep />
          </div>
          <Divider className="border-[4px] border-gray-100" />
          <div className="mb-[109px] mt-[26px] px-[20px]">
            <div className={cn(formLabelStyle, "mb-[16px]")}>커피챗 가능 시간대</div>
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
            수정하기
          </BottomButton>
        </form>
      </FormProvider>
    </>
  );
};

export default Page;
