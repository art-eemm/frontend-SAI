import {
  Bell,
  FileText,
  Calendar,
  UploadCloud,
  AlertCircle,
  Folder,
  Shield,
  Settings,
  History,
  ChevronRight,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";

const recentActivity = [
  {
    id: 1,
    proc: "COM-P-01",
    name: "Registro de clientes",
    date: "05/12/2025",
    rev: "18",
    user: "Ivonne",
    status: "Nuevo",
  },
  {
    id: 2,
    proc: "TRA-P-02",
    name: "Lista de personal y equipo de transporte",
    date: "05/12/2025",
    rev: "50",
    user: "Braian",
    status: "Actualizado",
  },
  {
    id: 3,
    proc: "SAI-P-01",
    name: "Glosario del SAI",
    date: "05/12/2025",
    rev: "15",
    user: "Braian",
    status: "Vencido",
  },
  {
    id: 4,
    proc: "SEH-P-13",
    name: "Listado de brigada contra incendio",
    date: "05/12/2025",
    rev: "09",
    user: "Ivonne",
    status: "Nuevo",
  },
  {
    id: 5,
    proc: "COM-P-01",
    name: "Encuesta de evaluación del servicio",
    date: "05/12/2025",
    rev: "18",
    user: "Braian",
    status: "Por vencer",
  },
  {
    id: 6,
    proc: "COM-P-01",
    name: "Encuesta de evaluación del servicio",
    date: "05/12/2025",
    rev: "18",
    user: "Braian",
    status: "Actualizado",
  },
  {
    id: 7,
    proc: "COM-P-01",
    name: "Encuesta de evaluación del servicio",
    date: "05/12/2025",
    rev: "18",
    user: "Braian",
    status: "Por vencer",
  },
];

const getStatusBadge = (status: string) => {
  const base = "px-2 py-[2px] text-[11px] font-medium rounded-md";

  switch (status) {
    case "Nuevo":
      return <span className={`${base} bg-blue-100 text-blue-600`}>Nuevo</span>;
    case "Actualizado":
      return (
        <span className={`${base} bg-green-100 text-green-600`}>
          Actualizado
        </span>
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

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white px-2 sm:px-6 lg:px-8 py-6">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-gray-300 pb-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 rounded-md hover:bg-gray-200 transition">
                  <Menu size={20} />
                </button>
              </SheetTrigger>

              <SheetContent side="left" className="w-70 p-0 bg-white">
                <Sidebar />
              </SheetContent>
            </Sheet>
          </div>

          <div>
            <h1 className="text-md sm:text-lg font-semibold text-gray-900">
              Inicio
            </h1>
            <p className="text-xs md:text-sm text-gray-500 mt-1">
              Bienvenido al Sistema de Administración Integral
            </p>
          </div>
        </div>

        <button className="absolute top-2 right-2 p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:cursor-pointer hover:bg-gray-100">
          <Bell className="w-4 h-4 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {[
          {
            icon: <FileText className="w-4 h-4 text-yellow-500" />,
            title: "Documentos totales",
            value: "1521",
            desc: "documentos",
          },
          {
            icon: <Calendar className="w-4 h-4 text-blue-500" />,
            title: "Nuevos esta semana",
            value: "11",
            desc: "nuevos documentos",
          },
          {
            icon: <UploadCloud className="w-4 h-4 text-green-500" />,
            title: "Mis subidas",
            value: "3",
            desc: "documentos subidos",
          },
          {
            icon: <AlertCircle className="w-4 h-4 text-red-500" />,
            title: "Vencidos",
            value: "15",
            desc: "documentos vencidos",
          },
        ].map((card, i) => (
          <div
            key={i}
            className="bg-gray-100 rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition"
          >
            <div className="flex items-center gap-2 mb-3">
              {card.icon}
              <h3 className="text-sm font-medium text-gray-700">
                {card.title}
              </h3>
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

      <div className="bg-gray-100 rounded-xl p-6 shadow-md mb-8">
        <h2 className="text-base font-semibold text-gray-800 mb-4">
          Actividad reciente
        </h2>

        {/* Tabla Móvil */}
        <div className="md:hidden space-y-4">
          {recentActivity.map((row) => (
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
                {recentActivity.map((row) => (
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
      </div>

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
    </div>
  );
}
