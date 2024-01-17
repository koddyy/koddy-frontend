import { useController, useFormContext } from "react-hook-form";
import { BottomButton } from "@/app/components/BottomButton";
import { FormControl, FormLabel } from "@/components/FormControl";
import { Toggle } from "@/components/Toggle";
import { languageCodeText } from "@/constants/language";
import { LanguageCode } from "@/types/user";
import { SignupForm } from "../types/mentorForm";

const languagesOptions = Object.entries(languageCodeText) as Array<[LanguageCode, string]>;

export const SubLanguageSelectForm = () => {
  const {
    control,
    formState: { isValid },
  } = useFormContext<Pick<SignupForm, "languages">>();

  const { field: mainLanguage } = useController({ control, name: "languages.main" });

  const { field: subLanguages } = useController({
    control,
    name: "languages.sub",
  });

  const handleChangeSubLanguages = (languageCode: LanguageCode) => {
    const hasLanguageCode = subLanguages.value.findIndex((v) => v === languageCode);
    if (hasLanguageCode === -1) {
      subLanguages.onChange(subLanguages.value.concat([languageCode]));
    } else {
      subLanguages.onChange(subLanguages.value.filter((v) => v !== languageCode));
    }
  };

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
              pressed={subLanguages.value?.some((v) => v === key)}
              onChangePressed={() => handleChangeSubLanguages(key)}
              disabled={mainLanguage && key === mainLanguage.value}
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
