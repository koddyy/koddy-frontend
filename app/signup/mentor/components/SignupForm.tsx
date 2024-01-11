import { useState } from "react";
import { useController, useForm } from "react-hook-form";
import { BottomButton } from "@/app/components/BottomButton";
import { FormControl, FormLabel } from "@/components/FormControl";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { Toggle } from "@/components/Toggle";
import { languageCodeText } from "@/constants/language";
import { LanguageCode } from "@/types/user";
import { cn } from "@/utils/cn";
import type { SignupForm as ISignupForm } from "../../types/mentorForm";

const enteredInOptions = [18, 19, 20, 21, 22, 23, 24];
const languagesOptions = Object.entries(languageCodeText) as Array<[LanguageCode, string]>;

interface SignupFormProps {
  onSubmitForm: (data: ISignupForm) => void;
}

export const SignupForm = ({ onSubmitForm }: SignupFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<ISignupForm>();

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

  /** languages controller */
  const { field: languagesField } = useController({
    control,
    name: "languages",
    rules: {
      validate: (value) => value?.length > 0,
    },
  });

  const [languages, setLanguages] = useState(() =>
    new Array<boolean>(languagesOptions.length).fill(false)
  );

  const handleChangeLanguages = (index: number) => {
    const cloned = [...languages];
    cloned[index] = !cloned[index];
    languagesField.onChange(languagesOptions.filter((_, i) => cloned[i] === true).map((v) => v[0]));
    setLanguages(cloned);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmitForm)}>
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

      <FormControl required>
        <FormLabel htmlFor="languages">소통할 수 있는언어</FormLabel>
        <div className="flex flex-wrap gap-2 rounded-[0.625rem] border border-gray-300 px-[0.875rem] py-[0.4375rem]">
          {languagesOptions.map(([value, label], index) => {
            const isPressed = languages[index];
            return (
              <Toggle
                className={cn(
                  "label rounded-[1.25rem] bg-gray-200 px-2 py-[0.375rem]",
                  isPressed && "label-bold bg-primary"
                )}
                key={value}
                pressed={isPressed}
                onChangePressed={() => handleChangeLanguages(index)}
              >
                {label}
              </Toggle>
            );
          })}
        </div>
      </FormControl>

      <BottomButton type="submit" disabled={!isValid}>
        완료
      </BottomButton>
    </form>
  );
};
