import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { locales } from "./constants/locale";
import { PRIVATE_PATH } from "./constants/path";

export function middleware(request: NextRequest) {
  /** authentication */
  const { pathname } = request.nextUrl;

  const isAuthenticated = request.cookies.get("refresh_token");

  if (!isAuthenticated && PRIVATE_PATH.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  /** locale */
  const handleI18nRouting = createIntlMiddleware({
    locales,
    defaultLocale: "ko",
    localePrefix: "as-needed",
  });

  const response = handleI18nRouting(request);

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
