import "@/styles/globals.css";
import { unstable_setRequestLocale } from "next-intl/server";
import IntlClientProvider from "@/app/providers/IntlClientProvider";
import QueryClientProvider from "@/app/providers/QueryClientProvider";
import { locales } from "@/constants/locale";
import MswInit from "@/mocks/MswInit";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function RootLayout({
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
        <QueryClientProvider>
          <IntlClientProvider locale={locale}>{children}</IntlClientProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
