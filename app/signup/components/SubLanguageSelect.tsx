import { useMemo } from "react";
import { useController, useFormContext } from "react-hook-form";
import { BottomButton } from "@/app/components/BottomButton";
import { FormControl, FormLabel } from "@/components/FormControl";
import { Toggle } from "@/components/Toggle";
import { languageCodeText } from "@/constants/language";
import { LanguageCode } from "@/types/user";
import { SignupForm } from "../types/mentorForm";

const languagesOptions = Object.entries(languageCodeText) as Array<[LanguageCode, string]>;

export const SubLanguageSelect = () => {
  const {
    control,
    formState: { isValid },
  } = useFormContext<Pick<SignupForm, "languages">>();

  const { field: languageField } = useController({
    control,
    name: "languages",
    rules: {
      validate: (value) => value?.length > 0,
    },
  });

  const handleChangeSubLanguages = (languageCode: LanguageCode) => {
    const hasLanguageCode = languageField.value.findIndex(
      ({ type, category }) => type === "서브 언어" && category === languageCode
    );
    if (hasLanguageCode === -1) {
      languageField.onChange(
        languageField.value.concat([{ type: "서브 언어", category: languageCode }])
      );
    } else {
      languageField.onChange(
        languageField.value.filter(
          ({ type, category }) => type === "메인 언어" || category !== languageCode
        )
      );
    }
  };

  const mainLanguage = useMemo(() => {
    return languageField.value.find(({ type }) => type === "메인 언어");
  }, []);

  const subLanguages = new Set(
    languageField.value.filter(({ type }) => type === "서브 언어").map(({ category }) => category)
  );

  return (
    <>
      <FormControl required>
        <FormLabel>서브 언어를 선택해주세요 (다중 선택 가능)</FormLabel>
        <div className="flex flex-col gap-[6px]">
          {languagesOptions.map(([key, value]) => (
            <Toggle
              className="p-4 text-start"
              key={key}
              variant="outline"
              pressed={subLanguages.has(key)}
              onChangePressed={() => handleChangeSubLanguages(key)}
              disabled={mainLanguage && key === mainLanguage.category}
            >
              {value}
            </Toggle>
          ))}
        </div>
      </FormControl>
      <BottomButton type="submit" disabled={!isValid}>
        완료
      </BottomButton>
    </>
  );
};
