"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useGetMeAsMentor } from "@/apis/user/hooks/useGetMeAsMentor";
import { useUpdateMentorProfile } from "@/apis/user/hooks/useUpdateMentorProfile";
import { NavigationBar } from "@/app/components/NavigationBar";
import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider/Divider";
import { Radio, RadioGroup } from "@/components/RadioGroup";
import { TextArea } from "@/components/TextArea";
import { CompleteProfileForm } from "@/types/mentor";
import { cn } from "@/utils/cn";
import { toTime } from "@/utils/time";
import { PeriodStep } from "../components/PeriodStep";
import { ScheduleByNotRepeat } from "../components/ScheduleByNotRepeat";
import { ScheduleByRepeat } from "../components/ScheduleByRepeat";

type ScheduleByOptionType = "REPEAT" | "NOT_REPEAT";

const ScheduleByOption: Record<ScheduleByOptionType, string> = {
  REPEAT: "매일 시간 같아요",
  NOT_REPEAT: "요일별로 달라요",
} as const;

const formLabelStyle =
  "body-1-bold flex items-center before:mr-[8px] before:inline-block before:h-[8px] before:w-[8px] before:rounded-full before:bg-primary before:content-['']";

const Page = () => {
  const router = useRouter();
  const { data: me } = useGetMeAsMentor();
  const { isScheduleBy, introduction, period, schedulesByRepeat, schedulesByNotRepeat } = me ?? {};
  const [scheduleBy, setIsScheduleBy] = useState<ScheduleByOptionType>(isScheduleBy ?? "REPEAT");

  const methods = useForm<CompleteProfileForm>({
    values: {
      introduction,
      period,
      schedulesByRepeat,
      schedulesByNotRepeat,
    },
  });

  const { mutate: updateMentorProfile } = useUpdateMentorProfile();

  const handleClickComplete = ({
    introduction,
    period,
    schedulesByRepeat,
    schedulesByNotRepeat,
  }: Pick<
    CompleteProfileForm,
    "introduction" | "period" | "schedulesByRepeat" | "schedulesByNotRepeat"
  >) => {
    const _period = (() => {
      if (period && period.startDate && period.endDate) return period;
    })();

    const schedules = (() => {
      if (scheduleBy === "REPEAT" && schedulesByRepeat) {
        return [...schedulesByRepeat.dayOfWeek].map((dayOfWeek) => ({
          dayOfWeek,
          start: toTime(schedulesByRepeat.start),
          end: toTime(schedulesByRepeat.end),
        }));
      } else if (scheduleBy === "NOT_REPEAT" && schedulesByNotRepeat) {
        return schedulesByNotRepeat.map((schedule) => ({
          dayOfWeek: schedule.dayOfWeek,
          start: toTime(schedule.start),
          end: toTime(schedule.end),
        }));
      }
    })();

    updateMentorProfile(
      { introduction, period: _period, schedules },
      {
        onSuccess: () => {
          alert("수정되었습니다");
          router.push("/");
        },
      }
    );
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleClickComplete)}>
        <NavigationBar
          onClickGoback={() => router.back()}
          rightContent={
            <Button type="submit" variant="ghost" size="xs" className="text-gray-700">
              완료
            </Button>
          }
        />
        <>
          <div className="my-[20px] px-[20px]">
            <div className={cn(formLabelStyle, "mb-[8px]")}>자기소개</div>
            <TextArea
              placeholder="간단한 소개와 커피챗을 하게 된 이유, 현재는 어떤 경험을 하고 계신지 알려주시면 좋아요!"
              {...methods.register("introduction")}
            />
          </div>
          <Divider className="border-[4px] border-gray-100" />
          <div className="my-[26px] px-[20px]">
            <div className={cn(formLabelStyle, "mb-[16px]")}>커피챗 진행 예정 기간</div>
            <PeriodStep />
          </div>
          <Divider className="border-[4px] border-gray-100" />
          <div className="my-[26px] px-[20px]">
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
        </>
      </form>
    </FormProvider>
  );
};

export default Page;
