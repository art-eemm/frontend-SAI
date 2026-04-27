"use client";

import { useDashboardData } from "@/hooks/useDashboardData";
import KpiGrid from "@/components/dashboard/KpiGrid";
import RecentActivity from "@/components/dashboard/RecentActivity";
import QuickAccess from "@/components/dashboard/QuickAccess";
import { FileText, Calendar, UploadCloud, AlertCircle } from "lucide-react";

export default function AdminDashboard() {
  const { kpis, recentActivity, loading } = useDashboardData();

  const adminKpis = [
    {
      icon: <FileText className="w-4 h-4 text-yellow-500" />,
      title: "Documentos totales",
      value: loading ? "-" : kpis.total.toString(),
      desc: "documentos",
    },
    {
      icon: <Calendar className="w-4 h-4 text-blue-500" />,
      title: "Nuevos esta semana",
      value: loading ? "-" : kpis.recents.toString(),
      desc: "nuevos documentos",
    },
    {
      icon: <UploadCloud className="w-4 h-4 text-green-500" />,
      title: "Mis subidas",
      value: loading ? "-" : kpis.myUploads.toString(),
      desc: "documentos subidos",
    },
    {
      icon: <AlertCircle className="w-4 h-4 text-red-500" />,
      title: "Vencidos",
      value: loading ? "-" : kpis.expired.toString(),
      desc: "documentos vencidos",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <KpiGrid items={adminKpis} />

      <RecentActivity data={recentActivity} isLoading={loading} />

      <QuickAccess />
    </div>
  );
}
