import { useTranslations } from "next-intl";
import { useController, useFormContext } from "react-hook-form";
import { BottomButton } from "@/app/components/BottomButton";
import { FormCaption, FormGroupLabel } from "@/components/FormControl";
import { Radio, RadioGroup } from "@/components/RadioGroup";
import { LANGUAGE_OPTIONS } from "@/constants/user";
import type { SignupForm } from "../types/mentorForm";

interface MainLanguageSelectFormProps {
  onClickNextStep: () => void;
}

export const MainLanguageSelectForm = ({ onClickNextStep }: MainLanguageSelectFormProps) => {
  const t = useTranslations("signup.MainLanguageSelectForm");
  const constants = useTranslations("constants");

  const {
    control,
    formState: { isValid },
  } = useFormContext<Pick<SignupForm, "languages">>();

  const { field: mainLanguage } = useController({
    control,
    name: "languages.main",
    rules: {
      required: true,
    },
  });

  return (
    <>
      <RadioGroup
        name="mainLanguage"
        value={mainLanguage.value}
        onChangeValue={(value) => {
          if (value === mainLanguage.value) {
            mainLanguage.onChange();
          } else {
            mainLanguage.onChange(value);
          }
        }}
      >
        <FormGroupLabel className="headline-1 mb-[9px]">
          {t.rich("title", {
            br: () => <br />,
          })}
        </FormGroupLabel>
        <FormCaption className="body-1 mb-[14px] text-gray-600">
          {t.rich("description", {
            br: () => <br />,
          })}
        </FormCaption>
        <div className="flex flex-col gap-[6px]">
          {LANGUAGE_OPTIONS.map((option) => (
            <Radio key={option} className="p-4 text-start" variant="outline" value={option}>
              {constants(`languages-options.${option}`)}
            </Radio>
          ))}
        </div>
      </RadioGroup>
      <BottomButton disabled={!isValid} onClick={onClickNextStep}>
        {t("next")}
      </BottomButton>
    </>
  );
};
