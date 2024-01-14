import { useState } from "react";
import { useController, useForm } from "react-hook-form";
import { BottomButton } from "@/app/components/BottomButton";
import { DatePicker } from "@/components/DatePicker";
import { Dimmed } from "@/components/Dimmed";
import { Divider } from "@/components/Divider/Divider";
import { Period } from "@/types/mentor";
import { toYYYYMMDD } from "@/utils/dateUtils";
import { type ProfileForm, useProfileFormStore } from "../stores";

interface PeriodStepProps {
  onClickNextStep: () => void;
}

export const PeriodStep = ({ onClickNextStep }: PeriodStepProps) => {
  const [periodType, setPeriodType] = useState<keyof Period>();
  const { period, setProfileData } = useProfileFormStore();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<Pick<ProfileForm, "period">>();

  const TODAY = toYYYYMMDD(new Date());
  const { field: startDate } = useController({
    control,
    name: "period.startDate",
    defaultValue: period?.startDate || TODAY,
    rules: {
      required: true,
    },
  });

  const { field: endDate } = useController({
    control,
    name: "period.endDate",
    defaultValue: period?.endDate || "",
    rules: {
      required: true,
    },
  });

  const handleChangeDate = (YYYYMMDD: string) => {
    if (periodType === "startDate") {
      startDate.onChange(YYYYMMDD);
    } else if (periodType === "endDate") {
      endDate.onChange(YYYYMMDD);
    }
    setPeriodType(undefined);
  };

  const handleClickNextStep = ({ period }: Pick<ProfileForm, "period">) => {
    setProfileData({ period });
    onClickNextStep();
  };

  return (
    <form onSubmit={handleSubmit(handleClickNextStep)}>
      <div className="headline-1 mb-9">
        어느 기간 내에
        <br />
        진행할 예정이신가요?
      </div>
      <div className="body-1 mb-2 text-gray-500">이때부터 시작할 예정이에요 (시작)</div>
      <button className="headline-3" type="button" onClick={() => setPeriodType("startDate")}>
        {startDate.value || TODAY}
      </button>
      <Divider className="my-6" />
      <div className="body-1 mb-2 text-gray-500">이때까지 가능해요 (완료)</div>
      <button className="headline-3" type="button" onClick={() => setPeriodType("endDate")}>
        {endDate.value || TODAY}
      </button>
      <BottomButton type="submit" disabled={!isValid}>
        다음
      </BottomButton>
      {periodType && (
        <>
          <Dimmed onClick={() => setPeriodType(undefined)} />
          <DatePicker onChangeDate={handleChangeDate} />
        </>
      )}
    </form>
  );
};
