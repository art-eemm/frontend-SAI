import { Folder, Shield, Settings, History, ChevronRight } from "lucide-react";
import { ApiDocument } from "@/lib/types";
import Link from "next/link";

interface QuickAccessProps {
  documents?: ApiDocument[];
  loading?: boolean;
}

export default function QuickAccess({ documents, loading }: QuickAccessProps) {
  const countByCategory = (keywords: string[]) => {
    return documents?.filter((doc) => {
      const category = (doc.category || "").toLowerCase();
      return keywords.some((keyword) =>
        category.includes(keyword.toLowerCase()),
      );
    }).length;
  };

  const quickAccessItems = [
    {
      icon: <Folder className="w-4 h-4" />,
      title: "Manuales",
      desc: "Guías de operación y seguridad",
      count: countByCategory(["manuales"]),
      href: "/dashboard/documentacion/manuales",
    },
    {
      icon: <Shield className="w-4 h-4" />,
      title: "Indicadores de Proceso",
      desc: "Métricas clave para monitoreo",
      count: countByCategory(["indicador"]),
      href: "/dashboard/indicadores/proceso",
    },
    {
      icon: <Settings className="w-4 h-4" />,
      title: "Procedimientos",
      desc: "Pasos estandarizados de operación",
      count: countByCategory(["procedimiento"]),
      href: "/dashboard/documentacion/procedimientos",
    },
    {
      icon: <History className="w-4 h-4" />,
      title: "Programas",
      desc: "Planes de acción y mejora continua",
      count: countByCategory(["cambios", "control"]),
      href: "/dashboard/programas",
    },
  ];

  return (
    <div className="bg-accent rounded-xl p-6 shadow-md">
      <h2 className="text-base font-semibold text-foreground mb-6">
        Accesos rápidos
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickAccessItems.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className="flex justify-between items-center p-2 hover:cursor-pointer hover:bg-background/50 rounded-xl transition-colors group"
          >
            <div className="flex items-center gap-4">
              {item.icon}
              <div>
                <h4 className="text-sm font-medium text-foreground">
                  {item.title}
                </h4>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground text-xs">
              ({loading ? "-" : item.count})
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
