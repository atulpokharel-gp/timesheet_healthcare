type DashboardShellProps = {
  title: string;
  subtitle: string;
};

export function DashboardShell({ title, subtitle }: DashboardShellProps) {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <section className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-brand-ink">{title}</h1>
        <p className="mt-2 text-slate-700">{subtitle}</p>
        <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-700">
          PW-001 scaffold complete for this route. PW-002+ will connect auth, tenant context, contracts, and module logic.
        </div>
      </section>
    </main>
  );
}
