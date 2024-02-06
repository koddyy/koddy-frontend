"use client";

import { useRouter } from "next/navigation";
import { useController, useForm } from "react-hook-form";
import { useGetMe } from "@/apis/user/hooks/useGetMe";
import { NavigationBar } from "@/app/components/NavigationBar";
import { FormControl, FormLabel } from "@/components/FormControl";
import { Toggle } from "@/components/Toggle";
import { languagesOptions } from "@/constants/language";
import { Mentee } from "@/types/mentee";
import { Mentor } from "@/types/mentor";
import { NationCode } from "@/types/user";
import { useMenteeInfoFormStore, useMentorInfoFormStore } from "../store";

const Page = () => {
  const router = useRouter();
  const { data: me } = useGetMe();
  const setMenteeInfoForm = useMenteeInfoFormStore((state) => state.setLanguages);
  const setMentorInfoForm = useMentorInfoFormStore((state) => state.setLanguages);

  const { control, handleSubmit } = useForm<Pick<Mentor, "languages"> | Pick<Mentee, "languages">>({
    defaultValues: {
      languages: {
        main: undefined,
        sub: [] as NationCode[],
      },
    },
  });

  const { field: languagesField } = useController({
    control,
    name: "languages",
    rules: {
      validate: (value) => Boolean(value.main),
    },
  });

  if (!me) return null;

  const handleChangeMainLanguage = (language: NationCode) => {
    const isPressed = language === languagesField.value.main;
    if (isPressed) {
      languagesField.onChange({
        main: "",
        sub: languagesField.value.sub.filter((v) => v !== language),
      });
    } else {
      languagesField.onChange({
        main: language,
        sub: languagesField.value.sub.filter((v) => v !== language),
      });
    }
  };

  const handleChangeSubLanguages = (language: NationCode) => {
    if (!languagesField.value) return;

    const hasLanguageCode = languagesField.value.sub.findIndex((v) => v === language);
    if (hasLanguageCode === -1) {
      languagesField.onChange({
        ...languagesField.value,
        sub: languagesField.value.sub.concat([language]),
      });
    } else {
      languagesField.onChange({
        ...languagesField.value,
        sub: languagesField.value.sub.filter((v) => v !== language),
      });
    }
  };

  const onSubmit = ({ languages }: Pick<Mentor, "languages"> | Pick<Mentee, "languages">) => {
    if (me.role === "mentor") setMentorInfoForm(languages);
    else if (me.role === "mentee") setMenteeInfoForm(languages);

    router.back();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <NavigationBar
        onClickGoback={() => router.back()}
        rightContent={
          <button type="submit" className="body-1">
            수정하기
          </button>
        }
      />
      <div className="mt-[21px] px-[20px]">
        <FormControl className="mb-[35px]">
          <FormLabel className="headline-1 text-gray-600 ">메인 언어 설정</FormLabel>
          <div className="body-1 mb-[14px] text-gray-600">
            가장 편안하고 원활하게 대화할 수 있는 언어를 선택해 주세요.
          </div>
          <div className="flex flex-col gap-[6px]">
            {languagesOptions.map(([key, value]) => (
              <Toggle
                className="p-4 text-start"
                key={key}
                variant="outline"
                pressed={key === languagesField.value?.main}
                onChangePressed={() => handleChangeMainLanguage(key)}
              >
                {value}
              </Toggle>
            ))}
          </div>
        </FormControl>
        <FormControl className="mb-[35px]">
          <FormLabel className="headline-1 text-gray-600">서브 언어 설정</FormLabel>
          <div className="body-1 mb-[14px] text-gray-600">
            어느 정도 소통이 가능한 수준의 언어를 선택해 주세요.
          </div>
          <div className="flex flex-col gap-[6px]">
            {languagesOptions.map(([key, value]) => (
              <Toggle
                className="p-4 text-start"
                key={key}
                variant="outline"
                pressed={languagesField.value?.sub.some((v) => v === key)}
                onChangePressed={() => handleChangeSubLanguages(key)}
                disabled={key === languagesField.value?.main}
              >
                {value}
              </Toggle>
            ))}
          </div>
        </FormControl>
      </div>
    </form>
  );
};

export default Page;
