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
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  SlidersHorizontal,
} from "lucide-react";
import dynamic from "next/dynamic";
import { DocItem } from "@/lib/services/documents";

const DocumentViewer = dynamic(
  () => import("../shared/DocumentViewer").then((mod) => mod.DocumentViewer),
  { ssr: false },
);

interface DashboardDocumentTableProps {
  title: string;
  data: DocItem[];
}

const getStatusBadge = (status: string) => {
  const base = "px-2 py-[2px] text-[11px] font-medium rounded-md";
  const formattedStatus = status;

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

export default function DashboardDocumentTable({
  title,
  data = [],
}: DashboardDocumentTableProps) {
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
      doc.procedencia.toLowerCase().includes(searchLower)
    );
  });

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="bg-accent border-2 border-border rounded-lg p-4">
      {/* Controles Superiores */}
      <div className="mb-3">
        <h1 className="text-xl font-bold text-foreground mb-2">{title}</h1>

        <div className="flex items-center justify-between">
          <div className="relative w-full md:w-64">
            <Input
              placeholder="Buscar..."
              className="w-full bg-background"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <Button
            variant={"secondary"}
            className="flex items-center gap-2 cursor-pointer border border-border"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filtro
          </Button>
        </div>
      </div>

      {/* Tabla */}
      <div className="border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-3 py-1 text-sm font-semibold text-foreground">
                Procedencia
              </TableHead>
              <TableHead className="px-3 py-1 text-sm font-semibold text-foreground">
                Nombre
              </TableHead>
              <TableHead className="px-3 py-1 text-sm font-semibold text-foreground">
                Fecha
              </TableHead>
              <TableHead className="px-3 py-1 text-sm font-semibold text-foreground">
                Fecha de vencimiento
              </TableHead>
              <TableHead className="px-3 py-1 text-sm font-semibold text-foreground">
                Revisión
              </TableHead>
              <TableHead className="px-3 py-1 text-sm font-semibold text-foreground">
                Tipo de Archivo
              </TableHead>
              <TableHead className="px-3 py-1 text-sm font-semibold text-foreground">
                Estado
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={10}
                  className="text-center py-8 text-muted-foreground"
                >
                  {searchTerm !== ""
                    ? `No se encontraron resultados para "${searchTerm}".`
                    : "No se encontraron documentos en esta sección."}
                </TableCell>
              </TableRow>
            ) : (
              currentData.map((doc) => (
                <TableRow
                  key={doc.id}
                  className="text-muted-foreground hover:bg-background/50"
                >
                  <TableCell className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                    {doc.procedencia}
                  </TableCell>
                  <TableCell className="px-4 py-3 whitespace-nowrap">
                    {doc.nombre}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center whitespace-nowrap">
                    {new Date(doc.fechaRev)
                      .toLocaleDateString("es-MX", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                      .replace(".", "")}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center whitespace-nowrap">
                    {doc.fechaVenc
                      ? new Date(doc.fechaVenc)
                          .toLocaleDateString("es-MX", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })
                          .replace(".", "")
                      : "N/A"}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center">
                    {doc.revision}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <div className="flex justify-center">
                      <span className="bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {doc.tipo}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center">
                    {getStatusBadge(doc.estado)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginación */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-sm gap-4 text-muted-foreground">
        <div>
          Mostrando {totalItems === 0 ? 0 : startIndex + 1} - {endIndex} de{" "}
          {totalItems}
        </div>
        <div className="flex items-center gap-4">
          <span>
            Página {totalPages === 0 ? 0 : currentPage} de {totalPages}
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1 || totalPages === 0}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1 || totalPages === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <ChevronsRight className="h-4 w-4" />
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
