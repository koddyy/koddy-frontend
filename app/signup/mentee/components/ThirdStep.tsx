import { Controller, useForm } from "react-hook-form";
import { BottomButton } from "@/app/components/BottomButton";
import { LANGUAGES } from "@/app/signup/mentor/components/ThirdStep";
import type { ThirdStepForm } from "@/app/signup/types/menteeForm";
import { FormControl, FormLabel } from "@/components/FormControl";
import { Select } from "@/components/Select";
import { TextArea } from "@/components/TextArea";
import { Toggle } from "@/components/Toggle";
import type { LanguageType } from "@/types/user";
import { cn } from "@/utils/cn";

interface ThirdStepProps {
  onSubmitForm: (data: ThirdStepForm) => void;
}

export const ThirdStep = ({ onSubmitForm }: ThirdStepProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<ThirdStepForm>({
    defaultValues: { languages: [] },
  });

  return (
    <form className="mt-[1.44rem] flex flex-col gap-4" onSubmit={handleSubmit(onSubmitForm)}>
      <FormControl required>
        <FormLabel htmlFor="nationality">국적</FormLabel>
        <Controller
          control={control}
          name="nationality"
          render={({ field }) => (
            <Select
              options={["한국", "미국", "일본", "베트남", "Others"]}
              value={field.value}
              onChangeValue={(value: string) => field.onChange(value)}
              placeholder="국적을 선택해 주세요."
            />
          )}
          rules={{
            required: true,
          }}
        />
      </FormControl>
      <FormControl required>
        <FormLabel htmlFor="languages">구사언어</FormLabel>
        <Controller
          control={control}
          name="languages"
          render={({ field }) => (
            <div className="flex flex-wrap gap-2 rounded-[0.625rem] border border-gray-300 px-[0.875rem] py-[0.4375rem]">
              {Object.entries(LANGUAGES).map(([value, label]) => {
                const isPressed = field.value.some((v) => v === value);
                return (
                  <Toggle
                    className={cn(
                      "label rounded-[1.25rem] bg-gray-200 px-2 py-[0.375rem]",
                      isPressed && "label-bold bg-primary"
                    )}
                    key={value}
                    pressed={isPressed}
                    onChangePressed={() =>
                      isPressed
                        ? field.onChange(field.value.filter((v) => v !== value))
                        : field.onChange(field.value.concat(value as LanguageType))
                    }
                  >
                    {label}
                  </Toggle>
                );
              })}
            </div>
          )}
          rules={{
            required: true,
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>자기소개</FormLabel>
        <TextArea {...register("introduce")} />
      </FormControl>
      <BottomButton type="submit" disabled={!isValid}>
        코띠 시작하기
      </BottomButton>
    </form>
  );
};
