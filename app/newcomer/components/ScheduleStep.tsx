import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useUpdateMentorProfile } from "@/apis/user/hooks/useUpdateMentorProfile";
import { BottomButton } from "@/app/components/BottomButton";
import { Radio, RadioGroup } from "@/components/RadioGroup";
import { toTime } from "@/utils/time";
import { ProfileForm, useProfileFormStore } from "../stores";
import { ScheduleByDay } from "./ScheduleByDay";
import { ScheduleByWeek } from "./ScheduleByWeek";

type ScheduleByOptionType = "REPEAT" | "NOT_REPEAT";

const ScheduleByOption: Record<ScheduleByOptionType, string> = {
  REPEAT: "매일 시간 같아요",
  NOT_REPEAT: "요일별로 달라요",
} as const;

export const ScheduleStep = () => {
  const router = useRouter();
  const [scheduleBy, setIsScheduleBy] = useState<ScheduleByOptionType>("REPEAT");

  const { introduction, period } = useProfileFormStore();

  const schedulesByWeekMethods = useForm<Pick<ProfileForm, "schedulesByWeek">>();
  const schedulesByDayMethods = useForm<Pick<ProfileForm, "schedulesByDay">>();

  const { mutate: updateMentorProfile } = useUpdateMentorProfile();

  const handleClickComplete = ({
    schedulesByWeek,
    schedulesByDay,
  }: Pick<ProfileForm, "schedulesByWeek" | "schedulesByDay">) => {
    const schedules = (() => {
      if (scheduleBy === "REPEAT" && schedulesByWeek) {
        return [...schedulesByWeek.dayOfWeek].map((dayOfWeek) => ({
          ...period,
          dayOfWeek,
          startTime: toTime(schedulesByWeek.startTime),
          endTime: toTime(schedulesByWeek.endTime),
        }));
      } else if (scheduleBy === "NOT_REPEAT" && schedulesByDay) {
        return schedulesByDay.map((schedule) => ({
          ...period,
          dayOfWeek: schedule.dayOfWeek,
          startTime: toTime(schedule.startTime),
          endTime: toTime(schedule.endTime),
        }));
      }
    })();

    updateMentorProfile(
      { introduction, schedules },
      {
        onSuccess: () => {
          router.push("/");
        },
      }
    );
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
