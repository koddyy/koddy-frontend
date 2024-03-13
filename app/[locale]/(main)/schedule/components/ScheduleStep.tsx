import { useTranslations } from "next-intl";
import { useController, useFormContext } from "react-hook-form";
import { BottomButton } from "@/app/components/BottomButton";
import { Calendar } from "@/components/Calendar";
import { Divider } from "@/components/Divider/Divider";
import { FormControl, FormLabel } from "@/components/FormControl";
import { Toggle } from "@/components/Toggle";
import { DATE_STYLE, TIME_STYLE } from "@/constants/date";
import { MenteeApplyForm } from "@/types/coffeechat";
import { formatDateTimeByLocale, toKSTDate, toYYYYMMDD } from "@/utils/dateUtils";
import { timezoneCookie } from "@/utils/timezone";
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

  const { field: timeRangeField } = useController({
    control,
    name: "timeRange",
    rules: {
      required: true,
    },
  });

  const { minDate, maxDate, monthlySchedules, availableTimeSlots } = useSchedules(
    mentorId,
    dateField.value ?? new Date()
  );

  const selectedLocalDateTime = dateField.value &&
    timeRangeField.value && {
      start: `${toYYYYMMDD(dateField.value)}T${timeRangeField.value[0]}`,
      end: `${toYYYYMMDD(dateField.value)}T${timeRangeField.value[1]}`,
    };

  return (
    <>
      <FormControl>
        <FormLabel className="body-1-bold mb-2">{t("date")}</FormLabel>
        <div className="rounded-[8px] border border-gray-200 px-[29px] py-[9px]">
          <Calendar
            tileDisabled={({ date }) => !monthlySchedules[toYYYYMMDD(date)]}
            minDate={minDate}
            maxDate={maxDate}
            value={dateField.value}
            onChange={(value) => {
              dateField.onChange(value);
              timeRangeField.onChange(undefined);
            }}
          />
        </div>
      </FormControl>
      {dateField.value && (
        <FormControl className="my-[16px]">
          <FormLabel className="body-1-bold mb-2">{t("time")}</FormLabel>
          <div className="flex flex-wrap gap-3">
            {availableTimeSlots.map((timeRange, i) => {
              const delimiter = " ~ ";
              const value = timeRange.join(delimiter);
              return (
                <Toggle
                  key={i}
                  className="px-[12px] py-[9px]"
                  variant="surface"
                  pressed={timeRangeField.value?.join(delimiter) === value}
                  onChangePressed={() => timeRangeField.onChange(timeRange)}
                >
                  {value}
                </Toggle>
              );
            })}
          </div>
        </FormControl>
      )}
      <Divider className="my-[16px]" />
      {dateField.value && timeRangeField.value && (
        <div className="flex flex-col gap-[4px] rounded-[12px] bg-gray-100 py-[16px] text-center">
          <div className="body-1-bold">
            {`
            ${formatDateTimeByLocale(dateField.value, DATE_STYLE)}
            ${timeRangeField.value[0]}~${timeRangeField.value[1]} (${timezoneCookie.get()})`}
          </div>
          <div className="body-3 text-gray-600">
            {`${t("korea-standard-time")}
            ${formatDateTimeByLocale(toKSTDate(selectedLocalDateTime.start), DATE_STYLE)}
            ${formatDateTimeByLocale(
              toKSTDate(selectedLocalDateTime.start),
              TIME_STYLE
            )}~${formatDateTimeByLocale(toKSTDate(selectedLocalDateTime.end), TIME_STYLE)}`}
          </div>
        </div>
      )}
      <BottomButton disabled={!isValid} onClick={onClickNextStep}>
        {t("next")}
      </BottomButton>
    </>
  );
};
