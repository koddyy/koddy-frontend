import { locales } from "@/constants/locale";

export type SupportLocale = (typeof locales)[number];

export const isSupportLocale = (locale: string): locale is SupportLocale => {
  return locales.includes(locale as SupportLocale);
};
