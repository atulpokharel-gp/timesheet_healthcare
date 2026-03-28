import { DashboardShell } from "@/components/layout/dashboard-shell";

type CaregiverVisitPageProps = {
  params: Promise<{ occurrenceId: string }>;
};

export default async function CaregiverVisitPage({ params }: CaregiverVisitPageProps) {
  const { occurrenceId } = await params;

  return (
    <DashboardShell
      title={`Caregiver Daily Visit · ${occurrenceId}`}
      subtitle="Daily visit execution with draft save and GPS clock-in/out continuity model (scaffold)."
    />
  );
}
