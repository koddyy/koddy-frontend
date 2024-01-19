"use client";

import { useRouter } from "next/navigation";
import { Controller, useController, useForm } from "react-hook-form";
import { useGetMeAsMentor } from "@/apis/user/hooks/useGetMeAsMentor";
import { NavigationBar } from "@/app/components/NavigationBar";
import { ProfileImageUpload } from "@/app/components/ProfileImageUpload";
import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider/Divider";
import { FormControl, FormLabel } from "@/components/FormControl";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { TextArea } from "@/components/TextArea";
import { UpdateMentorInfoForm } from "@/types/mentor";
import { BottomButton } from "../components/BottomButton";

const enteredInOptions = [18, 19, 20, 21, 22, 23, 24];

const languageCategoryOptions = ["메인 언어", "서브 언어"];

const Page = () => {
  const router = useRouter();
  const { data: me } = useGetMeAsMentor();

  const values = (
    ["name", "school", "major", "enteredIn", "languages", "introduction"] as Array<keyof typeof me>
  ).reduce((acc, field) => ({ ...acc, [field]: me?.[field] }), {}) as UpdateMentorInfoForm;

  const {
    register,
    control,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<UpdateMentorInfoForm>({
    values,
  });

  const { field: mainLanguage } = useController({
    control,
    name: "languages.main",
    rules: {
      required: true,
    },
  });

  const { field: subLanguages } = useController({
    control,
    name: "languages.sub",
  });

  const languages = me ? [me.languages.main, ...me.languages.sub] : [];

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <NavigationBar title="회원 정보 수정" onClickGoback={() => router.back()} />
      <div className="mb-[30px] mt-[24px] px-[20px]">
        <ProfileImageUpload
          isEditable
          imageUrl={me?.profileImageUrl}
          {...register("profileImage")}
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
        <FormControl>
          <FormLabel>소통 언어</FormLabel>
          <div className="flex flex-col gap-[10px]">
            {languages?.map((language) => (
              <Select
                key={language}
                options={languageCategoryOptions}
                value={`${language} | ${
                  language === mainLanguage.value ? "메인 언어" : "서브 언어"
                }`}
                onChangeValue={(value) => {
                  if (value === "메인 언어" && mainLanguage.value !== language) {
                    subLanguages.onChange(
                      subLanguages.value
                        .filter((v) => v !== language)
                        .concat(mainLanguage.value ?? [])
                    );
                    mainLanguage.onChange(language);
                  } else if (value === "서브 언어" && !subLanguages.value.includes(language)) {
                    subLanguages.onChange(subLanguages.value.concat(mainLanguage.value));
                    mainLanguage.onChange(null);
                  }
                }}
              />
            ))}
            <Button variant="ghost" className="body-2 bg-gray-100 text-primary-dark">
              추가하기
            </Button>
          </div>
        </FormControl>
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
  );
};

export default Page;
