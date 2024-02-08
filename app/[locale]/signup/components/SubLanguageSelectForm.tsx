import { useTranslations } from "next-intl";
import { useController, useFormContext } from "react-hook-form";
import { BottomButton } from "@/app/components/BottomButton";
import { FormControl, FormLabel } from "@/components/FormControl";
import { Toggle } from "@/components/Toggle";
import { languagesOptions } from "@/constants/language";
import { NationCode } from "@/types/user";
import { SignupForm } from "../types/mentorForm";

export const SubLanguageSelectForm = () => {
  const t = useTranslations();

  const {
    control,
    formState: { isValid },
  } = useFormContext<Pick<SignupForm, "languages">>();

  const { field: mainLanguage } = useController({ control, name: "languages.main" });

  const { field: subLanguages } = useController({
    control,
    name: "languages.sub",
  });

  const handleChangeSubLanguages = (languageCode: NationCode) => {
    const hasLanguageCode = subLanguages.value.findIndex((v) => v === languageCode);
    if (hasLanguageCode === -1) {
      subLanguages.onChange(subLanguages.value.concat([languageCode]));
    } else {
      subLanguages.onChange(subLanguages.value.filter((v) => v !== languageCode));
    }
  };

  return (
    <>
      <FormControl>
        <FormLabel className="headline-1 mb-[9px]">
          {t.rich("signup.SubLanguageSelectForm.title", {
            br: () => <br />,
          })}
        </FormLabel>
        <div className="body-1 mb-[14px] text-gray-600">
          {t.rich("signup.SubLanguageSelectForm.description", {
            br: () => <br />,
          })}
        </div>
        <div className="flex flex-col gap-[6px]">
          {languagesOptions.map(([key]) => (
            <Toggle
              className="p-4 text-start"
              key={key}
              variant="outline"
              pressed={subLanguages.value?.some((v) => v === key)}
              onChangePressed={() => handleChangeSubLanguages(key)}
              disabled={mainLanguage && key === mainLanguage.value}
            >
              {t(`languages-options.${key}`)}
            </Toggle>
          ))}
        </div>
      </FormControl>
      <BottomButton type="submit" disabled={!isValid}>
        {t("signup.SubLanguageSelectForm.next")}
      </BottomButton>
    </>
  );
};
