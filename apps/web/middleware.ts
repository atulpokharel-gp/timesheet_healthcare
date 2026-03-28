import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// PW-002 will replace this with real session + tenant + role gate checks.
export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/portal/:path*", "/select-agency", "/select-role"],
};
