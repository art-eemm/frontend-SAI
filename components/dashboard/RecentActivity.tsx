import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { RecentActivityItem } from "@/lib/types";
import { StatusBadge } from "../shared/StatusBadge";

interface RecentActivityProps {
  data: RecentActivityItem[];
  isLoading: boolean;
}

export default function RecentActivity({
  data,
  isLoading,
}: RecentActivityProps) {
  return (
    <div className="bg-accent rounded-xl p-6 shadow-md mb-8">
      <h2 className="text-base font-semibold text-foreground mb-4">
        Actividad reciente
      </h2>

      {isLoading ? (
        <div className="text-center py-6 text-muted-foreground text-sm">
          Cargando actividad reciente...
        </div>
      ) : data.length === 0 ? (
        <div className="text-center py-6 text-muted-foreground text-sm">
          No hay documentos recientes.
        </div>
      ) : (
        <>
          {/* Tabla Móvil */}
          <div className="md:hidden space-y-4">
            {data.map((row) => (
              <div
                key={row.id}
                className="bg-accent border-2 border-border rounded-xl p-4 shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-muted-foreground">{row.proc}</p>
                    <h3 className="text-sm font-semibold text-foreground mt-1">
                      {row.name}
                    </h3>
                  </div>
                  <StatusBadge status={row.status} />
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div>
                    <span className="text-muted-foreground">Fecha</span>
                    <p>{row.date}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Rev.</span>
                    <p>{row.rev}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:block bg-accent rounded-md border border-border overflow-x-auto">
            <div className="min-w-175">
              <Table>
                <TableHeader>
                  <TableRow className="bg-accent">
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
                      Versión
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
                        <StatusBadge status={row.status} />
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
