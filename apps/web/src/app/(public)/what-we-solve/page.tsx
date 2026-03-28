import Link from "next/link";

const problems = [
  "Disconnected timesheets and signatures across roles",
  "Missed weekly submissions and unresolved warning queues",
  "Manual billing/payroll prep caused by unstructured visit data",
  "Tenant boundary risk in multi-agency operations",
];

export default function WhatWeSolvePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 pb-20 pt-10">
      <header className="flex flex-wrap items-center justify-between gap-3 py-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-teal">What we solve</p>
        <Link href="/auth/login" className="rounded-full bg-brand-ink px-4 py-2 text-sm font-semibold text-white">
          Login
        </Link>
      </header>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white/75 p-8 shadow-sm">
        <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">Reduce compliance friction across the full care lifecycle.</h1>
        <ul className="mt-6 space-y-2 text-slate-700">
          {problems.map((problem) => (
            <li key={problem} className="rounded-xl border border-slate-200 bg-white px-4 py-3">
              {problem}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
