import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { PRIVATE_PATH } from "./constants/path";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuthenticated = request.cookies.get("refresh_token");

  if (!isAuthenticated && PRIVATE_PATH.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
