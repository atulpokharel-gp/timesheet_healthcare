import type { CreatePatientInput, PatientRecord } from "@/modules/patients/types";

type PatientStoreState = {
  patients: PatientRecord[];
};

const storeKey = "__th_patient_store__";

function getStore(): PatientStoreState {
  const scopedGlobal = globalThis as typeof globalThis & {
    [storeKey]?: PatientStoreState;
  };

  if (!scopedGlobal[storeKey]) {
    scopedGlobal[storeKey] = {
      patients: []
    };
  }

  return scopedGlobal[storeKey];
}

export type CreatePatientResult =
  | { ok: true; patient: PatientRecord }
  | { ok: false; fieldErrors: Record<string, string>; formError?: string };

export function createPatient(input: CreatePatientInput): CreatePatientResult {
  const fieldErrors: Record<string, string> = {};

  if (!input.agencyId.trim()) {
    fieldErrors.agencyId = "Agency is required.";
  }
  if (!input.firstName.trim()) {
    fieldErrors.firstName = "First name is required.";
  }
  if (!input.lastName.trim()) {
    fieldErrors.lastName = "Last name is required.";
  }
  if (!input.createdBy.trim()) {
    fieldErrors.createdBy = "Creator context is required.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      fieldErrors,
      formError: "Please resolve the highlighted fields and try again."
    };
  }

  const store = getStore();

  const duplicateByAgencyAndMedicaid = input.medicaidId
    ? store.patients.find(
        (patient) =>
          patient.agencyId === input.agencyId &&
          patient.medicaidId?.trim().toLowerCase() === input.medicaidId?.trim().toLowerCase()
      )
    : undefined;

  if (duplicateByAgencyAndMedicaid) {
    return {
      ok: false,
      fieldErrors: {
        medicaidId: "This Medicaid ID already exists in the selected agency."
      },
      formError: "Duplicate patient identifier detected."
    };
  }

  const patient: PatientRecord = {
    id: `pt_${crypto.randomUUID()}`,
    agencyId: input.agencyId.trim(),
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    dob: input.dob?.trim() || undefined,
    medicaidId: input.medicaidId?.trim() || undefined,
    payerProgram: input.payerProgram?.trim() || undefined,
    assignedCaregiverId: input.assignedCaregiverId?.trim() || undefined,
    assignedCaseManagerId: input.assignedCaseManagerId?.trim() || undefined,
    carePlanTemplate: input.carePlanTemplate?.trim() || undefined,
    status: input.status,
    createdAt: new Date().toISOString(),
    createdBy: input.createdBy.trim()
  };

  store.patients.unshift(patient);
  return { ok: true, patient };
}

export function listPatientsByAgency(agencyId: string): PatientRecord[] {
  const normalizedAgencyId = agencyId.trim();
  return getStore().patients.filter((patient) => patient.agencyId === normalizedAgencyId);
}

export function getPatientById(patientId: string): PatientRecord | null {
  return getStore().patients.find((patient) => patient.id === patientId) ?? null;
}
