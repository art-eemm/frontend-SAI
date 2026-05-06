import React from "react";

export function StatusBadge({ status }: { status: string }) {
  if (!status) return null;

  const cleanStatus = status.replace(/_/g, " ").toUpperCase();

  const base = "px-2 py-[2px] text-xs font-medium rounded-md";

  switch (status) {
    case "NUEVO":
      return (
        <span className={`${base} bg-slate-100 text-slate-600`}>Nuevo</span>
      );
    case "EN_REVISION":
      return (
        <span className={`${base} bg-amber-100 text-amber-600`}>
          En Revisión
        </span>
      );
    case "CON_OBSERVACIONES":
      return (
        <span className={`${base} bg-orange-100 text-orange-600`}>
          Observaciones
        </span>
      );
    case "APROBADO_SIN_FIRMA":
      return (
        <span className={`${base} bg-blue-100 text-blue-600`}>Aprobado</span>
      );
    case "VIGENTE":
      return (
        <span className={`${base} bg-green-100 text-green-600`}>Vigente</span>
      );
    case "VENCIDO":
      return <span className={`${base} bg-red-100 text-red-600`}>Vencido</span>;
  }

  return (
    <span
      className={`inline-flex items-center justify-center text-[10px] sm:text-xs px-2.5 py-0.5 rounded-full font-bold border whitespace-nowrap ${base}`}
    >
      {cleanStatus}
    </span>
  );
}
