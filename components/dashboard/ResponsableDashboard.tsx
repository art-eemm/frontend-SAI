"use client";

import { useEffect } from "react";
import KpiGrid from "@/components/dashboard/KpiGrid";
import RecentActivity from "@/components/dashboard/RecentActivity";
import { useResponsableData } from "@/hooks/useResponsableData";
import { useHeader } from "@/lib/contexts/HeaderContext";
import { FileText, Clock, AlertTriangle, CheckCircle } from "lucide-react";

export default function ResponsableDashboard() {
  const { kpis, recentDocs, loading, currentUser, departmentPrefix } =
    useResponsableData();
  const { setHeaderState, resetHeader } = useHeader();

  useEffect(() => {
    if (!loading) {
      setHeaderState({
        title: `Panel de ${departmentPrefix}`,
        subtitle: `Hola de nuevo, ${currentUser?.name || "Responsable"}`,
      });
    }

    return () => {
      resetHeader();
    };
  }, [loading, departmentPrefix, currentUser]);

  const customKpiArray = [
    {
      title: "Documentos totales",
      value: loading ? "-" : kpis.total.toString(),
      icon: <FileText className="w-4 h-4 text-blue-500" />,
      desc: "documentos",
    },
    {
      title: "Actualizados",
      value: loading ? "-" : kpis.recents.toString(),
      icon: <CheckCircle className="w-4 h-4 text-green-500" />,
      desc: "documentos actualizados",
    },
    {
      title: "Pendientes de revisión",
      value: loading ? "-" : kpis.expired.toString(),
      icon: <Clock className="w-4 h-4 text-yellow-500" />,
      desc: "documentos en espera",
    },
    {
      title: "Por actualizar",
      value: loading ? "-" : kpis.expired.toString(),
      icon: <AlertTriangle className="w-4 h-4 text-red-500" />,
      desc: "requieren actualización",
    },
  ];

  return (
    <div className="bg-background">
      <KpiGrid items={customKpiArray} />

      <RecentActivity data={recentDocs} isLoading={loading} />
    </div>
  );
}
