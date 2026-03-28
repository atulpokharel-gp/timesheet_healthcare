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
    id: "patient_admission",
    ownerRoles: ["healthcare_admin"],
    routePrefixes: ["/dashboard/admin/patients/new"],
    dependsOn: ["dashboards", "patient_management"]
  },
  {
    id: "patient_management",
    ownerRoles: ["healthcare_admin", "case_manager"],
    routePrefixes: ["/dashboard/admin/patients"],
    dependsOn: ["dashboards", "patient_admission"]
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
  },
  {
    id: "signatures",
    ownerRoles: ["caregiver", "patient", "healthcare_admin"],
    routePrefixes: ["/dashboard/caregiver/week", "/portal/patient/signatures"],
    dependsOn: ["weekly_forms", "patient_portal"]
  },
  {
    id: "gps_evv",
    ownerRoles: ["caregiver", "healthcare_admin", "case_manager"],
    routePrefixes: ["/dashboard/caregiver/daily"],
    dependsOn: ["scheduling", "daily_entries"]
  },
  {
    id: "warnings_exceptions",
    ownerRoles: ["healthcare_admin", "case_manager"],
    routePrefixes: ["/dashboard/admin/exceptions", "/dashboard/case-manager/exceptions"],
    dependsOn: ["weekly_forms", "signatures", "gps_evv"]
  },
  {
    id: "authorization_rules",
    ownerRoles: ["healthcare_admin"],
    routePrefixes: ["/dashboard/admin/authorizations"],
    dependsOn: ["patient_admission", "weekly_forms"]
  },
  {
    id: "form_builder",
    ownerRoles: ["healthcare_admin"],
    routePrefixes: ["/dashboard/admin/form-builder"],
    dependsOn: ["patient_admission"]
  },
  {
    id: "reports",
    ownerRoles: ["healthcare_admin", "super_admin"],
    routePrefixes: ["/dashboard/admin/reports"],
    dependsOn: ["billing", "payroll", "warnings_exceptions"]
  },
  {
    id: "import_export",
    ownerRoles: ["healthcare_admin", "super_admin"],
    routePrefixes: ["/dashboard/admin/file-center", "/dashboard/admin/exports"],
    dependsOn: ["reports", "billing", "payroll"]
  },
  {
    id: "billing",
    ownerRoles: ["healthcare_admin", "super_admin"],
    routePrefixes: ["/dashboard/admin/billing"],
    dependsOn: ["weekly_forms", "authorization_rules", "revision_history"]
  },
  {
    id: "payroll",
    ownerRoles: ["healthcare_admin", "super_admin"],
    routePrefixes: ["/dashboard/admin/payroll"],
    dependsOn: ["weekly_forms", "revision_history"]
  },
  {
    id: "revision_history",
    ownerRoles: ["healthcare_admin", "super_admin"],
    routePrefixes: ["/dashboard/admin/submissions"],
    dependsOn: ["weekly_forms", "warnings_exceptions"]
  },
  {
    id: "patient_portal",
    ownerRoles: ["patient"],
    routePrefixes: ["/portal/patient"],
    dependsOn: ["signatures", "warnings_exceptions"]
  },
  {
    id: "daily_entries",
    ownerRoles: ["caregiver"],
    routePrefixes: ["/dashboard/caregiver/daily"],
    dependsOn: ["scheduling", "patient_management"]
  }
];
