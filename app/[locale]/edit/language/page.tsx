"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("edit.language");
  const constants = useTranslations("constants");

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
            {t("edit")}
          </button>
        }
      />
      <div className="mt-[21px] px-[20px]">
        <FormControl className="mb-[35px]">
          <FormLabel className="headline-1 text-gray-600 ">{t("main-language.label")}</FormLabel>
          <div className="body-1 mb-[14px] text-gray-600">{t("main-language.description")}</div>
          <div className="flex flex-col gap-[6px]">
            {languagesOptions.map(([key]) => (
              <Toggle
                className="p-4 text-start"
                key={key}
                variant="outline"
                pressed={key === languagesField.value?.main}
                onChangePressed={() => handleChangeMainLanguage(key)}
              >
                {constants(`languages-options.${key}`)}
              </Toggle>
            ))}
          </div>
        </FormControl>
        <FormControl className="mb-[35px]">
          <FormLabel className="headline-1 text-gray-600">{t("sub-language.label")}</FormLabel>
          <div className="body-1 mb-[14px] text-gray-600">{t("sub-language.description")}</div>
          <div className="flex flex-col gap-[6px]">
            {languagesOptions.map(([key]) => (
              <Toggle
                className="p-4 text-start"
                key={key}
                variant="outline"
                pressed={languagesField.value?.sub.some((v) => v === key)}
                onChangePressed={() => handleChangeSubLanguages(key)}
                disabled={key === languagesField.value?.main}
              >
                {constants(`languages-options.${key}`)}
              </Toggle>
            ))}
          </div>
        </FormControl>
      </div>
    </form>
  );
};

export default Page;
