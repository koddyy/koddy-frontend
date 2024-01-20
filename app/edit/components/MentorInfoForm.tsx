"use client";

import { useRouter } from "next/navigation";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useGetMeAsMentor } from "@/apis/user/hooks/useGetMeAsMentor";
import { useUpdateMentorInfo } from "@/apis/user/hooks/useUpdateMentorInfo";
import { BottomButton } from "@/app/components/BottomButton";
import { ProfileImageUpload } from "@/app/components/ProfileImageUpload";
import { Divider } from "@/components/Divider/Divider";
import { FormControl, FormLabel } from "@/components/FormControl";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { TextArea } from "@/components/TextArea";
import { UpdateMentorInfoForm } from "@/types/mentor";
import { LanguageSelectForm } from "./LanguageSelectForm";

const enteredInOptions = [18, 19, 20, 21, 22, 23, 24];

export const MentorInfoForm = () => {
  const router = useRouter();
  const { data: me } = useGetMeAsMentor();
  const { mutate: updateMentorInfo } = useUpdateMentorInfo();

  const values = (
    ["name", "school", "major", "enteredIn", "languages", "introduction"] as Array<keyof typeof me>
  ).reduce((acc, field) => ({ ...acc, [field]: me?.[field] }), {}) as UpdateMentorInfoForm;

  const methods = useForm<UpdateMentorInfoForm>({
    values,
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { isDirty, isValid },
  } = methods;

  const onSubmitForm = (form: UpdateMentorInfoForm) => {
    updateMentorInfo(form, {
      onSuccess: () => {
        router.push("/");
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className="mb-[30px] mt-[24px] px-[20px]">
          <Controller
            control={control}
            name="profileImageFile"
            render={({ field: { onChange } }) => (
              <ProfileImageUpload
                isEditable
                imageUrl={me?.profileImageUrl}
                onChange={(e) => onChange(e.target.files?.[0])}
              />
            )}
          />
        </div>
        <Divider className="border-[4px]" />
        <div className="mb-[24px] mt-[20px] flex flex-col gap-[16px] px-[20px]">
          <FormControl>
            <FormLabel>이름</FormLabel>
            <Input {...register("name")} />
          </FormControl>
          <FormControl>
            <FormLabel>학교</FormLabel>
            <Input {...register("school")} />
          </FormControl>
          <FormControl>
            <FormLabel>전공</FormLabel>
            <Input {...register("major")} />
          </FormControl>
          <FormControl>
            <FormLabel>학번</FormLabel>
            <Controller
              name="enteredIn"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select<number>
                  placeholder="학번을 선택해 주세요."
                  options={enteredInOptions}
                  value={value}
                  onChangeValue={onChange}
                />
              )}
            />
          </FormControl>
        </div>
        <Divider className="border-[4px]" />
        <div className="mb-[24px] mt-[20px] px-[20px]">
          <LanguageSelectForm languages={me ? [me.languages.main, ...me.languages.sub] : []} />
        </div>
        <Divider className="border-[4px]" />
        <div className="mb-[104px] mt-[20px] px-[20px]">
          <FormControl>
            <FormLabel>자기소개</FormLabel>
            <TextArea {...register("introduction")} />
          </FormControl>
        </div>
        <BottomButton type="submit" disabled={!isDirty || !isValid}>
          수정하기
        </BottomButton>
      </form>
    </FormProvider>
  );
};
