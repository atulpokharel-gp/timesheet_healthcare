# timesheet_healthcare

Connected, architecture-aware Home Healthcare SaaS platform.

## Current Status

- Phase PW-001 scaffold is complete.
- Phase PW-002 auth/tenant/role routing core is implemented (mock identity).
- Phase PW-003 has started with Milestone 1 implemented: healthcare admin patient admission MVP (list/create/detail).
- Next.js + TypeScript + Tailwind app scaffold lives in `apps/web`.
- Mandatory architecture memory system lives in `project_memory`.

## Project Structure

- `apps/web`: frontend platform scaffold (App Router, route groups, module boundaries)
- `project_memory`: persistent architecture/workflow/dependency memory JSON files

## Next Phase

- Continue PW-003: assignment directory integration, schedule generation, and persistent data layer for patient operations.
