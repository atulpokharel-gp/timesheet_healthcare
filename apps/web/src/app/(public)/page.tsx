import Link from "next/link";

const featureCards = [
  {
    title: "Workflow-first care delivery",
    description: "Daily caregiver flow and weekly submission with draft safety and role-aware guardrails.",
  },
  {
    title: "Audit-ready operations",
    description: "Revision history, warning routing, and traceable data contracts for enterprise agencies.",
  },
  {
    title: "Billing and payroll continuity",
    description: "Approved visit data flows into payroll and billing-ready outputs without spreadsheet drift.",
  },
];

export default function LandingPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 pb-20 pt-10">
      <header className="flex items-center justify-between py-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-teal">Timesheet Healthcare</p>
        <div className="flex gap-3">
          <Link href="/auth/login" className="rounded-full border border-brand-ink px-4 py-2 text-sm font-medium">
            Login
          </Link>
          <Link href="/auth/login" className="rounded-full bg-brand-ink px-4 py-2 text-sm font-semibold text-white">
            Get Started
          </Link>
        </div>
      </header>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-white/75 p-8 shadow-sm backdrop-blur">
        <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
          Home healthcare workflows designed for auditability, speed, and connected agency operations.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-700">
          Designed for HIPAA-ready workflows and built with auditability and enterprise security in mind.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/auth/login" className="rounded-full bg-brand-teal px-5 py-3 font-semibold text-white">
            Launch Portal
          </Link>
          <Link href="/auth/login" className="rounded-full border border-brand-teal px-5 py-3 font-semibold text-brand-teal">
            Request Demo
          </Link>
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {featureCards.map((item) => (
          <article key={item.title} className="rounded-2xl border border-slate-200 bg-white/80 p-5">
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="mt-2 text-sm text-slate-700">{item.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
