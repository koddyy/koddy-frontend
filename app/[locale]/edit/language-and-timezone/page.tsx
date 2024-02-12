"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { BottomButton } from "@/app/components/BottomButton";
import { NavigationBar } from "@/app/components/NavigationBar";
import { FormControl, FormLabel } from "@/components/FormControl";
import { Select } from "@/components/Select";
import { localesOptions } from "@/constants/locale";
import { PATH } from "@/constants/path";
import { timezones } from "@/constants/timezone";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useRouter } from "@/libs/navigation";
import { SupportLocale } from "@/types/locale";
import { localeCookie } from "@/utils/locale";
import { getKeys } from "@/utils/object";
import { timezoneCookie } from "@/utils/timezone";

const _localesOptions = getKeys(localesOptions);

const _timezonesOptions = getKeys(timezones);

const Page = () => {
  const t = useTranslations("edit.language-and-timezone");

  const router = useRouter();
  const initial = useRef<{ locale?: SupportLocale; timezone?: string }>({
    locale: undefined,
    timezone: undefined,
  });
  const [locale, setLocale] = useState<SupportLocale>();
  const [timezone, setTimezone] = useState<string>();
  const isMounted = useIsMounted();

  const handleChangeLanguageAndTimezone = () => {
    if (locale && timezone) {
      localeCookie.set(locale);
      timezoneCookie.set(timezone);
      router.replace(PATH.MYPAGE, { locale });
    }
  };

  useEffect(() => {
    initial.current = {
      locale: localeCookie.get(),
      timezone: timezoneCookie.get(),
    };
    setLocale(localeCookie.get());
    setTimezone(timezoneCookie.get());
  }, []);

  const isDirty =
    isMounted && (locale !== initial.current.locale || timezone !== initial.current.timezone);

  return (
    <>
      <NavigationBar
        title={t("title")}
        titleFontWeight="regular"
        onClickGoback={() => router.back()}
      />
      <div className="flex flex-col gap-[24px] px-[20px] py-[24px]">
        <FormControl>
          <FormLabel>{t("languages")}</FormLabel>
          <Select
            options={_localesOptions}
            value={locale}
            renderValue={(value) => value && localesOptions[value]}
            renderOption={(value) => localesOptions[value]}
            onChangeValue={setLocale}
          />
        </FormControl>
        <FormControl>
          <FormLabel>{t("timezone")}</FormLabel>
          <Select
            options={_timezonesOptions}
            value={timezone}
            renderValue={(value) => value && timezones[value]}
            renderOption={(value) => timezones[value]}
            onChangeValue={setTimezone}
          />
        </FormControl>
      </div>
      <BottomButton disabled={!isDirty} onClick={handleChangeLanguageAndTimezone}>
        {t("edit")}
      </BottomButton>
    </>
  );
};

export default Page;
