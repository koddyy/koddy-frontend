import { useTranslations } from "next-intl";
import { useController, useFormContext } from "react-hook-form";
import { BottomButton } from "@/app/components/BottomButton";
import { FormControl, FormLabel } from "@/components/FormControl";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { NATIONALITY_OPTIONS } from "@/constants/user";
import type { SignupForm as ISignupForm } from "@/features/user/types/menteeForm";
import { Nationality } from "@/types/user";

interface BasicInformationProps {
  onClickNextStep: () => void;
}

export const BasicInformationForm = ({ onClickNextStep }: BasicInformationProps) => {
  const t = useTranslations("signup.BasicInformationForm.mentee");
  const constants = useTranslations("constants");

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
      <div className="headline-1 mb-[9px]">{t.rich("title", { br: () => <br /> })}</div>
      <FormControl>
        <FormLabel htmlFor="interestSchool">{t("interest-school.label")}</FormLabel>
        <Input
          placeholder={t("interest-school.placeholder")}
          {...register("interestSchool", { required: true })}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="interestMajor">{t("interest-major.label")}</FormLabel>
        <Input
          placeholder={t("interest-major.placeholder")}
          {...register("interestMajor", { required: true })}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="nationality">{t("nationality.label")}</FormLabel>
        <Select<Nationality>
          placeholder={t("nationality.placeholder")}
          options={NATIONALITY_OPTIONS}
          renderValue={(value) => value && constants(`nationality-options.${value}`)}
          renderOption={(option) => constants(`nationality-options.${option}`)}
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
