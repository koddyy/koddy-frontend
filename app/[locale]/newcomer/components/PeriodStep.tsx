import { useTranslations } from "next-intl";
import { useController, useForm } from "react-hook-form";
import { useGetMeAsMentor } from "@/apis/user/hooks/useGetMeAsMentor";
import { BottomButton } from "@/app/components/BottomButton";
import { Mentor } from "@/types/mentor";
import { useCompleteProfileFormStore } from "../store";
import { PeriodSelect } from "./PeriodSelect";

interface PeriodStepProps {
  onClickNextStep: () => void;
}

export const PeriodStep = ({ onClickNextStep }: PeriodStepProps) => {
  const t = useTranslations("newcomer.PeriodStep");

  const { data: me } = useGetMeAsMentor();
  const { period, setPeriod } = useCompleteProfileFormStore();
  const {
    control,
    handleSubmit,
    formState: { isValid, isDirty },
  } = useForm<Pick<Mentor, "period">>({
    values: { period: period ?? me?.period },
  });

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
    <form
      onSubmit={handleSubmit(({ period }) => {
        setPeriod(period);
        onClickNextStep();
      })}
    >
      <div className="headline-1 mb-[36px]">{t.rich("title", { br: () => <br /> })}</div>
      <PeriodSelect
        startDate={startDate.value}
        endDate={endDate.value}
        onChangeStartDate={(date) => startDate.onChange(date)}
        onChangeEndDate={(date) => endDate.onChange(date)}
      />
      <BottomButton type="submit" disabled={!isValid || !isDirty}>
        {t("next")}
      </BottomButton>
    </form>
  );
};
