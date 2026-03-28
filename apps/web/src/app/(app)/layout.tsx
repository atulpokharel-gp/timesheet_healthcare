import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { clearSessionCookie, getSessionFromCookies } from "@/lib/auth/session";

type AppLayoutProps = Readonly<{ children: ReactNode }>;

const navItems = [
  { href: "/dashboard/super-admin", label: "Super Admin" },
  { href: "/dashboard/admin", label: "Healthcare Admin" },
  { href: "/dashboard/case-manager", label: "Case Manager" },
  { href: "/dashboard/caregiver", label: "Caregiver" },
  { href: "/portal/patient", label: "Patient Portal" },
];

export default async function AppLayout({ children }: AppLayoutProps) {
  async function logoutAction(): Promise<void> {
    "use server";

    await clearSessionCookie();
    redirect("/auth/login");
  }

  const session = await getSessionFromCookies();

  return (
    <div className="min-h-screen bg-brand-mist/60">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3">
          <div>
            <Link href="/" className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-teal">
              Timesheet Healthcare
            </Link>
            <p className="text-xs text-slate-600">
              {session?.email ?? "unknown user"} | {session?.selectedAgencyId ?? "no agency"} | {session?.activeRole ?? "no role"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <nav className="hidden gap-3 md:flex">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-full px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100">
                  {item.label}
                </Link>
              ))}
            </nav>
            <form action={logoutAction}>
              <button
                type="submit"
                className="rounded-full border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
