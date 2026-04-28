"use client";

import { useState, useEffect } from "react";
import { Sheet, SheetContent } from "../ui/sheet";
import { Button } from "../ui/button";
import { DocItem } from "@/lib/services/documents";
import {
  Download,
  Eye,
  RefreshCcw,
  Send,
  CheckCircle,
  XCircle,
  UploadCloud,
  AlertCircle,
} from "lucide-react";
import { useDocumentActions } from "@/hooks/useDocumentActions";
import Link from "next/link";

import { DocumentDetailsHeader } from "./document-details/DocumentDetailsHeader";
import { DocumentUpdateForm } from "./document-details/DocumentUpdateForm";
import { DocumentVersionHistory } from "./document-details/DocumentVersionHistory";
import { StatusBadge } from "../shared/StatusBadge";

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
  const [showRejectInput, setShowRejectInput] = useState(false);
  const [rejectComment, setRejectComment] = useState("");

  let userRole = "";
  if (typeof window !== "undefined") {
    const u = localStorage.getItem("sai_user");
    if (u) {
      try {
        const parsed = JSON.parse(u);
        userRole = (parsed.role || parsed.rol || "").toUpperCase();
      } catch (e) {}
    }
  }

  const isAdmin = userRole.includes("ADMIN");
  const isResponsable = userRole.includes("RESPONSABLE");

  if (!document) return null;

  const handleClose = () => {
    actions.resetForm();
    setShowRejectInput(false);
    setRejectComment("");
    onClose();
  };

  const showStandardUpdateForm =
    document.estado !== "CON_OBSERVACIONES" &&
    document.estado !== "EN_REVISION";

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent className="w-full sm:max-w-md bg-background p-0 overflow-y-auto">
        <DocumentDetailsHeader document={document} />

        <div className="p-6 space-y-6">
          <div className="bg-muted/30 border border-border rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-foreground">
                Estado del Flujo
              </h3>
              <StatusBadge status={document.estado} />
            </div>

            {isAdmin && document.estado === "EN_REVISION" && (
              <div className="space-y-3 pt-2 border-t border-border">
                {!showRejectInput ? (
                  <div className="flex flex-col gap-2">
                    <Button
                      className="bg-brand-green hover:bg-brand-green/80 text-white gap-2 w-full"
                      onClick={() => actions.hanldeApprove()}
                      disabled={actions.isUpdating}
                    >
                      <CheckCircle className="w-4 h-4" /> Aprobar para Firma
                    </Button>
                    <Button
                      variant="destructive"
                      className="gap-2 w-full"
                      onClick={() => setShowRejectInput(true)}
                      disabled={actions.isUpdating}
                    >
                      <XCircle className="w-4 h-4" /> Rechazar / Observaciones
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3 animate-in fade-in zoom-in-95">
                    <textarea
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:ring-1 focus-visible:ring-ring"
                      placeholder="Indica qué debe corregir el responsable..."
                      value={rejectComment}
                      onChange={(e) => setRejectComment(e.target.value)}
                    />
                    <div className="flex gap-2">
                      <Button
                        variant="destructive"
                        size="sm"
                        className="flex-1"
                        disabled={!rejectComment.trim() || actions.isUpdating}
                        onClick={async () => {
                          const success =
                            await actions.handleReject(rejectComment);
                          if (success) {
                            setShowRejectInput(false);
                            setRejectComment("");
                          }
                        }}
                      >
                        Confirmar Rechazo
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowRejectInput(false)}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {isResponsable && document.estado === "NUEVO" && (
              <div className="pt-2 border-t border-border">
                <Button
                  className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => actions.handleSendToReview()}
                  disabled={actions.isUpdating}
                >
                  <Send className="w-4 h-4" /> Enviar a Revisión
                </Button>
              </div>
            )}

            {isResponsable && document.estado === "CON_OBSERVACIONES" && (
              <div className="space-y-4 pt-2 border-t border-border">
                <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-red-800 mb-1">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase">
                      Observaciones:
                    </span>
                  </div>
                  <p className="text-sm text-red-700 italic font-medium">
                    &quot;
                    {document.comentarioRechazo ||
                      "Sin comentarios detallados."}
                    &quot;
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-muted-foreground uppercase">
                    Subir archivo corregido:
                  </label>
                  <input
                    type="file"
                    accept=".pdf"
                    className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 cursor-pointer"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        actions.setUpdateFile(e.target.files[0]);
                        actions.setVersion(document.revision);
                      }
                    }}
                  />
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-2 mt-2"
                    disabled={!actions.updateFile || actions.isUpdating}
                    onClick={() => actions.handleUploadCorrection()}
                  >
                    <UploadCloud className="w-4 h-4" /> Enviar a revisión
                  </Button>
                </div>
              </div>
            )}

            {/* VISTA DEL RESPONSABLE: Subir Firmado Final */}
            {isResponsable && document.estado === "APROBADO_SIN_FIRMA" && (
              <div className="space-y-3 pt-2 border-t border-border">
                <p className="text-[11px] font-bold text-blue-800 uppercase">
                  Paso Final: Subir PDF Firmado
                </p>
                <input
                  type="file"
                  accept=".pdf"
                  className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      actions.setSignedFile(e.target.files[0]);
                    }
                  }}
                />
                <Button
                  className="w-full bg-brand-green hover:bg-brand-green/80 text-white gap-2"
                  disabled={!actions.signedFile || actions.isUpdating}
                  onClick={() => actions.handlePublishSigned()}
                >
                  <CheckCircle className="w-4 h-4" /> Publicar Oficial
                </Button>
              </div>
            )}
          </div>

          {/* Acciones de visualización siempre presentes */}
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase mb-3">
              Documento Actual
            </p>
            <div className="flex gap-3">
              <Button
                className="bg-brand-green hover:bg-brand-green/80 text-foreground gap-2 flex-1"
                onClick={() => {
                  if (!document.url) return;
                  const link = window.document.createElement("a");
                  link.href = document.url;
                  link.download = document.nombre;
                  window.document.body.appendChild(link);
                  link.click();
                  window.document.body.removeChild(link);
                }}
              >
                <Download className="w-4 h-4" /> Ver. {document.revision}
              </Button>

              <Button
                variant="outline"
                className="gap-2 px-6"
                onClick={() => onOpenPdf(document.url, document.nombre)}
              >
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* FORMULARIO ESTÁNDAR: Solo se muestra si NO está en proceso de revisión/rechazo */}
          {showStandardUpdateForm && (
            <DocumentUpdateForm actions={actions} onSuccess={handleClose} />
          )}

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
                className="text-sm font-medium hover:underline"
              >
                Historial de cambios
              </Link>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
