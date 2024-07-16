import { useTranslations } from "next-intl";
import { useController, useFormContext } from "react-hook-form";
import { BottomButton } from "@/app/components/BottomButton";
import { Checkbox } from "@/components/Checkbox";
import { FormCaption, FormGroup, FormGroupLabel } from "@/components/FormControl";
import { LANGUAGE_OPTIONS } from "@/constants/user";
import { Language } from "@/types/user";
import { SignupForm } from "../types/mentorForm";

export const SubLanguageSelectForm = () => {
  const t = useTranslations("signup.SubLanguageSelectForm");
  const constants = useTranslations("constants");

  const {
    control,
    formState: { isValid },
  } = useFormContext<Pick<SignupForm, "languages">>();

  const { field: mainLanguage } = useController({ control, name: "languages.main" });

  const { field: subLanguages } = useController({
    control,
    name: "languages.sub",
  });

  const handleChangeSubLanguages = (languageCode: Language) => {
    const hasLanguageCode = subLanguages.value.findIndex((v) => v === languageCode);
    if (hasLanguageCode === -1) {
      subLanguages.onChange(subLanguages.value.concat([languageCode]));
    } else {
      subLanguages.onChange(subLanguages.value.filter((v) => v !== languageCode));
    }
  };

  return (
    <>
      <FormGroup>
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
            <Checkbox
              className="p-4 text-start"
              key={option}
              variant="outline"
              checked={subLanguages.value?.some((v) => v === option)}
              onChange={() => handleChangeSubLanguages(option)}
              disabled={mainLanguage && option === mainLanguage.value}
            >
              {constants(`languages-options.${option}`)}
            </Checkbox>
          ))}
        </div>
      </FormGroup>
      <BottomButton type="submit" disabled={!isValid}>
        {t("next")}
      </BottomButton>
    </>
  );
};
