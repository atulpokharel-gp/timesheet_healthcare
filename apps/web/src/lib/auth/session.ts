import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

import type { SessionContext, UserRole } from "@/lib/contracts/entities";
import { listAgencies, listRolesForAgency } from "@/modules/auth/mock-users";
import { routeForRole } from "@/lib/auth/redirects";

export const SESSION_COOKIE = "th_session";

export type AppSession = SessionContext & {
  selectedAgencyId?: string;
  activeRole?: UserRole;
  issuedAt: string;
};

export function serializeSession(session: AppSession): string {
  return encodeURIComponent(JSON.stringify(session));
}

export function deserializeSession(value: string | undefined): AppSession | null {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(decodeURIComponent(value)) as AppSession;
    if (!parsed.userId || !parsed.email || !Array.isArray(parsed.scopes)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export async function getSessionFromCookies(): Promise<AppSession | null> {
  const cookieStore = await cookies();
  return deserializeSession(cookieStore.get(SESSION_COOKIE)?.value);
}

export async function setSessionCookie(session: AppSession): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, serializeSession(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: 60 * 60 * 8
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export function getSessionFromRequest(request: NextRequest): AppSession | null {
  return deserializeSession(request.cookies.get(SESSION_COOKIE)?.value);
}

export function withSelectedAgency(session: AppSession, agencyId: string): AppSession {
  return {
    ...session,
    selectedAgencyId: agencyId,
    activeRole: undefined
  };
}

export function withActiveRole(session: AppSession, role: UserRole): AppSession {
  return {
    ...session,
    activeRole: role
  };
}

export function resolveNextStep(session: AppSession): string {
  if (!session.selectedAgencyId) {
    return "/select-agency";
  }

  if (!session.activeRole) {
    return "/select-role";
  }

  return routeForRole(session.activeRole);
}

export function resolveDefaultSessionState(session: AppSession): AppSession {
  const agencies = listAgencies(session.scopes);

  if (agencies.length === 1) {
    const selectedAgencyId = agencies[0];
    const roles = listRolesForAgency(session.scopes, selectedAgencyId);
    if (roles.length === 1) {
      return {
        ...session,
        selectedAgencyId,
        activeRole: roles[0]
      };
    }

    return {
      ...session,
      selectedAgencyId,
      activeRole: undefined
    };
  }

  return session;
}
