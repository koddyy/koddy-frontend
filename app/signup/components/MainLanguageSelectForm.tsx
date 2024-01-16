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

  const { field: mainLanguage } = useController({
    control,
    name: "languages.main",
    rules: {
      required: true,
    },
  });

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
              pressed={key === mainLanguage.value}
              onChangePressed={() => {
                if (key === mainLanguage.value) {
                  mainLanguage.onChange();
                } else {
                  mainLanguage.onChange(key);
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
