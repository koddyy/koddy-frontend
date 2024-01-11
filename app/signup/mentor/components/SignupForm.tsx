import { useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import { BottomButton } from "@/app/components/BottomButton";
import { FormControl, FormLabel } from "@/components/FormControl";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import type { SignupForm as ISignupForm } from "../../types/mentorForm";

const enteredInOptions = [18, 19, 20, 21, 22, 23, 24];

interface SignupFormProps {
  onClickNextStep: () => void;
}

export const SignupForm = ({ onClickNextStep }: SignupFormProps) => {
  const {
    register,
    control,
    formState: { isValid },
  } = useFormContext<Omit<ISignupForm, "languages">>();

  /* enteredIn controller */
  const { field: enteredInField } = useController({
    control,
    name: "enteredIn",
    rules: { required: true },
  });

  const [enteredIn, setEnteredIn] = useState<number>();

  const handleChangeEnteredIn = (value: number) => {
    enteredInField.onChange(value);
    setEnteredIn(value);
  };

  return (
    <div className="flex flex-col gap-4">
      <FormControl required>
        <FormLabel htmlFor="school">학교</FormLabel>
        <Input
          placeholder="재학 중인 학교를 입력해 주세요."
          {...register("school", { required: true })}
        />
      </FormControl>

      <FormControl required>
        <FormLabel htmlFor="enteredIn">학번</FormLabel>
        <Select<number>
          placeholder="학번을 선택해 주세요."
          options={enteredInOptions}
          value={enteredIn}
          onChangeValue={handleChangeEnteredIn}
        />
      </FormControl>

      <FormControl required>
        <FormLabel htmlFor="major">전공</FormLabel>
        <Input placeholder="전공을 입력해 주세요." {...register("major", { required: true })} />
      </FormControl>

      <BottomButton disabled={!isValid} onClick={onClickNextStep}>
        다음
      </BottomButton>
    </div>
  );
};
