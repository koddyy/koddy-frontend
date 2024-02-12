import { useTranslations } from "next-intl";
import { useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import { BottomButton } from "@/app/components/BottomButton";
import { FormControl, FormLabel } from "@/components/FormControl";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import type { SignupForm } from "../../types/mentorForm";

const enteredInOptions = [18, 19, 20, 21, 22, 23, 24];

interface BasicInformationFormProps {
  onClickNextStep: () => void;
}

export const BasicInformationForm = ({ onClickNextStep }: BasicInformationFormProps) => {
  const t = useTranslations("signup.BasicInformationForm.mentor");

  const {
    register,
    control,
    formState: { isValid },
  } = useFormContext<Omit<SignupForm, "languages">>();

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
      <div className="headline-1 mb-[9px]">{t.rich("title", { br: () => <br /> })}</div>
      <FormControl required>
        <FormLabel htmlFor="school">{t("school.label")}</FormLabel>
        <Input placeholder={t("school.placeholder")} {...register("school", { required: true })} />
      </FormControl>

      <FormControl required>
        <FormLabel htmlFor="enteredIn">{t("entered-in.label")}</FormLabel>
        <Select<number>
          placeholder={t("entered-in.placeholder")}
          options={enteredInOptions}
          value={enteredIn}
          onChangeValue={handleChangeEnteredIn}
        />
      </FormControl>

      <FormControl required>
        <FormLabel htmlFor="major">{t("major.label")}</FormLabel>
        <Input placeholder={t("major.placeholder")} {...register("major", { required: true })} />
      </FormControl>

      <BottomButton disabled={!isValid} onClick={onClickNextStep}>
        {t("next")}
      </BottomButton>
    </div>
  );
};
