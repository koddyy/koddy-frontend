"use client";

import { useEffect, useState } from "react";
import { BottomButton } from "@/app/components/BottomButton";
import { NavigationBar } from "@/app/components/NavigationBar";
import { FormControl, FormLabel } from "@/components/FormControl";
import { Select } from "@/components/Select";
import { localesOptions } from "@/constants/locale";
import { PATH } from "@/constants/path";
import { timezones } from "@/constants/timezone";
import { useRouter } from "@/libs/navigation";
import { SupportLocale } from "@/types/locale";
import { localeCookie } from "@/utils/locale";
import { getKeys } from "@/utils/object";
import { timezoneCookie } from "@/utils/timezone";

const _localesOptions = getKeys(localesOptions);

const _timezonesOptions = getKeys(timezones);

const Page = () => {
  const router = useRouter();
  const [locale, setLocale] = useState<SupportLocale>();
  const [timezone, setTimezone] = useState<string>();

  const handleChangeLanguageAndTimezone = () => {
    if (locale && timezone) {
      localeCookie.set(locale);
      timezoneCookie.set(timezone);
      router.replace(PATH.MYPAGE, { locale });
    }
  };

  useEffect(() => {
    setLocale(localeCookie.get());
    setTimezone(timezoneCookie.get());
  }, []);

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
          <Select
            options={_timezonesOptions}
            value={timezone}
            renderValue={(value) => value && timezones[value]}
            renderOption={(value) => timezones[value]}
            onChangeValue={setTimezone}
          />
        </FormControl>
      </div>
      <BottomButton onClick={handleChangeLanguageAndTimezone}>변경하기</BottomButton>
    </>
  );
};

export default Page;
