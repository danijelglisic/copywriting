import { NextRequest, NextResponse } from "next/server";

const LOCALE_COOKIE = "preferred_locale";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only run on the root path
  if (pathname !== "/") {
    return NextResponse.next();
  }

  // If user already has a locale preference cookie, don't redirect
  if (request.cookies.get(LOCALE_COOKIE)) {
    return NextResponse.next();
  }

  const acceptLanguage = request.headers.get("accept-language") || "";
  const primaryLanguage = acceptLanguage.split(",")[0]?.trim().toLowerCase() || "";

  // If browser language starts with sr (Serbian/Bosnian/Croatian), stay on /
  // Otherwise redirect to /en
  const isSlavic =
    primaryLanguage.startsWith("sr") ||
    primaryLanguage.startsWith("bs") ||
    primaryLanguage.startsWith("hr") ||
    primaryLanguage.startsWith("me");

  const response = isSlavic
    ? NextResponse.next()
    : NextResponse.redirect(new URL("/en", request.url));

  // Set cookie so we only redirect once
  response.cookies.set(LOCALE_COOKIE, isSlavic ? "sr" : "en", {
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: "/",
  });

  return response;
}

export const config = {
  matcher: ["/"],
};
