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
  const t = useTranslations("signup.BasicInformationForm.mentee");

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
        <FormLabel htmlFor="interestSchool">{t("interest-school.label")}</FormLabel>
        <Input
          placeholder={t("interest-school.placeholder")}
          {...register("interestSchool", { required: true })}
        />
      </FormControl>

      <FormControl required>
        <FormLabel htmlFor="interestMajor">{t("interest-major.label")}</FormLabel>
        <Input
          placeholder={t("interest-major.placeholder")}
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
        {t("next")}
      </BottomButton>
    </div>
  );
};
