import { useState } from "react";
import { useForm } from "react-hook-form";
import { BottomButton } from "@/app/_components/BottomButton";
import type { FirstStepForm as FirstStepSubmitForm } from "@/app/signup/types/mentorForm";
import { Checkbox } from "@/components/Checkbox";
import { Divider } from "@/components/Divider/Divider";
import { FormControl, FormErrorMessage, FormLabel } from "@/components/FormControl";
import { Input } from "@/components/Input";

type FirstStepForm = FirstStepSubmitForm & { confirmPassword: string };

interface FirstStepProps {
  onClickNextStep: (data: FirstStepSubmitForm) => void;
}

export const FirstStep = ({ onClickNextStep }: FirstStepProps) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FirstStepForm>();
  const [isAgreed, setIsAgreed] = useState(false);

  const onSubmit = (data: FirstStepForm) => {
    const { confirmPassword, ...rest } = data;
    if (data.password === confirmPassword) {
      onClickNextStep(rest);
      return;
    }
    setError("confirmPassword", { message: "비밀번호가 일치하지 않습니다." });
  };

  return (
    <form
      className="mt-[1.44rem] flex flex-col gap-4 pb-[1.5rem]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormControl required>
        <FormLabel>이메일</FormLabel>
        <Input
          type="email"
          placeholder="이메일을 입력해 주세요."
          {...register("email", {
            required: true,
          })}
        />
      </FormControl>
      <FormControl required hasError={Boolean(errors.password)}>
        <FormLabel>비밀번호</FormLabel>
        <Input
          type="password"
          placeholder="비밀번호를 입력해 주세요."
          {...register("password", {
            required: true,
            minLength: 10,
            maxLength: 20,
            pattern: /^[a-zA-Z0-9]*$/,
          })}
        />
        <FormErrorMessage>10~20자의 영문자 및 숫자 조합으로 작성해 주세요.</FormErrorMessage>
      </FormControl>
      <FormControl required hasError={Boolean(errors.confirmPassword)}>
        <FormLabel>비밀번호 확인</FormLabel>
        <Input
          type="password"
          placeholder="비밀번호를 재입력해주세요."
          {...register("confirmPassword", {
            required: true,
          })}
        />
        <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
      </FormControl>
      <Divider />
      <div className="flex">
        <Checkbox checked={isAgreed} onChangeChecked={(e) => setIsAgreed(e.target.checked)}>
          <div className="body-2 [&>button]:body-2-bold [&>button]:text-primary [&>button]:underline">
            <button>이용약관</button>
            &nbsp;및 &nbsp;
            <button> 개인정보 수집ㆍ이용 동의서</button>
            &nbsp;동의 (필수)
          </div>
        </Checkbox>
      </div>
      <BottomButton type="submit" disabled={!isAgreed}>
        다음
      </BottomButton>
    </form>
  );
};
