"use client";

import { useEffect, useState } from "react";
import DashboardDocumentTable from "@/components/dashboard/DashboardDocumentTable";
import { DocItem, fetchDocuments } from "@/lib/services/documents";
import { useHeader } from "@/lib/contexts/HeaderContext";
import { CustomBreadcrumbs } from "@/components/shared/CustomBreadcrumbs";
import { Loader2 } from "lucide-react";

export default function VencidosPage() {
  const [documents, setDocuments] = useState<DocItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { setHeaderState, resetHeader } = useHeader();

  useEffect(() => {
    setHeaderState({
      title: "Documentos Vencidos",
      subtitle:
        "Todos los documentos a nivel global que han superado su fecha de vigencia y requieren actualización.",
    });

    const loadVencidos = async () => {
      try {
        const allDocs = await fetchDocuments();

        const vencidos = allDocs.filter(
          (doc) => doc.estado?.toLowerCase() === "vencido",
        );

        setDocuments(vencidos);
      } catch (error) {
        console.error("Error al cargar los documentos vencidos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadVencidos();

    return () => {
      resetHeader();
    };
  }, []);

  return (
    <div className="flex-1 overflow-y-auto">
      <div>
        <CustomBreadcrumbs />
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center h-64 border-2 border-border rounded-lg bg-accent/50">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Loader2 className="animate-spin w-8 h-8" />
            <p>Cargando documentos vencidos...</p>
          </div>
        </div>
      ) : (
        <DashboardDocumentTable title="Vencidos" data={documents} />
      )}
    </div>
  );
}
