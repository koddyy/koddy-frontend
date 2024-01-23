import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { locales } from "./constants/locale";
import { PRIVATE_PATH } from "./constants/path";

export function middleware(request: NextRequest) {
  /** locale */
  const handleI18nRouting = createIntlMiddleware({
    locales,
    defaultLocale: "ko",
    localePrefix: "as-needed",
  });

  const response = handleI18nRouting(request);

  /** authentication */
  const { pathname } = request.nextUrl;

  const isAuthenticated = request.cookies.get("refresh_token");

  if (!isAuthenticated && PRIVATE_PATH.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
