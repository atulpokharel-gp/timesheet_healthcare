import Link from "next/link";

import { getSessionFromCookies } from "@/lib/auth/session";
import { listPatientsByAgency } from "@/modules/patients";

export default async function HealthcareAdminDashboardPage() {
  const session = await getSessionFromCookies();
  const patients = session?.selectedAgencyId ? listPatientsByAgency(session.selectedAgencyId) : [];

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <section className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-brand-ink">Healthcare Admin Dashboard</h1>
        <p className="mt-2 text-slate-700">Patient intake, assignment readiness, submission review, and operations controls.</p>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">Agency Context</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{session?.selectedAgencyId ?? "No agency selected"}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">Total Patients</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{patients.length}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">PW-003 Status</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">Admission MVP</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/dashboard/admin/patients" className="rounded-lg bg-brand-ink px-4 py-2 text-sm font-semibold text-white">
            Open Patients
          </Link>
          <Link
            href="/dashboard/admin/patients/new"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800"
          >
            Admit New Patient
          </Link>
          <Link href="/dashboard/admin/assignments" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800">
            Assignments
          </Link>
          <Link href="/dashboard/admin/authorizations" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800">
            Authorization Rules
          </Link>
          <Link href="/dashboard/admin/scheduling" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800">
            Scheduling
          </Link>
          <Link href="/dashboard/admin/submissions" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800">
            Weekly Submissions
          </Link>
          <Link href="/dashboard/admin/exceptions" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800">
            Exceptions
          </Link>
          <Link href="/dashboard/admin/form-builder" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800">
            Form Builder
          </Link>
          <Link href="/dashboard/admin/reports" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800">
            Reports
          </Link>
          <Link href="/dashboard/admin/file-center" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800">
            Import / Export
          </Link>
          <Link href="/dashboard/admin/billing" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800">
            Billing Outputs
          </Link>
          <Link href="/dashboard/admin/payroll" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800">
            Payroll Outputs
          </Link>
          <Link href="/dashboard/admin/exports" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800">
            Exports
          </Link>
        </div>
      </section>
    </main>
  );
}
