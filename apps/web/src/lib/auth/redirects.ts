import type { UserRole } from "@/lib/contracts/entities";

const dashboardRouteByRole: Record<UserRole, string> = {
  super_admin: "/dashboard/super-admin",
  healthcare_admin: "/dashboard/admin",
  case_manager: "/dashboard/case-manager",
  caregiver: "/dashboard/caregiver",
  patient: "/portal/patient"
};

export function routeForRole(role: UserRole): string {
  return dashboardRouteByRole[role];
}

export function isRoleAllowedForPath(pathname: string, role: UserRole): boolean {
  const target = routeForRole(role);
  if (target.startsWith("/portal")) {
    return pathname.startsWith("/portal/patient");
  }

  return pathname.startsWith(target);
}
