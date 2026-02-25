"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  SlidersHorizontal,
  Eye,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import dynamic from "next/dynamic";

const DocumentViewer = dynamic(
  () => import("./DocumentViewer").then((mod) => mod.DocumentViewer),
  {
    ssr: false,
  },
);

// Recibe los props para saber que datos pedir
interface DocumentTableProps {
  title: string;
  module: string;
  category: string;
  department?: string;
}

export default function DocumentTable({
  title,
  module,
  category,
  department,
}: DocumentTableProps) {
  const [selectedDoc, setSelectedDoc] = useState<{
    url: string;
    name: string;
  } | null>(null);
  // fetch a la base de datos
  // const data = await fetchDocuments(module, category, department)

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 mt-4">
        <h1 className="text-2xl font-bold text-gray-900 capitalize">{title}</h1>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Input
              type="text"
              placeholder="Buscar..."
              className="w-full bg-white"
            />
          </div>
          <Button
            variant={"outline"}
            className="flex items-center gap-2 bg-white"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filtro
          </Button>
        </div>
      </div>

      {/* Tabla */}
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
                Fecha de Rev.
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
            {/* Aquí va el map para los documentos */}
            <TableRow className="text-gray-600">
              <TableCell className="px-6 py-4">procedencia</TableCell>
              <TableCell className="px-6 py-4">nombre</TableCell>
              <TableCell className="px-6 py-4 text-center">fecha</TableCell>
              <TableCell className="px-6 py-4 text-center">revisión</TableCell>
              <TableCell className="px-6 py-4">
                <div className="flex justify-center">
                  <span className="bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    tipo
                  </span>
                </div>
              </TableCell>
              <TableCell className="px-6 py-4">
                <div className="flex justify-center">
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    className="text-gray-500 hover:text-gray-900"
                    title="Ver documento"
                    onClick={() =>
                      setSelectedDoc({
                        url: "/SAI.pdf",
                        name: "SAI",
                      })
                    }
                  >
                    <Eye className="h-5 w-5" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Paginación */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-sm gap-4">
        <div className="text-gray-500">Mostrando 1 - 4 de 4</div>

        <div className="flex items-center gap-4">
          <span>Página 1 de 1</span>
          <div className="flex items-center gap-2">
            <Button
              variant={"outline"}
              size={"icon"}
              className="h-8 w-8 disabled:opacity-50"
              disabled
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant={"outline"}
              size={"icon"}
              className="h-8 w-8 disabled:opacity-50"
              disabled
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant={"outline"}
              size={"icon"}
              className="h-8 w-8 disabled:opacity-50"
              disabled
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
            <Button
              variant={"outline"}
              size={"icon"}
              className="h-8 w-8 disabled:opacity-50"
              disabled
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <DocumentViewer
        isOpen={!!selectedDoc}
        onClose={() => setSelectedDoc(null)}
        documentUrl={selectedDoc?.url || null}
        documentName={selectedDoc?.name || ""}
      />
    </div>
  );
}
