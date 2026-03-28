import type { SessionContext, UserRole } from "@/lib/contracts/entities";

export type MockUserRecord = {
  id: string;
  email: string;
  password: string;
  scopes: SessionContext["scopes"];
};

const mockUsers: MockUserRecord[] = [
  {
    id: "u_super_1",
    email: "super@timesheethealthcare.com",
    password: "password123",
    scopes: [
      { agencyId: "platform", role: "super_admin" }
    ]
  },
  {
    id: "u_admin_multi_1",
    email: "admin@sunrise-care.org",
    password: "password123",
    scopes: [
      { agencyId: "sunrise-care", role: "healthcare_admin" },
      { agencyId: "sunrise-care", role: "case_manager" },
      { agencyId: "evening-aid", role: "healthcare_admin" }
    ]
  },
  {
    id: "u_caregiver_1",
    email: "caregiver@sunrise-care.org",
    password: "password123",
    scopes: [
      { agencyId: "sunrise-care", role: "caregiver" }
    ]
  },
  {
    id: "u_patient_1",
    email: "patient@sunrise-care.org",
    password: "password123",
    scopes: [
      { agencyId: "sunrise-care", role: "patient" }
    ]
  }
];

export function validateCredentials(email: string, password: string): MockUserRecord | null {
  const normalizedEmail = email.trim().toLowerCase();
  return mockUsers.find((user) => user.email === normalizedEmail && user.password === password) ?? null;
}

export function listAgencies(scopes: SessionContext["scopes"]): string[] {
  return Array.from(new Set(scopes.map((scope) => scope.agencyId)));
}

export function listRolesForAgency(scopes: SessionContext["scopes"], agencyId: string): UserRole[] {
  return Array.from(
    new Set(scopes.filter((scope) => scope.agencyId === agencyId).map((scope) => scope.role))
  );
}
