import "@/styles/globals.css";
import type { Metadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";
import IntlClientProvider from "@/app/providers/IntlClientProvider";
import QueryClientProvider from "@/app/providers/QueryClientProvider";
import { ToastProvider } from "@/components/Toast";
import { locales } from "@/constants/locale";
import MswInit from "@/mocks/MswInit";

export const metadata: Metadata = {
  viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function Layout({
  params: { locale },
  children,
}: {
  params: { locale: string };
  children: React.ReactNode;
}) {
  unstable_setRequestLocale(locale);

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="favicon.svg" />
        <link
          rel="stylesheet"
          as="style"
          crossOrigin=""
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/static/pretendard-dynamic-subset.css"
        />
        <title>코띠</title>
      </head>
      <body className="relative mx-auto min-h-screen min-w-[375px] max-w-screen-sm">
        <MswInit />
        <IntlClientProvider locale={locale}>
          <ToastProvider>
            <QueryClientProvider>{children}</QueryClientProvider>
          </ToastProvider>
        </IntlClientProvider>
      </body>
    </html>
  );
}
