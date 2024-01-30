import { getCookie, setCookie } from "cookies-next";
import { defaultLocale } from "@/constants/locale";
import { isSupportLocale } from "@/types/locale";

export const localeCookie = {
  cookieKey: "NEXT_LOCALE",

  get() {
    const locale = getCookie(this.cookieKey);

    if (!locale || !isSupportLocale(locale)) {
      return defaultLocale;
    }

    return locale;
  },

  set(locale: string) {
    if (!isSupportLocale(locale)) return;

    setCookie(this.cookieKey, locale);
  },
};
