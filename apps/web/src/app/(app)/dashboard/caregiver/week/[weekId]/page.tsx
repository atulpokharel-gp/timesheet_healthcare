import { DashboardShell } from "@/components/layout/dashboard-shell";

type CaregiverWeekPageProps = {
  params: Promise<{ weekId: string }>;
};

export default async function CaregiverWeekPage({ params }: CaregiverWeekPageProps) {
  const { weekId } = await params;

  return (
    <DashboardShell
      title={`Caregiver Weekly Submission · ${weekId}`}
      subtitle="Weekly review, copy previous day/week policy checks, and hybrid signatures before submit (scaffold)."
    />
  );
}
