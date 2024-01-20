"use client";

import { useRouter } from "next/navigation";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useGetMeAsMentee } from "@/apis/user/hooks/useGetMeAsMentee";
import { useUpdateMenteeInfo } from "@/apis/user/hooks/useUpdateMenteeInfo";
import { BottomButton } from "@/app/components/BottomButton";
import { ProfileImageUpload } from "@/app/components/ProfileImageUpload";
import { Divider } from "@/components/Divider/Divider";
import { FormControl, FormLabel } from "@/components/FormControl";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { TextArea } from "@/components/TextArea";
import { NationalityOptions } from "@/constants/mentee";
import { UpdateMenteeInfoForm } from "@/types/mentee";
import { LanguageSelectForm } from "./LanguageSelectForm";

export const MenteeInfoForm = () => {
  const router = useRouter();
  const { data: me } = useGetMeAsMentee();
  const { mutate: updateMenteeInfo } = useUpdateMenteeInfo();

  const values = (
    ["name", "interestSchool", "interestMajor", "languages", "introduction"] as Array<
      keyof typeof me
    >
  ).reduce((acc, field) => ({ ...acc, [field]: me?.[field] }), {}) as UpdateMenteeInfoForm;

  const methods = useForm<UpdateMenteeInfoForm & { profileImageFile?: File }>({
    values,
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { isDirty, isValid },
  } = methods;

  const onSubmitForm = (form: UpdateMenteeInfoForm) => {
    updateMenteeInfo(form, {
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
            <FormLabel>관심 학교</FormLabel>
            <Input {...register("interestSchool")} />
          </FormControl>
          <FormControl>
            <FormLabel>관심 전공</FormLabel>
            <Input {...register("interestMajor")} />
          </FormControl>
          <Controller
            control={control}
            name="nationality"
            render={({ field: { value, onChange } }) => (
              <FormControl>
                <FormLabel>국적</FormLabel>
                <Select
                  placeholder="국적을 선택해 주세요."
                  options={NationalityOptions}
                  value={value}
                  onChangeValue={onChange}
                />
              </FormControl>
            )}
          />
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
