export type PatientStatus = "draft" | "active" | "inactive";

export type PatientRecord = {
  id: string;
  agencyId: string;
  firstName: string;
  lastName: string;
  dob?: string;
  medicaidId?: string;
  payerProgram?: string;
  assignedCaregiverId?: string;
  assignedCaseManagerId?: string;
  carePlanTemplate?: string;
  status: PatientStatus;
  createdAt: string;
  createdBy: string;
};

export type CreatePatientInput = {
  agencyId: string;
  firstName: string;
  lastName: string;
  dob?: string;
  medicaidId?: string;
  payerProgram?: string;
  assignedCaregiverId?: string;
  assignedCaseManagerId?: string;
  carePlanTemplate?: string;
  status: PatientStatus;
  createdBy: string;
};
