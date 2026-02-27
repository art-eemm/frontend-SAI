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

// documento procesado
export interface DocItem {
  id: string;
  procedencia: string;
  nombre: string;
  fechaRev: string;
  revision: string;
  tipo: string;
  url: string;
}
interface DocumentTableProps {
  title: string;
  data: DocItem[];
}

export default function DocumentTable({
  title,
  data = [],
}: DocumentTableProps) {
  const [selectedDoc, setSelectedDoc] = useState<{
    url: string;
    name: string;
  } | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = data.filter((doc) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      doc.nombre.toLowerCase().includes(searchLower) ||
      doc.procedencia.toLowerCase().includes(searchLower) ||
      doc.tipo.toLowerCase().includes(searchLower)
    );
  });

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  const currentData = filteredData.slice(startIndex, endIndex);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

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
              value={searchTerm}
              onChange={handleSearch}
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
            {currentData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-gray-500"
                >
                  {searchTerm !== ""
                    ? `No se encontraron resultados para "${searchTerm}".`
                    : "No se encontraron documentos en esta sección."}
                </TableCell>
              </TableRow>
            ) : (
              data.map((doc) => (
                <TableRow key={doc.id} className="text-gray-600">
                  <TableCell className="px-6 py-4 font-medium">
                    {doc.procedencia}
                  </TableCell>
                  <TableCell className="px-6 py-4">{doc.nombre}</TableCell>
                  <TableCell className="px-6 py-4 text-center">
                    {new Date(doc.fechaRev).toLocaleDateString("es-MX")}
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
                        variant={"ghost"}
                        size={"icon"}
                        className="text-gray-500 hover:text-gray-900"
                        title="Ver documento"
                        onClick={() =>
                          setSelectedDoc({
                            url: doc.url || "/SAI.pdf",
                            name: doc.nombre,
                          })
                        }
                      >
                        <Eye className="h-5 w-5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginación */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-sm gap-4">
        <div className="text-gray-500">
          Mostrando {totalItems === 0 ? 0 : startIndex + 1} - {endIndex} de{" "}
          {totalItems}
        </div>

        <div className="flex items-center gap-4">
          <span>
            Página {totalPages === 0 ? 0 : currentPage} de {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant={"outline"}
              size={"icon"}
              className="h-8 w-8 disabled:opacity-50"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1 || totalPages === 0}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant={"outline"}
              size={"icon"}
              className="h-8 w-8 disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1 || totalPages === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant={"outline"}
              size={"icon"}
              className="h-8 w-8 disabled:opacity-50"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
            <Button
              variant={"outline"}
              size={"icon"}
              className="h-8 w-8 disabled:opacity-50"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages || totalPages === 0}
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
