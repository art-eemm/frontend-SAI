"use client";

import { useDashboardData } from "@/hooks/useDashboardData";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import KpiGrid from "@/components/dashboard/KpiGrid";
import RecentActivity from "@/components/dashboard/RecentActivity";
import QuickAccess from "@/components/dashboard/QuickAccess";

export default function DashboardPage() {
  const { kpis, recentActivity, loading } = useDashboardData();

  return (
    <div className="min-h-screen bg-background px-2 sm:px-6 lg:px-8 py-6">
      <DashboardHeader />

      <KpiGrid kpis={kpis} />

      <RecentActivity data={recentActivity} isLoading={loading} />

      <QuickAccess />
    </div>
  );
}
