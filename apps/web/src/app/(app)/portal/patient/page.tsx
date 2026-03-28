import Link from "next/link";

export default function PatientPortalPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <section className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-brand-ink">Patient Portal</h1>
        <p className="mt-2 text-slate-700">Weekly signature tasks and role-allowed visit visibility for patient-facing review.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/portal/patient/signatures" className="rounded-lg bg-brand-ink px-4 py-2 text-sm font-semibold text-white">
            Open Signature Tasks
          </Link>
        </div>
      </section>
    </main>
  );
}
