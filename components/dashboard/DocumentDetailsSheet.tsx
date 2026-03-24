"use client";

import { Sheet, SheetContent } from "../ui/sheet";
import { Button } from "../ui/button";
import { DocItem } from "@/lib/services/documents";
import { Download, Eye, RefreshCcw } from "lucide-react";
import { useDocumentActions } from "@/hooks/useDocumentActions";
import Link from "next/link";

import { DocumentDetailsHeader } from "./document-details/DocumentDetailsHeader";
import { DocumentUpdateForm } from "./document-details/DocumentUpdateForm";
import { DocumentVersionHistory } from "./document-details/DocumentVersionHistory";

interface DocumentDetailsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  document: DocItem | null;
  onOpenPdf: (url: string, name: string) => void;
}

export function DocumentDetailsSheet({
  isOpen,
  onClose,
  document,
  onOpenPdf,
}: DocumentDetailsSheetProps) {
  const actions = useDocumentActions(document?.id);

  if (!document) return null;

  const handleClose = () => {
    actions.resetForm();
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent className="w-full sm:max-w-md bg-background p-0 overflow-y-auto">
        <DocumentDetailsHeader document={document} />

        <div className="p-6 space-y-6">
          {/* Botones de acción principales */}
          <div>
            <p className="text-sm font-medium text-foreground mb-3">Acciones</p>
            <div className="flex gap-3">
              <Button
                className="bg-brand-green hover:bg-brand-green/80 text-foreground gap-2 cursor-pointer w-3/4"
                onClick={() =>
                  actions.downloadVersion(
                    document.url,
                    document.nombre,
                    document.revision,
                    document.tipo,
                  )
                }
              >
                <Download className="w-4 h-4" />
                Descargar Ver. {document.revision}
              </Button>
              <Button
                variant="outline"
                className="gap-2 flex-1 cursor-pointer"
                onClick={() => onOpenPdf(document.url, document.nombre)}
              >
                <Eye className="w-4 h-4" />
                Ver
              </Button>
            </div>
          </div>

          <DocumentUpdateForm actions={actions} onSuccess={handleClose} />

          <DocumentVersionHistory
            versiones={document.versiones}
            onDownload={(url, rev) =>
              actions.downloadVersion(url, document.nombre, rev, document.tipo)
            }
            onOpenPdf={(url) => onOpenPdf(url, document.nombre)}
          />

          {document.versiones && document.versiones.length > 1 && (
            <div className="flex pt-2 justify-center items-center gap-2 text-blue-600">
              <RefreshCcw className="w-4 h-4" />
              <Link
                href={`/dashboard/compare/${document.id}`}
                className="text-sm font-medium hover:underline cursor-pointer"
              >
                Visualizador de cambios
              </Link>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
