import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { RecentActivityItem } from "@/lib/types";

interface RecentActivityProps {
  data: RecentActivityItem[];
  isLoading: boolean;
}

const getStatusBadge = (status: string) => {
  const base = "px-2 py-[2px] text-[11px] font-medium rounded-md";
  const formattedStatus =
    status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

  switch (formattedStatus) {
    case "Nuevo":
      return <span className={`${base} bg-blue-100 text-blue-600`}>Nuevo</span>;
    case "Vigente":
      return (
        <span className={`${base} bg-green-100 text-green-600`}>Vigente</span>
      );
    case "Vencido":
      return <span className={`${base} bg-red-100 text-red-600`}>Vencido</span>;
    case "Por vencer":
      return (
        <span className={`${base} bg-yellow-100 text-yellow-700`}>
          Por vencer
        </span>
      );
    default:
      return <span>{status}</span>;
  }
};

export default function RecentActivity({
  data,
  isLoading,
}: RecentActivityProps) {
  return (
    <div className="bg-gray-100 rounded-xl p-6 shadow-md mb-8">
      <h2 className="text-base font-semibold text-gray-800 mb-4">
        Actividad reciente
      </h2>

      {isLoading ? (
        <div className="text-center py-6 text-gray-500 text-sm">
          Cargando actividad reciente...
        </div>
      ) : data.length === 0 ? (
        <div className="text-center py-6 text-gray-500 text-sm">
          No hay documentos recientes.
        </div>
      ) : (
        <>
          {/* Tabla Móvil */}
          <div className="md:hidden space-y-4">
            {data.map((row) => (
              <div
                key={row.id}
                className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-gray-500">{row.proc}</p>
                    <h3 className="text-sm font-semibold text-gray-900 mt-1">
                      {row.name}
                    </h3>
                  </div>
                  {getStatusBadge(row.status)}
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-gray-600">
                  <div>
                    <span className="text-gray-400">Fecha</span>
                    <p>{row.date}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Rev.</span>
                    <p>{row.rev}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:block bg-gray-100 rounded-md border border-gray-300 overflow-x-auto">
            <div className="min-w-175">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead className="text-sm font-bold whitespace-nowrap">
                      Procedencia
                    </TableHead>
                    <TableHead className="text-sm font-bold whitespace-nowrap">
                      Nombre
                    </TableHead>
                    <TableHead className="text-sm font-bold whitespace-nowrap">
                      Fecha
                    </TableHead>
                    <TableHead className="text-sm font-bold whitespace-nowrap">
                      Revisión
                    </TableHead>
                    <TableHead className="text-sm font-bold whitespace-nowrap">
                      Usuario
                    </TableHead>
                    <TableHead className="text-sm font-bold whitespace-nowrap">
                      Estado
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {data.map((row) => (
                    <TableRow key={row.id} className="text-sm">
                      <TableCell className="font-medium whitespace-nowrap">
                        {row.proc}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {row.name}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {row.date}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {row.rev}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {row.user}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {getStatusBadge(row.status)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
