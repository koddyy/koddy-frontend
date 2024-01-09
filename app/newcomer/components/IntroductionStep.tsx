import { useFormContext } from "react-hook-form";
import { BottomButton } from "@/app/components/BottomButton";
import { TextArea } from "@/components/TextArea";

interface IntroductionStepProps {
  onClickNextStep: () => void;
}

export const IntroductionStep = ({ onClickNextStep }: IntroductionStepProps) => {
  const {
    register,
    formState: { isValid },
  } = useFormContext();

  return (
    <>
      <div className="headline-1 mb-[15px]">
        OOO님을
        <br />
        소개해 주세요
      </div>
      <TextArea
        placeholder="간단한 소개와 커피챗을 하게 된 이유, 현재는 어떤 경험을 하고 계신지 알려주시면 좋아요!"
        {...register("introduction", { required: true })}
      />
      <BottomButton disabled={!isValid} onClick={onClickNextStep}>
        다음
      </BottomButton>
    </>
  );
};
