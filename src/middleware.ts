import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const isRootPath = request.nextUrl.pathname === "/";

  if (isRootPath) {
    return NextResponse.redirect(new URL("/marketplace", request.url));
  }

  return response;
}
