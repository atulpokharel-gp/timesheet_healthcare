import Link from "next/link";

export default function CaregiverDashboardPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <section className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-brand-ink">Caregiver Dashboard</h1>
        <p className="mt-2 text-slate-700">Daily visit execution, weekly review, signatures, and warning-aware submission continuity.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/dashboard/caregiver/visits/example-occurrence-id"
            className="rounded-lg bg-brand-ink px-4 py-2 text-sm font-semibold text-white"
          >
            Open Daily Visit
          </Link>
          <Link
            href="/dashboard/caregiver/week/example-week-id"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800"
          >
            Open Weekly Submission
          </Link>
        </div>
      </section>
    </main>
  );
}
