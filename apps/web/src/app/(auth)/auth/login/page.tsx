import Link from "next/link";
import { redirect } from "next/navigation";

import {
  clearSessionCookie,
  getSessionFromCookies,
  resolveDefaultSessionState,
  resolveNextStep,
  setSessionCookie
} from "@/lib/auth/session";
import { validateCredentials } from "@/modules/auth/mock-users";

type LoginPageProps = {
  searchParams?: Promise<{ error?: string }>;
};

async function loginAction(formData: FormData): Promise<void> {
  "use server";

  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const user = validateCredentials(email, password);

  if (!user) {
    redirect("/auth/login?error=invalid_credentials");
  }

  const session = resolveDefaultSessionState({
    userId: user.id,
    email: user.email,
    scopes: user.scopes,
    issuedAt: new Date().toISOString()
  });

  await setSessionCookie(session);
  redirect(resolveNextStep(session));
}

async function logoutAction(): Promise<void> {
  "use server";

  await clearSessionCookie();
  redirect("/auth/login");
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = (await searchParams) ?? {};
  const activeSession = await getSessionFromCookies();

  if (activeSession) {
    redirect(resolveNextStep(activeSession));
  }

  const hasError = params.error === "invalid_credentials";

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6">
      <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-brand-ink">Sign in to Timesheet Healthcare</h1>
        <p className="mt-2 text-sm text-slate-600">Use seeded credentials to test agency and role routing.</p>

        {hasError ? (
          <p className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            Invalid credentials. Try one of the seeded accounts below.
          </p>
        ) : null}

        <form className="mt-6 space-y-4" aria-label="login-form" action={loginAction}>
          <label className="block text-sm font-medium text-slate-700">
            Email
            <input
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              type="email"
              placeholder="name@agency.org"
              name="email"
              required
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Password
            <input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" type="password" name="password" required />
          </label>
          <button className="w-full rounded-lg bg-brand-ink py-2 font-semibold text-white" type="submit">
            Continue
          </button>
        </form>

        <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700">
          <p className="font-semibold">Seeded credentials (PW-002 mock auth)</p>
          <p>super@timesheethealthcare.com / password123</p>
          <p>admin@sunrise-care.org / password123</p>
          <p>caregiver@sunrise-care.org / password123</p>
          <p>patient@sunrise-care.org / password123</p>
        </div>

        <div className="mt-4 flex justify-between text-xs text-slate-600">
          <Link href="/" className="underline underline-offset-2">
            Back to site
          </Link>
          <form action={logoutAction}>
            <button type="submit" className="underline underline-offset-2">
              Clear session
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
