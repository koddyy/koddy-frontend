import { useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import { DatePicker } from "@/components/DatePicker";
import { Dimmed } from "@/components/Dimmed";
import { Divider } from "@/components/Divider/Divider";
import { CompleteProfileForm, Period } from "@/types/mentor";
import { cn } from "@/utils/cn";
import { toYYYYMMDD } from "@/utils/dateUtils";

export const PeriodStep = () => {
  const [periodType, setPeriodType] = useState<keyof Period>();

  const { control } = useFormContext<Pick<CompleteProfileForm, "period">>();

  const TODAY = toYYYYMMDD(new Date());
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

  const defaultDate = {
    startDate: new Date(startDate.value),
    endDate: new Date(endDate.value),
  };

  return (
    <>
      <div className="body-1 mb-2 text-gray-500">이때부터 시작할 예정이에요 (시작)</div>
      <button
        className={cn("headline-3", !startDate.value && "text-gray-400")}
        type="button"
        onClick={() => setPeriodType("startDate")}
      >
        {startDate.value || TODAY}
      </button>
      <Divider className="my-[16px]" />
      <div className="body-1 mb-2 text-gray-500">이때까지 가능해요 (완료)</div>
      <button
        className={cn("headline-3", !endDate.value && "text-gray-400")}
        type="button"
        onClick={() => setPeriodType("endDate")}
      >
        {endDate.value || TODAY}
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
