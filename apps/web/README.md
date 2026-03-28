# Web App (PW-001 Scaffold)

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

## Next (PW-002)

- Connect login to session handling
- Implement agency selector logic
- Implement role selector and role-aware redirects
- Enforce tenant-safe route guards
