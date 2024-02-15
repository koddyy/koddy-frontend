"use client";

import { useForm } from "react-hook-form";
import { useGetMe } from "@/apis/user/hooks/useGetMe";
import { BottomButton } from "@/app/components/BottomButton";
import { TextArea } from "@/components/TextArea";
import { Mentor } from "@/types/mentor";
import { useCompleteProfileFormStore } from "../mentor/store";

interface IntroductionStepProps {
  onClickNextStep: () => void;
}

export const IntroductionStep = ({ onClickNextStep }: IntroductionStepProps) => {
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
        {me?.name}님을
        <br />
        소개해 주세요
      </div>
      <TextArea
        placeholder="간단한 소개와 커피챗을 하게 된 이유, 현재는 어떤 경험을 하고 계신지 알려주시면 좋아요!"
        {...register("introduction", { required: true })}
      />
      <BottomButton type="submit" disabled={!isValid}>
        다음
      </BottomButton>
    </form>
  );
};
