import "@/styles/globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
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
        <title>코띠 관리자</title>
      </head>
      <body className="relative mx-auto min-h-screen min-w-[375px] max-w-screen-sm">
        {children}
      </body>
    </html>
  );
}
