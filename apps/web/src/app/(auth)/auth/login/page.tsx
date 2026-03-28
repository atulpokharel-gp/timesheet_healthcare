import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6">
      <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-brand-ink">Sign in to Timesheet Healthcare</h1>
        <p className="mt-2 text-sm text-slate-600">PW-002 will connect this form to tenant-aware authentication.</p>

        <form className="mt-6 space-y-4" aria-label="login-form">
          <label className="block text-sm font-medium text-slate-700">
            Email
            <input
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              type="email"
              placeholder="name@agency.org"
              disabled
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Password
            <input className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" type="password" disabled />
          </label>
          <button className="w-full rounded-lg bg-brand-ink py-2 font-semibold text-white" type="button" disabled>
            Continue (scaffold)
          </button>
        </form>

        <div className="mt-4 flex justify-between text-xs text-slate-600">
          <Link href="/" className="underline underline-offset-2">
            Back to site
          </Link>
          <span>Forgot password (planned)</span>
        </div>
      </div>
    </main>
  );
}
