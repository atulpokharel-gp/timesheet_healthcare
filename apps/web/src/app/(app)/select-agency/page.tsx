import { redirect } from "next/navigation";

import {
  getSessionFromCookies,
  resolveNextStep,
  setSessionCookie,
  withActiveRole,
  withSelectedAgency
} from "@/lib/auth/session";
import { listAgencies, listRolesForAgency } from "@/modules/auth/mock-users";

async function selectAgencyAction(formData: FormData): Promise<void> {
  "use server";

  const session = await getSessionFromCookies();
  if (!session) {
    redirect("/auth/login");
  }

  const agencyId = String(formData.get("agencyId") ?? "");
  const agencies = listAgencies(session.scopes);
  if (!agencies.includes(agencyId)) {
    redirect("/select-agency");
  }

  const nextSession = withSelectedAgency(session, agencyId);
  const roles = listRolesForAgency(nextSession.scopes, agencyId);
  const resolvedSession = roles.length === 1 ? withActiveRole(nextSession, roles[0]) : nextSession;
  await setSessionCookie(resolvedSession);
  redirect(resolveNextStep(resolvedSession));
}

export default async function SelectAgencyPage() {
  const session = await getSessionFromCookies();
  if (!session) {
    redirect("/auth/login");
  }

  const agencies = listAgencies(session.scopes);
  if (agencies.length <= 1) {
    redirect(resolveNextStep(session));
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-6 py-10">
      <h1 className="text-3xl font-bold text-brand-ink">Select Agency</h1>
      <p className="mt-3 text-slate-700">Choose which agency context to use for this session.</p>

      <form action={selectAgencyAction} className="mt-6 grid gap-3">
        {agencies.map((agencyId) => (
          <button
            key={agencyId}
            type="submit"
            name="agencyId"
            value={agencyId}
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-left font-medium text-slate-800 hover:border-brand-teal"
          >
            {agencyId}
          </button>
        ))}
      </form>
    </main>
  );
}
