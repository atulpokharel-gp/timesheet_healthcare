# Web App (PW-001 + PW-002 + PW-003 M1)

This directory contains the Next.js + TypeScript + Tailwind application scaffold for the healthcare SaaS platform.

## Implemented in PW-001

- App Router setup
- Route groups: `(public)`, `(auth)`, `(app)`
- Role-route placeholders:
  - `/dashboard/super-admin`
  - `/dashboard/admin`
  - `/dashboard/case-manager`
  - `/dashboard/caregiver`
  - `/portal/patient`
- Shared dashboard shell component
- Module boundary registry and module placeholders
- Middleware placeholder for future route protection

## Implemented in PW-002

Implemented:

- Login server action with mock credentials
- Cookie-based session context
- Agency selector and role selector flows
- Middleware guard enforcement and role-based redirects

Next:

- Replace mock auth with production identity provider
- Add secure signed session strategy
- Add guard + redirect integration tests

## Implemented in PW-003 Milestone 1

- Healthcare admin dashboard upgraded with patient metrics and admission entry actions
- Patient routes added:
  - `/dashboard/admin/patients`
  - `/dashboard/admin/patients/new`
  - `/dashboard/admin/patients/:id`
- Patient module implemented with typed in-memory repository and admission validation

## Next (PW-003)

- Replace in-memory patient repository with persistent data layer
- Integrate assignment directories and schedule generation workflow
- Add integration tests for patient admission/list/detail flow
