import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { getSessionFromCookies } from "@/lib/auth/session";
import { getPatientById } from "@/modules/patients";

type PatientDetailPageProps = {
  params: Promise<{ patientId: string }>;
};

export default async function PatientDetailPage({ params }: PatientDetailPageProps) {
  const session = await getSessionFromCookies();
  if (!session?.selectedAgencyId) {
    redirect("/select-agency");
  }

  const { patientId } = await params;
  const patient = getPatientById(patientId);

  if (!patient || patient.agencyId !== session.selectedAgencyId) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-10">
      <section className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-brand-ink">
              {patient.firstName} {patient.lastName}
            </h1>
            <p className="mt-2 text-slate-700">Patient ID: {patient.id}</p>
          </div>
          <Link href="/dashboard/admin/patients" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800">
            Back to Patients
          </Link>
        </div>

        <dl className="mt-6 grid gap-3 text-sm md:grid-cols-2">
          <div className="rounded-lg border border-slate-200 p-3">
            <dt className="font-semibold text-slate-900">Agency</dt>
            <dd className="mt-1 text-slate-700">{patient.agencyId}</dd>
          </div>
          <div className="rounded-lg border border-slate-200 p-3">
            <dt className="font-semibold text-slate-900">Status</dt>
            <dd className="mt-1 capitalize text-slate-700">{patient.status}</dd>
          </div>
          <div className="rounded-lg border border-slate-200 p-3">
            <dt className="font-semibold text-slate-900">Date of Birth</dt>
            <dd className="mt-1 text-slate-700">{patient.dob ?? "-"}</dd>
          </div>
          <div className="rounded-lg border border-slate-200 p-3">
            <dt className="font-semibold text-slate-900">Medicaid ID</dt>
            <dd className="mt-1 text-slate-700">{patient.medicaidId ?? "-"}</dd>
          </div>
          <div className="rounded-lg border border-slate-200 p-3">
            <dt className="font-semibold text-slate-900">Payer Program</dt>
            <dd className="mt-1 text-slate-700">{patient.payerProgram ?? "-"}</dd>
          </div>
          <div className="rounded-lg border border-slate-200 p-3">
            <dt className="font-semibold text-slate-900">Care Plan Template</dt>
            <dd className="mt-1 text-slate-700">{patient.carePlanTemplate ?? "-"}</dd>
          </div>
          <div className="rounded-lg border border-slate-200 p-3">
            <dt className="font-semibold text-slate-900">Assigned Caregiver</dt>
            <dd className="mt-1 text-slate-700">{patient.assignedCaregiverId ?? "-"}</dd>
          </div>
          <div className="rounded-lg border border-slate-200 p-3">
            <dt className="font-semibold text-slate-900">Assigned Case Manager</dt>
            <dd className="mt-1 text-slate-700">{patient.assignedCaseManagerId ?? "-"}</dd>
          </div>
          <div className="rounded-lg border border-slate-200 p-3 md:col-span-2">
            <dt className="font-semibold text-slate-900">Created</dt>
            <dd className="mt-1 text-slate-700">
              {new Date(patient.createdAt).toLocaleString()} by {patient.createdBy}
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
