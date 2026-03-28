import Link from "next/link";

import { getSessionFromCookies } from "@/lib/auth/session";
import { listPatientsByAgency } from "@/modules/patients";

export default async function AdminPatientsPage() {
  const session = await getSessionFromCookies();
  const activeAgencyId = session?.selectedAgencyId;
  const patients = activeAgencyId ? listPatientsByAgency(activeAgencyId) : [];

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <section className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-brand-ink">Patients</h1>
            <p className="mt-2 text-slate-700">
              Admission registry for agency context: <span className="font-semibold">{activeAgencyId ?? "no agency selected"}</span>
            </p>
          </div>
          <Link
            href="/dashboard/admin/patients/new"
            className="rounded-lg bg-brand-ink px-4 py-2 text-sm font-semibold text-white"
          >
            Admit Patient
          </Link>
        </div>

        {patients.length === 0 ? (
          <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-700">
            No admitted patients yet for this agency. Start with the admission workflow.
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50 text-slate-700">
                <tr>
                  <th className="px-3 py-2">Patient</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Payer</th>
                  <th className="px-3 py-2">Medicaid ID</th>
                  <th className="px-3 py-2">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {patients.map((patient) => (
                  <tr key={patient.id}>
                    <td className="px-3 py-2">
                      <Link href={`/dashboard/admin/patients/${patient.id}`} className="font-medium text-brand-ink hover:underline">
                        {patient.firstName} {patient.lastName}
                      </Link>
                    </td>
                    <td className="px-3 py-2 capitalize">{patient.status}</td>
                    <td className="px-3 py-2">{patient.payerProgram ?? "-"}</td>
                    <td className="px-3 py-2">{patient.medicaidId ?? "-"}</td>
                    <td className="px-3 py-2">{new Date(patient.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
