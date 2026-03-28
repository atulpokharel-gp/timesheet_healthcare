export type ModuleBoundary = {
  id: string;
  ownerRoles: string[];
  routePrefixes: string[];
  dependsOn: string[];
};

export const moduleBoundaries: ModuleBoundary[] = [
  {
    id: "landing_page",
    ownerRoles: ["public"],
    routePrefixes: ["/"],
    dependsOn: []
  },
  {
    id: "auth",
    ownerRoles: ["all_roles"],
    routePrefixes: ["/auth"],
    dependsOn: ["tenancy", "role_management"]
  },
  {
    id: "tenancy",
    ownerRoles: ["all_roles"],
    routePrefixes: ["/select-agency"],
    dependsOn: ["auth"]
  },
  {
    id: "role_management",
    ownerRoles: ["all_roles"],
    routePrefixes: ["/select-role"],
    dependsOn: ["auth", "tenancy"]
  },
  {
    id: "dashboards",
    ownerRoles: ["super_admin", "healthcare_admin", "case_manager", "caregiver", "patient"],
    routePrefixes: ["/dashboard", "/portal"],
    dependsOn: ["auth", "tenancy", "role_management"]
  },
  {
    id: "patient_management",
    ownerRoles: ["healthcare_admin", "case_manager"],
    routePrefixes: ["/dashboard/admin/patients"],
    dependsOn: ["dashboards"]
  },
  {
    id: "scheduling",
    ownerRoles: ["healthcare_admin", "caregiver"],
    routePrefixes: ["/dashboard/admin/schedules", "/dashboard/caregiver"],
    dependsOn: ["patient_management"]
  },
  {
    id: "weekly_forms",
    ownerRoles: ["caregiver", "healthcare_admin"],
    routePrefixes: ["/dashboard/caregiver/week"],
    dependsOn: ["scheduling", "signatures", "warnings_exceptions"]
  }
];
