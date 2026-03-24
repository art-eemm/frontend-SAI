"use client";

import { useDashboardData } from "@/hooks/useDashboardData";
import KpiGrid from "@/components/dashboard/KpiGrid";
import RecentActivity from "@/components/dashboard/RecentActivity";
import QuickAccess from "@/components/dashboard/QuickAccess";

export default function DashboardPage() {
  const { kpis, recentActivity, loading } = useDashboardData();

  return (
    <div className="min-h-screen bg-background">
      <KpiGrid kpis={kpis} />

      <RecentActivity data={recentActivity} isLoading={loading} />

      <QuickAccess />
    </div>
  );
}
