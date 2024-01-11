import { useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import { BottomButton } from "@/app/components/BottomButton";
import { FormControl, FormLabel } from "@/components/FormControl";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import type { SignupForm as ISignupForm } from "../../types/menteeForm";

const nationalityOptions = ["한국", "미국", "일본", "중국", "베트남", "Others"];

interface SignupFormProps {
  onClickNextStep: () => void;
}

export const SignupForm = ({ onClickNextStep }: SignupFormProps) => {
  const {
    register,
    control,
    formState: { isValid },
  } = useFormContext<ISignupForm>();

  /* nationality controller */
  const { field: nationalityField } = useController({
    control,
    name: "nationality",
    rules: { required: true },
  });

  const [nationality, setNationality] = useState("");

  const handleChangeNationality = (value: string) => {
    nationalityField.onChange(value);
    setNationality(value);
  };

  return (
    <div className="flex flex-col gap-4">
      <FormControl required>
        <FormLabel htmlFor="interestSchool">관심 학교</FormLabel>
        <Input
          placeholder="관심있는 학교를 입력해 주세요."
          {...register("interestSchool", { required: true })}
        />
      </FormControl>

      <FormControl required>
        <FormLabel htmlFor="interestMajor">관심 전공</FormLabel>
        <Input
          placeholder="관심있는 전공을 입력해 주세요."
          {...register("interestMajor", { required: true })}
        />
      </FormControl>

      <FormControl required>
        <FormLabel htmlFor="nationality">국적</FormLabel>
        <Select
          placeholder="국적을 선택해 주세요."
          options={nationalityOptions}
          value={nationality}
          onChangeValue={handleChangeNationality}
        />
      </FormControl>

      <BottomButton disabled={!isValid} onClick={onClickNextStep}>
        완료
      </BottomButton>
    </div>
  );
};
