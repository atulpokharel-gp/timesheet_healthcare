import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { isRoleAllowedForPath } from "@/lib/auth/redirects";
import { getSessionFromRequest, resolveNextStep } from "@/lib/auth/session";

function redirectTo(request: NextRequest, pathname: string): NextResponse {
  return NextResponse.redirect(new URL(pathname, request.url));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = getSessionFromRequest(request);

  if (pathname.startsWith("/auth/login")) {
    if (!session) {
      return NextResponse.next();
    }
    return redirectTo(request, resolveNextStep(session));
  }

  if (!session && (pathname.startsWith("/dashboard") || pathname.startsWith("/portal") || pathname.startsWith("/select-"))) {
    return redirectTo(request, "/auth/login");
  }

  if (!session) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/select-agency")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/select-role")) {
    if (!session.selectedAgencyId) {
      return redirectTo(request, "/select-agency");
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/portal")) {
    if (!session.selectedAgencyId) {
      return redirectTo(request, "/select-agency");
    }

    if (!session.activeRole) {
      return redirectTo(request, "/select-role");
    }

    if (!isRoleAllowedForPath(pathname, session.activeRole)) {
      return redirectTo(request, resolveNextStep(session));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/portal/:path*", "/select-agency", "/select-role", "/auth/login"],
};
