import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// TODO: otkomentarisi kada /en verzija bude live
// import { NextRequest, NextResponse } from "next/server";
//
// const LOCALE_COOKIE = "preferred_locale";
//
// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//
//   if (pathname !== "/") {
//     return NextResponse.next();
//   }
//
//   if (request.cookies.get(LOCALE_COOKIE)) {
//     return NextResponse.next();
//   }
//
//   const acceptLanguage = request.headers.get("accept-language") || "";
//   const primaryLanguage = acceptLanguage.split(",")[0]?.trim().toLowerCase() || "";
//
//   const isSlavic =
//     primaryLanguage.startsWith("sr") ||
//     primaryLanguage.startsWith("bs") ||
//     primaryLanguage.startsWith("hr") ||
//     primaryLanguage.startsWith("me");
//
//   const response = isSlavic
//     ? NextResponse.next()
//     : NextResponse.redirect(new URL("/en", request.url));
//
//   response.cookies.set(LOCALE_COOKIE, isSlavic ? "sr" : "en", {
//     maxAge: 60 * 60 * 24 * 365,
//     path: "/",
//   });
//
//   return response;
// }

export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
