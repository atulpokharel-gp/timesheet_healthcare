import { redirect } from "next/navigation";

import { routeForRole } from "@/lib/auth/redirects";
import {
  getSessionFromCookies,
  resolveNextStep,
  setSessionCookie,
  withActiveRole
} from "@/lib/auth/session";
import { listRolesForAgency } from "@/modules/auth/mock-users";

async function selectRoleAction(formData: FormData): Promise<void> {
  "use server";

  const session = await getSessionFromCookies();
  if (!session) {
    redirect("/auth/login");
  }

  if (!session.selectedAgencyId) {
    redirect("/select-agency");
  }

  const role = String(formData.get("role") ?? "");
  const roles = listRolesForAgency(session.scopes, session.selectedAgencyId);
  if (!roles.includes(role as (typeof roles)[number])) {
    redirect("/select-role");
  }

  const nextSession = withActiveRole(session, role as (typeof roles)[number]);
  await setSessionCookie(nextSession);
  redirect(routeForRole(nextSession.activeRole!));
}

export default async function SelectRolePage() {
  const session = await getSessionFromCookies();
  if (!session) {
    redirect("/auth/login");
  }

  if (!session.selectedAgencyId) {
    redirect("/select-agency");
  }

  const roles = listRolesForAgency(session.scopes, session.selectedAgencyId);
  if (roles.length === 0) {
    redirect("/select-agency");
  }

  if (roles.length <= 1) {
    const autoSession = withActiveRole(session, roles[0]);
    await setSessionCookie(autoSession);
    redirect(resolveNextStep(autoSession));
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-6 py-10">
      <h1 className="text-3xl font-bold text-brand-ink">Select Role</h1>
      <p className="mt-3 text-slate-700">Agency: {session.selectedAgencyId}</p>

      <form action={selectRoleAction} className="mt-6 grid gap-3">
        {roles.map((role) => (
          <button
            key={role}
            type="submit"
            name="role"
            value={role}
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-left font-medium capitalize text-slate-800 hover:border-brand-teal"
          >
            {role.replaceAll("_", " ")}
          </button>
        ))}
      </form>
    </main>
  );
}
