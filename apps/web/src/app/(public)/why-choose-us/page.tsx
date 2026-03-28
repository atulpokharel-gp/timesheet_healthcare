import Link from "next/link";

const pillars = [
  {
    title: "Connected workflow continuity",
    description: "From admission to exports, each role stays in a single workflow graph with tenant-safe routing.",
  },
  {
    title: "Compliance-first evidence",
    description: "Draft safety, weekly signatures, GPS/EVV evidence, and revision lineage are modeled together.",
  },
  {
    title: "Operations with fewer handoffs",
    description: "Exceptions, reports, and billing/payroll readiness remain visible across admin and case manager surfaces.",
  },
];

export default function WhyChooseUsPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 pb-20 pt-10">
      <header className="flex flex-wrap items-center justify-between gap-3 py-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-teal">Why choose us</p>
        <Link href="/auth/login" className="rounded-full border border-brand-ink px-4 py-2 text-sm font-medium">
          Launch Portal
        </Link>
      </header>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white/75 p-8 shadow-sm">
        <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">Built for high-trust home healthcare operations.</h1>
        <p className="mt-4 max-w-2xl text-slate-700">
          Timesheet Healthcare helps agencies run caregiver, patient, and reviewer workflows without losing audit context.
        </p>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {pillars.map((pillar) => (
          <article key={pillar.title} className="rounded-2xl border border-slate-200 bg-white/80 p-5">
            <h2 className="text-lg font-semibold">{pillar.title}</h2>
            <p className="mt-2 text-sm text-slate-700">{pillar.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
