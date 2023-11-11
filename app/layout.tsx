import "@/styles/globals.css";
import QueryClientProvider from "@/app/_providers/QueryClientProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin=""
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/static/pretendard-dynamic-subset.css"
        />
      </head>
      <body className="mx-auto max-w-screen-sm">
        <QueryClientProvider>{children}</QueryClientProvider>
      </body>
    </html>
  );
}
