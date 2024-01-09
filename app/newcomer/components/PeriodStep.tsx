import { useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import { BottomButton } from "@/app/components/BottomButton";
import { DatePicker } from "@/components/DatePicker";
import { Dimmed } from "@/components/Dimmed";
import { Divider } from "@/components/Divider/Divider";
import { toYYYYMMDD } from "@/utils/dateUtils";
import type { Period } from "../page";

interface PeriodStepProps {
  onClickNextStep: () => void;
}

export const PeriodStep = ({ onClickNextStep }: PeriodStepProps) => {
  const [periodType, setPeriodType] = useState<keyof Period>();

  const { control, watch } = useFormContext();

  const TODAY = toYYYYMMDD(new Date());
  const { field: periodField } = useController({
    control,
    name: "period",
    defaultValue: {
      start: TODAY,
      end: TODAY,
    },
    rules: { required: true },
  });

  const watchPeriod = watch("period");

  const handleChangeDate = (YYYYMMDD: string) => {
    if (periodType) {
      periodField.onChange({ ...periodField.value, [periodType]: YYYYMMDD });
      setPeriodType(undefined);
    }
  };

  return (
    <>
      <div className="headline-1 mb-9">
        어느 기간 내에
        <br />
        진행할 예정이신가요?
      </div>
      <div className="body-1 mb-2 text-gray-500">이때부터 시작할 예정이에요 (시작)</div>
      <button className="headline-3" type="button" onClick={() => setPeriodType("start")}>
        {watchPeriod.start.toString()}
      </button>
      <Divider className="my-6" />
      <div className="body-1 mb-2 text-gray-500">이때까지 가능해요 (완료)</div>
      <button className="headline-3" type="button" onClick={() => setPeriodType("end")}>
        {watchPeriod.end.toString()}
      </button>
      <BottomButton onClick={onClickNextStep}>다음</BottomButton>
      {periodType && (
        <>
          <Dimmed onClick={() => setPeriodType(undefined)} />
          <DatePicker onChangeDate={handleChangeDate} />
        </>
      )}
    </>
  );
};
