import { useController, useFormContext } from "react-hook-form";
import { LinkButton } from "@/components/Button";
import { FormControl, FormErrorMessage, FormLabel } from "@/components/FormControl";
import { Select } from "@/components/Select";
import { NationCodeText } from "@/constants/language";
import { PATH } from "@/constants/path";
import { UpdateMenteeInfoForm } from "@/types/mentee";
import { UpdateMentorInfoForm } from "@/types/mentor";
import { NationCode } from "@/types/user";

const languageCategoryOptions = ["메인 언어", "서브 언어"];

interface LanguageSelectFormProps {
  languages: NationCode[];
}

export const LanguageSelectForm = ({ languages }: LanguageSelectFormProps) => {
  const { control } = useFormContext<
    Pick<UpdateMentorInfoForm, "languages"> | Pick<UpdateMenteeInfoForm, "languages">
  >();

  const { field: languagesField } = useController({
    control,
    name: "languages",
    rules: {
      validate: (value) => Boolean(value.main),
    },
  });

  return (
    <FormControl>
      <FormLabel>소통 언어</FormLabel>
      <div className="flex flex-col gap-[10px]">
        {languages.map((language) => (
          <Select
            key={language}
            options={languageCategoryOptions}
            value={language === languagesField.value.main ? "메인 언어" : "서브 언어"}
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
                <span className="body-2-bold">{NationCodeText[language]}</span>
                <span className="body-2 text-gray-300">|</span>
                <span className="body-2-bold">{value}</span>
              </div>
            )}
            className="p-[16px]"
          />
        ))}
        <FormErrorMessage>메인 언어는 필수값입니다</FormErrorMessage>
        <LinkButton
          href={PATH.MYPAGE_EDIT + "/language"}
          className="body-2 bg-gray-100 text-primary-dark"
        >
          추가하기
        </LinkButton>
      </div>
    </FormControl>
  );
};