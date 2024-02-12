import { useTranslations } from "next-intl";
import { useController, useFormContext } from "react-hook-form";
import { FormControl, FormLabel } from "@/components/FormControl";
import { Select } from "@/components/Select";
import { UpdateMenteeInfoForm } from "@/types/mentee";
import { UpdateMentorInfoForm } from "@/types/mentor";
import { NationCode } from "@/types/user";

const languageCategoryOptions = ["메인 언어", "서브 언어"];

interface LanguageSelectFormProps {
  languages: NationCode[];
}

export const LanguageSelectForm = ({ languages }: LanguageSelectFormProps) => {
  const t = useTranslations("edit.profile.LanguageSelectForm");
  const constants = useTranslations("constants");

  const { control } = useFormContext<
    Pick<UpdateMentorInfoForm, "languages"> | Pick<UpdateMenteeInfoForm, "languages">
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
            options={languageCategoryOptions}
            value={
              language === languagesField.value.main
                ? constants("language-type.main")
                : constants("language-type.sub")
            }
            onChangeValue={(value) => {
              if (value === "메인 언어" && languagesField.value.main !== language) {
                languagesField.onChange({
                  main: language,
                  sub: languagesField.value.sub
                    .filter((v) => v !== language)
                    .concat(languagesField.value.main ?? []),
                });
              } else if (value === "서브 언어" && !languagesField.value.sub.includes(language)) {
                languagesField.onChange({
                  main: null,
                  sub: languagesField.value.sub.concat(languagesField.value.main),
                });
              }
            }}
            renderValue={(value) => (
              <div className="flex gap-[6px]">
                <span className="body-2-bold">{constants(`languages-options.${language}`)}</span>
                <span className="body-2 text-gray-300">|</span>
                <span className="body-2-bold">{value}</span>
              </div>
            )}
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
