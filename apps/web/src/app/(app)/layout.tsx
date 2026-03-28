import Link from "next/link";
import type { ReactNode } from "react";

type AppLayoutProps = Readonly<{ children: ReactNode }>;

const navItems = [
  { href: "/dashboard/super-admin", label: "Super Admin" },
  { href: "/dashboard/admin", label: "Healthcare Admin" },
  { href: "/dashboard/case-manager", label: "Case Manager" },
  { href: "/dashboard/caregiver", label: "Caregiver" },
  { href: "/portal/patient", label: "Patient Portal" },
];

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-brand-mist/60">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3">
          <Link href="/" className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-teal">
            Timesheet Healthcare
          </Link>
          <nav className="hidden gap-3 md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-full px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}
