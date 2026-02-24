import { CustomBreadcrumbs } from "@/components/shared/CustomBreadcrumbs";
import {
  SlidersHorizontal,
  Eye,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DEPARTAMENTOS = [
  { title: "CCA", description: "Control de Calidad" },
  { title: "COM", description: "Comercialización" },
  { title: "CPA", description: "Compras" },
  { title: "DEM", description: "Desarrollo de Métodos" },
  { title: "DIR", description: "Dirección" },
  { title: "FIN", description: "Finanzas" },
  { title: "GEM", description: "Gestión Empresarial" },
  { title: "ING", description: "Ingeniería y Servicios" },
  { title: "MPT", description: "Medicina Preventiva del Trabajo" },
  { title: "PER", description: "Personal" },
  { title: "PLA", description: "Planeación" },
  { title: "PRO", description: "Producción" },
  { title: "SAI", description: "Sistema de Administración Integral" },
  {
    title: "TIC",
    description: "Tecnologías de la Información y la Comunicación",
  },
  { title: "TRA", description: "Transporte" },
];

const mockDocuments = [
  {
    id: 1,
    procedencia: "SAI-P-01",
    nombre: "Manual de la empresa",
    fecha: "27/05/2016",
    revision: "13",
    tipo: "PDF",
  },
  {
    id: 2,
    procedencia: "SAI-P-01",
    nombre: "Manual de calidad",
    fecha: "26/08/2025",
    revision: "14",
    tipo: "PDF",
  },
  {
    id: 3,
    procedencia: "SAI-P-01",
    nombre: "Manual de SASST",
    fecha: "06/06/2016",
    revision: "13",
    tipo: "PDF",
  },
  {
    id: 4,
    procedencia: "SAI-P-01",
    nombre: "Manual de cumplimiento social",
    fecha: "14/10/2024",
    revision: "10",
    tipo: "PDF",
  },
];

export default async function DepartmentDocumentsPage({
  params,
}: {
  params: Promise<{ category: string; dept?: string }>;
}) {
  const resolvedParams = await params;
  const category = resolvedParams.category;

  const deptParam = resolvedParams.dept?.toUpperCase();
  const departmentInfo = DEPARTAMENTOS.find((d) => d.title === deptParam);
  const pageTitle = departmentInfo ? departmentInfo.description : category;

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <CustomBreadcrumbs />

      {/* Cabecera */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 mt-4">
        <h1 className="text-2xl font-bold text-gray-900 capitalize">
          {pageTitle}
        </h1>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Input
              type="text"
              placeholder="Buscar..."
              className="w-full bg-white"
            />
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-white"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filtro
          </Button>
        </div>
      </div>

      {/* Tabla con shadcn/ui */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="px-6 py-4 font-semibold text-gray-900">
                Procedencia
              </TableHead>
              <TableHead className="px-6 py-4 font-semibold text-gray-900">
                Nombre
              </TableHead>
              <TableHead className="px-6 py-4 font-semibold text-gray-900 text-center">
                Fecha de rev.
              </TableHead>
              <TableHead className="px-6 py-4 font-semibold text-gray-900 text-center">
                Revisión
              </TableHead>
              <TableHead className="px-6 py-4 font-semibold text-gray-900 text-center">
                Tipo de Archivo
              </TableHead>
              <TableHead className="px-6 py-4 font-semibold text-gray-900 text-center">
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockDocuments.map((doc) => (
              <TableRow key={doc.id} className="text-gray-600">
                <TableCell className="px-6 py-4">{doc.procedencia}</TableCell>
                <TableCell className="px-6 py-4">{doc.nombre}</TableCell>
                <TableCell className="px-6 py-4 text-center">
                  {doc.fecha}
                </TableCell>
                <TableCell className="px-6 py-4 text-center">
                  {doc.revision}
                </TableCell>
                <TableCell className="px-6 py-4">
                  <div className="flex justify-center">
                    <span className="bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {doc.tipo}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <div className="flex justify-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-500 hover:text-gray-900"
                      title="Ver documento"
                    >
                      <Eye className="h-5 w-5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Paginación */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-sm text-gray-500 gap-4">
        <div>
          Mostrando 1 - {mockDocuments.length} de {mockDocuments.length}
        </div>

        <div className="flex items-center gap-4">
          <span>Página 1 de 1</span>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 disabled:opacity-50"
              disabled
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 disabled:opacity-50"
              disabled
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 disabled:opacity-50"
              disabled
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 disabled:opacity-50"
              disabled
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
