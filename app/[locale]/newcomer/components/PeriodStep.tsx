import { useController, useFormContext } from "react-hook-form";
import { BottomButton } from "@/app/components/BottomButton";
import { CompleteProfileForm } from "@/types/mentor";
import { PeriodSelect } from "./PeriodSelect";

interface PeriodStepProps {
  onClickNextStep: () => void;
}

export const PeriodStep = ({ onClickNextStep }: PeriodStepProps) => {
  const {
    control,
    formState: { isValid },
  } = useFormContext<Pick<CompleteProfileForm, "period">>();

  const { field: startDate } = useController({
    control,
    name: "period.startDate",
    rules: { required: true },
  });

  const { field: endDate } = useController({
    control,
    name: "period.endDate",
    rules: { required: true },
  });

  return (
    <>
      <div className="headline-1 mb-[36px]">
        어느 기간 내에
        <br />
        진행할 예정이신가요?
      </div>
      <PeriodSelect
        startDate={startDate.value}
        endDate={endDate.value}
        onChangeStartDate={(date) => startDate.onChange(date)}
        onChangeEndDate={(date) => endDate.onChange(date)}
      />
      <BottomButton disabled={!isValid} onClick={onClickNextStep}>
        다음
      </BottomButton>
    </>
  );
};
