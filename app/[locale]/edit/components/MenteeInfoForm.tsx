"use client";

import { useRouter } from "next/navigation";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useGetMeAsMentee } from "@/apis/user/hooks/useGetMeAsMentee";
import { useUpdateMenteeInfo } from "@/apis/user/hooks/useUpdateMenteeInfo";
import { BottomButton } from "@/app/components/BottomButton";
import { ProfileImageUpload } from "@/app/components/ProfileImageUpload";
import { LinkButton } from "@/components/Button";
import { Divider } from "@/components/Divider/Divider";
import { FormControl, FormLabel } from "@/components/FormControl";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { TextArea } from "@/components/TextArea";
import { NationalityOptions, NationalityText } from "@/constants/nationality";
import { PATH } from "@/constants/path";
import { UpdateMenteeInfoForm } from "@/types/mentee";
import { Nationality } from "@/types/user";
import { useMenteeInfoFormStore } from "../store";
import { LanguageSelectForm } from "./LanguageSelectForm";

const _NationalityOptions = NationalityOptions.map((v) => v[0]);

export const MenteeInfoForm = () => {
  const router = useRouter();
  const { data: me } = useGetMeAsMentee();
  const { mutate: updateMenteeInfo } = useUpdateMenteeInfo();
  const { isModified, setIsModified, userInfoForm, setUserInfoForm } = useMenteeInfoFormStore();

  const values = (
    [
      "name",
      "interestSchool",
      "interestMajor",
      "nationality",
      "languages",
      "introduction",
    ] as Array<keyof typeof me>
  ).reduce((acc, field) => ({ ...acc, [field]: me?.[field] }), {}) as UpdateMenteeInfoForm;

  const methods = useForm<UpdateMenteeInfoForm & { profileImageFile?: File }>({
    values: { ...values, ...userInfoForm },
  });

  const {
    register,
    control,
    getValues,
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

  const handleAddLanguages = () => {
    if (isDirty) {
      setIsModified(true);
    }
    setUserInfoForm(getValues());
  };

  const languages = (
    userInfoForm?.languages
      ? [userInfoForm?.languages.main].concat(userInfoForm?.languages.sub)
      : [values.languages.main].concat(values.languages.sub)
  ).filter((e) => !!e);

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
                  options={_NationalityOptions}
                  renderValue={() => NationalityText[value]}
                  renderOption={(option: Nationality) => NationalityText[option]}
                  value={value}
                  onChangeValue={onChange}
                />
              </FormControl>
            )}
          />
        </div>
        <Divider className="border-[4px]" />
        <div className="mb-[24px] mt-[20px] flex flex-col gap-[10px] px-[20px]">
          <LanguageSelectForm languages={languages} />
          <LinkButton
            href={PATH.MYPAGE_EDIT + "/language"}
            className="body-2 bg-gray-100 text-primary-dark"
            onClick={handleAddLanguages}
          >
            추가하기
          </LinkButton>
        </div>
        <Divider className="border-[4px]" />
        <div className="mb-[104px] mt-[20px] px-[20px]">
          <FormControl>
            <FormLabel>자기소개</FormLabel>
            <TextArea {...register("introduction")} />
          </FormControl>
        </div>
        <BottomButton type="submit" disabled={(!isDirty && !isModified) || !isValid}>
          수정하기
        </BottomButton>
      </form>
    </FormProvider>
  );
};
