"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { useGetMe } from "@/apis/user/hooks/useGetMe";
import { BottomButton } from "@/app/components/BottomButton";
import { TextArea } from "@/components/TextArea";
import { Mentor } from "@/types/mentor";
import { useCompleteProfileFormStore } from "../store";

interface IntroductionStepProps {
  onClickNextStep: () => void;
}

export const IntroductionStep = ({ onClickNextStep }: IntroductionStepProps) => {
  const t = useTranslations("newcomer.IntroductionStep");

  const { data: me } = useGetMe();
  const { introduction, setIntroduction } = useCompleteProfileFormStore();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<Pick<Mentor, "introduction">>({
    values: { introduction: introduction ?? me?.introduction },
  });

  return (
    <form
      onSubmit={handleSubmit(({ introduction }) => {
        setIntroduction(introduction);
        onClickNextStep();
      })}
    >
      <div className="headline-1 mb-[15px]">
        {t.rich("title", { name: me?.name, br: () => <br /> })}
      </div>
      <TextArea placeholder={t("placeholder")} {...register("introduction", { required: true })} />
      <BottomButton type="submit" disabled={!isValid}>
        {t("next")}
      </BottomButton>
    </form>
  );
};
