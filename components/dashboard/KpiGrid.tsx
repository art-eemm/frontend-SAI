import { FileText, Calendar, UploadCloud, AlertCircle } from "lucide-react";
import { DashboardKpis } from "@/lib/types";

interface KpiGridProps {
  kpis: DashboardKpis;
}

export default function KpiGrid({ kpis }: KpiGridProps) {
  const kpiCards = [
    {
      icon: <FileText className="w-4 h-4 text-yellow-500" />,
      title: "Documentos totales",
      value: kpis.total.toString(),
      desc: "documentos",
    },
    {
      icon: <Calendar className="w-4 h-4 text-blue-500" />,
      title: "Nuevos esta semana",
      value: kpis.recents.toString(),
      desc: "nuevos documentos",
    },
    {
      icon: <UploadCloud className="w-4 h-4 text-green-500" />,
      title: "Mis subidas",
      value: kpis.myUploads.toString(),
      desc: "documentos subidos",
    },
    {
      icon: <AlertCircle className="w-4 h-4 text-red-500" />,
      title: "Vencidos",
      value: kpis.expired.toString(),
      desc: "documentos vencidos",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-8">
      {kpiCards.map((card, i) => (
        <div
          key={i}
          className="bg-gray-100 rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition"
        >
          <div className="flex items-center gap-2 mb-3">
            {card.icon}
            <h3 className="text-sm font-medium text-gray-700">{card.title}</h3>
          </div>

          <div className="flex items-end gap-2">
            <span className="text-2xl font-light text-gray-900">
              {card.value}
            </span>
            <span className="text-xs text-gray-500 mb-1">{card.desc}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
