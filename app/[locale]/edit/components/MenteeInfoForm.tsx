"use client";

import { useTranslations } from "next-intl";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useGetMeAsMentee } from "@/apis/user/hooks/useGetMeAsMentee";
import { useUpdateMenteeInfo } from "@/apis/user/hooks/useUpdateMenteeInfo";
import { BottomButton } from "@/app/components/BottomButton";
import { ProfileImageUpload } from "@/app/components/ProfileImageUpload";
import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider/Divider";
import { FormControl, FormLabel } from "@/components/FormControl";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { TextArea } from "@/components/TextArea";
import { NationalityOptions } from "@/constants/nationality";
import { PATH } from "@/constants/path";
import { Link, useRouter } from "@/libs/navigation";
import { UpdateMenteeInfoForm } from "@/types/mentee";
import { Nationality } from "@/types/user";
import { useMenteeInfoFormStore } from "../store";
import { LanguageSelectForm } from "./LanguageSelectForm";

const _NationalityOptions = NationalityOptions.map((v) => v[0]);

export const MenteeInfoForm = () => {
  const t = useTranslations("edit.profile.MenteeInfoForm");
  const constants = useTranslations("constants");

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
            <FormLabel>{t("name")}</FormLabel>
            <Input {...register("name")} />
          </FormControl>
          <FormControl>
            <FormLabel>{t("interest-school")}</FormLabel>
            <Input {...register("interestSchool")} />
          </FormControl>
          <FormControl>
            <FormLabel>{t("interest-major")}</FormLabel>
            <Input {...register("interestMajor")} />
          </FormControl>
          <Controller
            control={control}
            name="nationality"
            render={({ field: { value, onChange } }) => (
              <FormControl>
                <FormLabel>{t("nationality")}</FormLabel>
                <Select
                  placeholder="국적을 선택해 주세요."
                  options={_NationalityOptions}
                  renderValue={() => constants(`nationality-options.${value}`)}
                  renderOption={(option: Nationality) => constants(`nationality-options.${option}`)}
                  value={value}
                  onChangeValue={onChange}
                />
              </FormControl>
            )}
          />
        </div>
        <Divider className="border-[4px]" />
        <div className="mb-[24px] mt-[20px] px-[20px]">
          <LanguageSelectForm languages={languages} />
          <Link href={PATH.MYPAGE_EDIT + "/language"} onClick={handleAddLanguages}>
            <Button
              variant="ghost"
              className="body-2-bold mt-[10px] block bg-gray-100 text-primary-dark"
            >
              {t("add")}
            </Button>
          </Link>
        </div>
        <Divider className="border-[4px]" />
        <div className="mb-[104px] mt-[20px] px-[20px]">
          <FormControl>
            <FormLabel>{t("introduction")}</FormLabel>
            <TextArea {...register("introduction")} />
          </FormControl>
        </div>
        <BottomButton type="submit" disabled={(!isDirty && !isModified) || !isValid}>
          {t("edit")}
        </BottomButton>
      </form>
    </FormProvider>
  );
};
