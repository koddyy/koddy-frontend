export const locales = ["ko", "en"] as const;

export const localesOptions: Record<(typeof locales)[number], string> = {
  ko: "한국어",
  en: "English",
};

export const defaultLocale = "ko";
