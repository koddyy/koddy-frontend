import { Controller, useForm } from "react-hook-form";
import { BottomButton } from "@/app/_components/BottomButton";
import { FormControl, FormLabel } from "@/components/FormControl";
import { MultiSelect, Select } from "@/components/Select";
import { TextArea } from "@/components/TextArea";
import type { ThirdStepData } from "@/types/data";

const language_options = ["한국어", "영어", "독일어"];

interface ThirdStepProps {
  onClickNextStep: (data: ThirdStepData) => void;
}

export const ThirdStep = ({ onClickNextStep }: ThirdStepProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<ThirdStepData>();

  return (
    <form className="mt-[1.44rem] flex flex-col gap-4" onSubmit={handleSubmit(onClickNextStep)}>
      <FormControl required>
        <FormLabel htmlFor="nationality">국적</FormLabel>
        <Controller
          control={control}
          name="nationality"
          render={({ field }) => (
            <Select
              options={["South Korea", "US", "Germany", "Austrailia"]}
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
            <MultiSelect
              options={language_options}
              values={new Set(field.value)}
              onAddValues={(value: string) => {
                const cloned = new Set(field.value);
                cloned.add(value);
                field.onChange([...cloned]);
              }}
              onDeleteValues={(value: string) => {
                const cloned = new Set(field.value);
                cloned.delete(value);
                field.onChange([...cloned]);
              }}
              placeholder="구사언어를 선택해 주세요."
            />
          )}
          rules={{
            required: true,
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>줌 링크</FormLabel>
        <TextArea height="sm" {...register("link")} />
      </FormControl>
      <FormControl>
        <FormLabel>자기소개</FormLabel>
        <TextArea {...register("introduce")} />
      </FormControl>
      <BottomButton type="submit" disabled={!isValid}>
        다음
      </BottomButton>
    </form>
  );
};