import { Decorator } from "@storybook/react";
import { NextIntlClientProvider } from "next-intl";
import ko from "@/messages/ko";
import en from "@/messages/en";
import { isSupportLocale } from "@/types/locale";

const messages = {
  ko,
  en,
};

export const nextIntlDecorator: Decorator = (Story, { globals: { locale = "ko" } }) => {
  if (!isSupportLocale(locale)) {
    throw new Error("Unsupported locale");
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages[locale]}>
      <Story />
    </NextIntlClientProvider>
  );
};
