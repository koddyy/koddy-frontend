import { useTranslations } from "next-intl";
import { useController, useFormContext } from "react-hook-form";
import { BottomButton } from "@/app/components/BottomButton";
import { FormControl, FormLabel } from "@/components/FormControl";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { Nationality, NationalityOptions, NationalityText } from "@/constants/nationality";
import type { SignupForm as ISignupForm } from "../../types/menteeForm";

const _NationalityOptions = NationalityOptions.map((v) => v[0]);

interface BasicInformationProps {
  onClickNextStep: () => void;
}

export const BasicInformationForm = ({ onClickNextStep }: BasicInformationProps) => {
  const t = useTranslations("signup.BasicInformationForm");

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

  return (
    <div className="flex flex-col gap-4">
      <FormControl required>
        <FormLabel htmlFor="interestSchool">{t("interestSchool.label")}</FormLabel>
        <Input
          placeholder={t("interestSchool.placeholder")}
          {...register("interestSchool", { required: true })}
        />
      </FormControl>

      <FormControl required>
        <FormLabel htmlFor="interestMajor">{t("interestMajor.label")}</FormLabel>
        <Input
          placeholder={t("interestMajor.placeholder")}
          {...register("interestMajor", { required: true })}
        />
      </FormControl>

      <FormControl required>
        <FormLabel htmlFor="nationality">{t("nationality.label")}</FormLabel>
        <Select
          placeholder={t("nationality.placeholder")}
          options={_NationalityOptions}
          renderValue={() => NationalityText[nationalityField.value]}
          renderOption={(option: Nationality) => NationalityText[option]}
          value={nationalityField.value}
          onChangeValue={nationalityField.onChange}
        />
      </FormControl>

      <BottomButton disabled={!isValid} onClick={onClickNextStep}>
        {t("next-button")}
      </BottomButton>
    </div>
  );
};
