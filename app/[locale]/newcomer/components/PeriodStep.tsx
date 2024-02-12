import { useTranslations } from "next-intl";
import { useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import { DatePicker } from "@/components/DatePicker";
import { Dimmed } from "@/components/Dimmed";
import { Divider } from "@/components/Divider/Divider";
import { CompleteProfileForm, Period } from "@/types/mentor";
import { cn } from "@/utils/cn";
import { getNextMonth, getToday, toYYYYMMDD } from "@/utils/dateUtils";

export const PeriodStep = () => {
  const t = useTranslations("edit.schedule.period");

  const [periodType, setPeriodType] = useState<keyof Period>();

  const { control } = useFormContext<Pick<CompleteProfileForm, "period">>();

  const { field: startDate } = useController({
    control,
    name: "period.startDate",
  });

  const { field: endDate } = useController({
    control,
    name: "period.endDate",
  });

  const handleChangeDate = (YYYYMMDD: string) => {
    if (periodType === "startDate") {
      startDate.onChange(YYYYMMDD);
    } else if (periodType === "endDate") {
      endDate.onChange(YYYYMMDD);
    }
    setPeriodType(undefined);
  };

  const TODAY = toYYYYMMDD(getToday());
  const NEXT_MONTH = toYYYYMMDD(getNextMonth());

  const defaultDate = {
    startDate: new Date(startDate.value ?? TODAY),
    endDate: new Date(endDate.value ?? NEXT_MONTH),
  };

  return (
    <>
      <div className="body-1 mb-2 text-gray-500">{t("start")}</div>
      <button
        className={cn("headline-3", !startDate.value && "text-gray-400")}
        type="button"
        onClick={() => setPeriodType("startDate")}
      >
        {startDate.value || TODAY}
      </button>
      <Divider className="my-[16px]" />
      <div className="body-1 mb-2 text-gray-500">{t("end")}</div>
      <button
        className={cn("headline-3", !endDate.value && "text-gray-400")}
        type="button"
        onClick={() => setPeriodType("endDate")}
      >
        {endDate.value || NEXT_MONTH}
      </button>
      {periodType && (
        <>
          <Dimmed onClick={() => setPeriodType(undefined)} />
          <DatePicker defaultDate={defaultDate[periodType]} onChangeDate={handleChangeDate} />
        </>
      )}
    </>
  );
};
