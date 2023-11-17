import "@/styles/globals.css";
import QueryClientProvider from "@/app/providers/QueryClientProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
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
      <body className="mx-auto min-w-[375px] max-w-screen-sm">
        <QueryClientProvider>{children}</QueryClientProvider>
      </body>
    </html>
  );
}
