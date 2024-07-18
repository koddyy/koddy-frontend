import { useTranslations } from "next-intl";
import { useController, useFormContext } from "react-hook-form";
import { FormControl, FormLabel } from "@/components/FormControl";
import { Select } from "@/components/Select";
import { Language } from "@/types/user";
import { MenteeInfoForm } from "./MenteeInfoForm";
import { MentorInfoForm } from "./MentorInfoForm";

type LanguageType = "main" | "sub";

const LANGUAGE_TYPE: LanguageType[] = ["main", "sub"];

interface LanguageSelectFormProps {
  languages: Language[];
}

export const LanguageSelectForm = ({ languages }: LanguageSelectFormProps) => {
  const t = useTranslations("edit.profile.LanguageSelectForm");
  const constants = useTranslations("constants");

  const { control } = useFormContext<
    Pick<MentorInfoForm, "languages"> | Pick<MenteeInfoForm, "languages">
  >();

  const {
    field: languagesField,
    formState: { isValid },
  } = useController({
    control,
    name: "languages",
    rules: {
      validate: (value) => Boolean(value.main),
    },
  });

  return (
    <FormControl>
      <FormLabel>{t("languages")}</FormLabel>
      <div className="flex flex-col gap-[10px]">
        {languages.map((language) => (
          <Select
            key={language}
            options={LANGUAGE_TYPE}
            value={language === languagesField.value.main ? "main" : "sub"}
            onChangeValue={(value) => {
              if (value === "main" && languagesField.value.main !== language) {
                languagesField.onChange({
                  main: language,
                  sub: languagesField.value.sub
                    .filter((v) => v !== language)
                    .concat(languagesField.value.main ?? []),
                });
              } else if (value === "sub" && !languagesField.value.sub.includes(language)) {
                languagesField.onChange({
                  main: null,
                  sub: languagesField.value.sub.concat(languagesField.value.main),
                });
              }
            }}
            renderValue={(value) =>
              value && (
                <div className="flex gap-[6px]">
                  <span className="body-2-bold">{constants(`languages-options.${language}`)}</span>
                  <span className="body-2 text-gray-300">|</span>
                  <span className="body-2-bold">{constants(`language-type.${value}`)}</span>
                </div>
              )
            }
            renderOption={(value) => constants(`language-type.${value}`)}
            className="p-[16px]"
          />
        ))}
        {!isValid && (
          <div className="body-3 text-danger">{t("main-language-is-required-error-message")}</div>
        )}
      </div>
    </FormControl>
  );
};
