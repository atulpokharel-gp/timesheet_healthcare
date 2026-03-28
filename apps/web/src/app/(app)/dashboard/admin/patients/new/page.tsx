import Link from "next/link";
import { redirect } from "next/navigation";

import { getSessionFromCookies } from "@/lib/auth/session";
import { createPatient } from "@/modules/patients";

type AdmissionPageProps = {
  searchParams?: Promise<{ error?: string; field?: string }>;
};

function asStatus(value: string): "draft" | "active" | "inactive" {
  if (value === "active" || value === "inactive") {
    return value;
  }
  return "draft";
}

async function createPatientAction(formData: FormData): Promise<void> {
  "use server";

  const session = await getSessionFromCookies();
  const agencyId = session?.selectedAgencyId ?? "";
  const createdBy = session?.email ?? "";

  if (!agencyId || !createdBy) {
    redirect("/select-agency");
  }

  const result = createPatient({
    agencyId,
    firstName: String(formData.get("firstName") ?? ""),
    lastName: String(formData.get("lastName") ?? ""),
    dob: String(formData.get("dob") ?? ""),
    medicaidId: String(formData.get("medicaidId") ?? ""),
    payerProgram: String(formData.get("payerProgram") ?? ""),
    assignedCaregiverId: String(formData.get("assignedCaregiverId") ?? ""),
    assignedCaseManagerId: String(formData.get("assignedCaseManagerId") ?? ""),
    carePlanTemplate: String(formData.get("carePlanTemplate") ?? ""),
    status: asStatus(String(formData.get("status") ?? "draft")),
    createdBy
  });

  if ("patient" in result) {
    redirect(`/dashboard/admin/patients/${result.patient.id}`);
    return;
  }

  const failure = result as { fieldErrors: Record<string, string>; formError?: string };
  const field = Object.keys(failure.fieldErrors)[0] ?? "form";
  redirect(`/dashboard/admin/patients/new?error=${encodeURIComponent(failure.formError ?? "Validation failed")}&field=${encodeURIComponent(field)}`);
}

export default async function NewPatientAdmissionPage({ searchParams }: AdmissionPageProps) {
  const session = await getSessionFromCookies();
  const selectedAgencyId = session?.selectedAgencyId ?? "";

  if (!selectedAgencyId) {
    redirect("/select-agency");
  }

  const params = (await searchParams) ?? {};
  const hasError = Boolean(params.error);

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-10">
      <section className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-brand-ink">Admit New Patient</h1>
            <p className="mt-2 text-slate-700">
              Agency context: <span className="font-semibold">{selectedAgencyId}</span>
            </p>
          </div>
          <Link href="/dashboard/admin/patients" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800">
            Back to Patients
          </Link>
        </div>

        {hasError ? (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {params.error}
            {params.field ? ` (Field: ${params.field})` : ""}
          </p>
        ) : null}

        <form action={createPatientAction} className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="text-sm font-medium text-slate-700">
            First name
            <input name="firstName" required className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
          </label>
          <label className="text-sm font-medium text-slate-700">
            Last name
            <input name="lastName" required className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
          </label>
          <label className="text-sm font-medium text-slate-700">
            Date of birth
            <input name="dob" type="date" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
          </label>
          <label className="text-sm font-medium text-slate-700">
            Medicaid ID
            <input name="medicaidId" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
          </label>
          <label className="text-sm font-medium text-slate-700">
            Payer program
            <input name="payerProgram" placeholder="State Medicaid" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
          </label>
          <label className="text-sm font-medium text-slate-700">
            Care plan template
            <input name="carePlanTemplate" placeholder="ADL Basic" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
          </label>
          <label className="text-sm font-medium text-slate-700">
            Assigned caregiver ID
            <input name="assignedCaregiverId" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
          </label>
          <label className="text-sm font-medium text-slate-700">
            Assigned case manager ID
            <input name="assignedCaseManagerId" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" />
          </label>

          <label className="text-sm font-medium text-slate-700 md:col-span-2">
            Initial status
            <select name="status" defaultValue="draft" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2">
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </label>

          <div className="md:col-span-2">
            <button type="submit" className="rounded-lg bg-brand-ink px-4 py-2 text-sm font-semibold text-white">
              Create Patient Record
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
