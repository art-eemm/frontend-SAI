import React from "react";

export function StatusBadge({ status }: { status: string }) {
  if (!status) return null;

  const cleanStatus = status.replace(/_/g, " ").toUpperCase();

  let colorClasses = "bg-slate-100 text-slate-800 border-slate-300";

  switch (status) {
    case "EN_REVISION":
      colorClasses = "bg-amber-100 text-amber-800 border-amber-300";
      break;
    case "CON_OBSERVACIONES":
      colorClasses = "bg-red-100 text-red-800 border-red-300";
      break;
    case "APROBADO_SIN_FIRMA":
      colorClasses = "bg-blue-100 text-blue-800 border-blue-300";
      break;
    case "VIGENTE":
      colorClasses = "bg-green-100 text-green-800 border-green-300";
      break;
    case "VENCIDO":
      colorClasses = "bg-gray-800 text-white border-gray-900";
      break;
  }

  return (
    <span
      className={`inline-flex items-center justify-center text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full font-bold border whitespace-nowrap ${colorClasses}`}
    >
      {cleanStatus}
    </span>
  );
}
