"use client";

import { useState } from "react";
import { BottomButton } from "@/app/components/BottomButton";
import { NavigationBar } from "@/app/components/NavigationBar";
import { FormControl, FormLabel } from "@/components/FormControl";
import { Select } from "@/components/Select";
import { localesOptions } from "@/constants/locale";
import { PATH } from "@/constants/path";
import { timezones } from "@/constants/timezone";
import { useRouter } from "@/libs/navigation";
import { localeCookie } from "@/utils/locale";
import { getKeys } from "@/utils/object";
import { timezoneCookie } from "@/utils/timezone";

const _localesOptions = getKeys(localesOptions);

const Page = () => {
  const router = useRouter();
  const [locale, setLocale] = useState(localeCookie.get());
  const [timezone, setTimezone] = useState(timezoneCookie.get());

  const handleChangeLanguageAndTimezone = () => {
    localeCookie.set(locale);
    timezoneCookie.set(timezone);
    router.replace(PATH.MYPAGE, { locale });
  };

  return (
    <>
      <NavigationBar
        title="언어&타임존 설정"
        titleFontWeight="regular"
        onClickGoback={() => router.back()}
      />
      <div className="flex flex-col gap-[24px] px-[20px] py-[24px]">
        <FormControl>
          <FormLabel>사용언어</FormLabel>
          <Select
            options={_localesOptions}
            value={locale}
            renderValue={(value) => value && localesOptions[value]}
            renderOption={(value) => localesOptions[value]}
            onChangeValue={setLocale}
          />
        </FormControl>
        <FormControl>
          <FormLabel>타임존</FormLabel>
          <Select options={timezones} value={timezone} onChangeValue={setTimezone} />
        </FormControl>
      </div>
      <BottomButton onClick={handleChangeLanguageAndTimezone}>변경하기</BottomButton>
    </>
  );
};

export default Page;
