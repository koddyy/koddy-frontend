import { useController, useFormContext } from "react-hook-form";
import { BottomButton } from "@/app/components/BottomButton";
import { FormControl, FormLabel } from "@/components/FormControl";
import { Toggle } from "@/components/Toggle";
import { languageCodeText } from "@/constants/language";
import { LanguageCode } from "@/types/user";
import type { SignupForm } from "../types/mentorForm";

const languagesOptions = Object.entries(languageCodeText) as Array<[LanguageCode, string]>;

interface MainLanguageSelectFormProps {
  onClickNextStep: () => void;
}

export const MainLanguageSelectForm = ({ onClickNextStep }: MainLanguageSelectFormProps) => {
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

  const mainLanguage = languageField.value?.[0]?.category;

  return (
    <>
      <FormControl required>
        <FormLabel>메인 언어를 선택해주세요 (1개 선택 가능)</FormLabel>
        <div className="flex flex-col gap-[6px]">
          {languagesOptions.map(([key, value]) => (
            <Toggle
              className="p-4 text-start"
              key={key}
              variant="outline"
              pressed={key === mainLanguage}
              onChangePressed={() => {
                if (key === mainLanguage) {
                  languageField.onChange([]);
                } else {
                  languageField.onChange([{ type: "메인 언어", category: key }]);
                }
              }}
            >
              {value}
            </Toggle>
          ))}
        </div>
      </FormControl>
      <BottomButton disabled={!isValid} onClick={onClickNextStep}>
        다음
      </BottomButton>
    </>
  );
};
