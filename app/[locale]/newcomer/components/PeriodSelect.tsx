import { useTranslations } from "next-intl";
import { useState } from "react";
import { DatePicker } from "@/components/DatePicker";
import { Dimmed } from "@/components/Dimmed";
import { Divider } from "@/components/Divider/Divider";
import { Period } from "@/types/mentor";
import { cn } from "@/utils/cn";
import { getNextMonth, getToday, toYYYYMMDD } from "@/utils/dateUtils";

interface PeriodSelectProps {
  startDate?: string;
  endDate?: string;
  onChangeStartDate: (date: string) => void;
  onChangeEndDate: (date: string) => void;
}

const TODAY = toYYYYMMDD(getToday());
const NEXT_MONTH = toYYYYMMDD(getNextMonth());

export const PeriodSelect = ({
  startDate,
  endDate,
  onChangeStartDate,
  onChangeEndDate,
}: PeriodSelectProps) => {
  const t = useTranslations("edit.schedule.period");

  const [periodType, setPeriodType] = useState<keyof Period>();

  const handleChangeDate = (YYYYMMDD: string) => {
    if (periodType === "startDate") {
      onChangeStartDate(YYYYMMDD);
    } else if (periodType === "endDate") {
      onChangeEndDate(YYYYMMDD);
    }
    setPeriodType(undefined);
  };

  const defaultDate = {
    startDate: new Date(startDate ?? TODAY),
    endDate: new Date(endDate ?? NEXT_MONTH),
  };

  return (
    <>
      <div className="body-1 mb-2 text-gray-500">{t("start")}</div>
      <button
        className={cn("headline-3", !startDate && "text-gray-400")}
        type="button"
        onClick={() => setPeriodType("startDate")}
      >
        {startDate || TODAY}
      </button>
      <Divider className="my-[16px]" />
      <div className="body-1 mb-2 text-gray-500">{t("end")}</div>
      <button
        className={cn("headline-3", !endDate && "text-gray-400")}
        type="button"
        onClick={() => setPeriodType("endDate")}
      >
        {endDate || NEXT_MONTH}
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
