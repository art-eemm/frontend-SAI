import { Folder, Shield, Settings, History, ChevronRight } from "lucide-react";

export default function QuickAccess() {
  const items = [
    {
      icon: <Folder className="w-4 h-4" />,
      title: "Manuales",
      desc: "Guías de operación y seguridad",
      count: 5,
    },
    {
      icon: <Shield className="w-4 h-4" />,
      title: "Protocolos de Validación",
      desc: "Validación de calidad",
      count: 2,
    },
    {
      icon: <Settings className="w-4 h-4" />,
      title: "Procedimientos",
      desc: "Pasos estandarizados de operación",
      count: 100,
    },
    {
      icon: <History className="w-4 h-4" />,
      title: "Control de Cambios",
      desc: "Registro histórico de versiones",
      count: 2,
    },
  ];

  return (
    <div className="bg-gray-100 rounded-xl p-6 shadow-md">
      <h2 className="text-base font-semibold text-gray-800 mb-6">
        Accesos rápidos
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          {
            icon: <Folder className="w-4 h-4" />,
            title: "Manuales",
            desc: "Guías de operación y seguridad",
            count: 5,
          },
          {
            icon: <Shield className="w-4 h-4" />,
            title: "Protocolos de Validación",
            desc: "Validación de calidad",
            count: 2,
          },
          {
            icon: <Settings className="w-4 h-4" />,
            title: "Procedimientos",
            desc: "Pasos estandarizados de operación",
            count: 100,
          },
          {
            icon: <History className="w-4 h-4" />,
            title: "Control de Cambios",
            desc: "Registro histórico de versiones",
            count: 2,
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex justify-between items-center p-2 hover:cursor-pointer hover:bg-gray-200 rounded-xl"
          >
            <div className="flex items-center gap-4">
              {item.icon}
              <div>
                <h4 className="text-sm font-medium text-gray-800">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-500 text-xs">
              ({item.count})
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
