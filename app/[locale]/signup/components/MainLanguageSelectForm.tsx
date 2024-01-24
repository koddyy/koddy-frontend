import { useTranslations } from "next-intl";
import { useController, useFormContext } from "react-hook-form";
import { BottomButton } from "@/app/components/BottomButton";
import { FormControl, FormLabel } from "@/components/FormControl";
import { Toggle } from "@/components/Toggle";
import { languagesOptions } from "@/constants/language";
import type { SignupForm } from "../types/mentorForm";

interface MainLanguageSelectFormProps {
  onClickNextStep: () => void;
}

export const MainLanguageSelectForm = ({ onClickNextStep }: MainLanguageSelectFormProps) => {
  const t = useTranslations();

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
          {t.rich("signup.MainLanguageSelectForm.title", {
            line: (chunks) => <div>{chunks}</div>,
          })}
        </FormLabel>
        <div className="body-1 mb-[14px] text-gray-600">
          {t("signup.SubLanguageSelectForm.description")}
        </div>
        <div className="flex flex-col gap-[6px]">
          {languagesOptions.map(([key]) => (
            <Toggle
              className="p-4 text-start"
              key={key}
              variant="outline"
              pressed={key === mainLanguage.value}
              onChangePressed={() => {
                if (key === mainLanguage.value) {
                  mainLanguage.onChange();
                } else {
                  mainLanguage.onChange(key);
                }
              }}
            >
              {t(`languages-options.${key}`)}
            </Toggle>
          ))}
        </div>
      </FormControl>
      <BottomButton disabled={!isValid} onClick={onClickNextStep}>
        {t("signup.MainLanguageSelectForm.next-button")}
      </BottomButton>
    </>
  );
};
