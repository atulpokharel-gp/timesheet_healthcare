export type UserRole = "super_admin" | "healthcare_admin" | "case_manager" | "caregiver" | "patient";

export type AgencyScope = {
  agencyId: string;
  role: UserRole;
};

export type SessionContext = {
  userId: string;
  email: string;
  scopes: AgencyScope[];
  selectedAgencyId?: string;
  activeRole?: UserRole;
  issuedAt?: string;
};
