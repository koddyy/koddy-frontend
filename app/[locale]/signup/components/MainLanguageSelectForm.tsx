import { useTranslations } from "next-intl";
import { useController, useFormContext } from "react-hook-form";
import { BottomButton } from "@/app/components/BottomButton";
import { FormControl, FormLabel } from "@/components/FormControl";
import { Toggle } from "@/components/Toggle";
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
      <FormControl>
        <FormLabel className="headline-1 mb-[9px]">
          {t.rich("title", {
            br: () => <br />,
          })}
        </FormLabel>
        <div className="body-1 mb-[14px] text-gray-600">
          {t.rich("description", {
            br: () => <br />,
          })}
        </div>
        <div className="flex flex-col gap-[6px]">
          {LANGUAGE_OPTIONS.map((option) => (
            <Toggle
              className="p-4 text-start"
              key={option}
              variant="outline"
              pressed={option === mainLanguage.value}
              onChangePressed={() => {
                if (option === mainLanguage.value) {
                  mainLanguage.onChange();
                } else {
                  mainLanguage.onChange(option);
                }
              }}
            >
              {constants(`languages-options.${option}`)}
            </Toggle>
          ))}
        </div>
      </FormControl>
      <BottomButton disabled={!isValid} onClick={onClickNextStep}>
        {t("next")}
      </BottomButton>
    </>
  );
};
