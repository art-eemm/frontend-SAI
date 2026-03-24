import { Download, Eye } from "lucide-react";
import { DocVersion } from "@/lib/services/documents";
import { formatDate } from "@/lib/utils";

interface DocumentVersionHistoryProps {
  versiones: DocVersion[];
  onDownload: (url: string, revision: number) => void;
  onOpenPdf: (url: string) => void;
}

export function DocumentVersionHistory({
  versiones,
  onDownload,
  onOpenPdf,
}: DocumentVersionHistoryProps) {
  return (
    <div>
      <p className="text-sm font-medium text-foreground mb-3">Versiones</p>
      <div className="text-xs text-muted-foreground grid grid-cols-4 px-2 mb-2">
        <span>Versión</span>
        <span>Fecha</span>
        <span>Usuario</span>
        <span className="text-right">Acciones</span>
      </div>

      <div className="space-y-2 overflow-y-auto pr-1">
        {versiones && versiones.length > 0 ? (
          versiones.map((ver, i) => (
            <div
              key={i}
              className="grid grid-cols-4 items-center text-xs px-2 py-2 rounded hover:bg-accent transition-colors"
            >
              <span>{ver.revision}</span>
              <span>{formatDate(ver.fecha)}</span>
              <span className="truncate pr-2" title={ver.usuario}>
                {ver.usuario}
              </span>
              <div className="flex justify-end gap-2">
                <Download
                  className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-foreground"
                  onClick={() => onDownload(ver.url, ver.revision)}
                />
                <Eye
                  className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-foreground"
                  onClick={() => onOpenPdf(ver.url)}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-xs py-4 text-muted-foreground border border-dashed rounded-lg">
            No hay historial de versiones para este documento.
          </div>
        )}
      </div>
    </div>
  );
}
