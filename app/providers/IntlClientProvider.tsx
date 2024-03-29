import deepmerge from "deepmerge";
import { NextIntlClientProvider } from "next-intl";
import { defaultLocale } from "@/constants/locale";

const IntlClientProvider = async ({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) => {
  if (!locale) return <>{children}</>;

  const messages =
    locale === defaultLocale
      ? (await import(`../../messages/${defaultLocale}`)).default
      : deepmerge(
          (await import(`../../messages/${defaultLocale}`)).default,
          (await import(`../../messages/${locale}`)).default
        );

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
};

export default IntlClientProvider;
