import { isToday } from "date-fns";
import { useTranslations } from "next-intl";
import { Controller, useController, useFormContext } from "react-hook-form";
import { Button } from "@/components/Button";
import { Calendar } from "@/components/Calendar";
import { Divider } from "@/components/Divider/Divider";
import { FormControl, FormLabel } from "@/components/FormControl";
import { Toggle } from "@/components/Toggle";
import { MenteeApplyForm } from "@/types/coffeechat";
import { getKSTToday } from "@/utils/dateUtils";
import { useSchedules } from "../hooks/useSchedules";

interface FirstStepProps {
  mentorId: number;
  onClickNextStep: () => void;
}

export const ScheduleStep = ({ mentorId, onClickNextStep }: FirstStepProps) => {
  const t = useTranslations("schedule.ScheduleStep");

  const {
    control,
    formState: { isValid },
  } = useFormContext<Pick<MenteeApplyForm, "date" | "timeRange">>();

  const { field: dateField } = useController({
    control,
    name: "date",
    rules: {
      required: true,
    },
  });

  const {
    startDate,
    endDate,
    disabledDays,
    availableTimeRangeList,
    availableTimeRangeListOfToday,
  } = useSchedules(mentorId, dateField.value ?? getKSTToday());

  const currentTime = new Intl.DateTimeFormat("ko", { timeStyle: "short" }).format(getKSTToday());

  return (
    <>
      <FormControl>
        <FormLabel className="body-1-bold mb-2">{t("date")}</FormLabel>
        <div className="rounded-[8px] border border-gray-200 px-[29px] py-[9px]">
          <Calendar
            tileDisabled={({ date }) => disabledDays.includes(date.getDay())}
            minDate={startDate}
            maxDate={endDate}
            value={dateField.value}
            onChange={(value) => dateField.onChange(value)}
          />
        </div>
      </FormControl>
      {dateField.value && (
        <FormControl className="my-[16px]">
          <FormLabel className="body-1-bold mb-2">{t("time")}</FormLabel>
          <Controller
            control={control}
            name="timeRange"
            render={({ field }) => (
              <div className="flex flex-wrap gap-3">
                {(isToday(dateField.value)
                  ? availableTimeRangeListOfToday
                  : availableTimeRangeList
                )?.map((timeRange, i) => {
                  const delimiter = " ~ ";
                  const value = timeRange.join(delimiter);
                  return (
                    <Toggle
                      key={i}
                      className="px-[12px] py-[9px]"
                      variant="surface"
                      pressed={field.value?.join(delimiter) === value}
                      onChangePressed={() => field.onChange(timeRange)}
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
      )}
      <Divider className="my-[16px]" />
      <div className="body-3-bold mb-[2.12rem] flex items-center gap-1 text-gray-600">
        <img className="h-4 w-4" src="/images/earth.png" />
        <div>현재 한국 시간 기준 {currentTime}</div>
      </div>
      <div className="fixed bottom-[var(--bottom-navigation-height)] left-1/2 z-header w-full max-w-screen-sm -translate-x-1/2 border-t border-t-gray-200 bg-white">
        <div className="px-[1.25rem] py-[0.69rem]">
          <Button disabled={!isValid} onClick={onClickNextStep}>
            {t("next")}
          </Button>
        </div>
      </div>
    </>
  );
};
