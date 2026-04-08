import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { DocItem } from "@/lib/services/documents";
import { formatDate } from "@/lib/utils";

const getFileTypeColor = (tipo: string) => {
  const t = tipo?.toLowerCase() || "";
  if (t.includes("pdf")) return "bg-red-500";
  if (t.includes("doc") || t.includes("word")) return "bg-blue-600";
  if (t.includes("xls") || t.includes("excel")) return "bg-green-600";
  if (t.includes("ppt") || t.includes("power")) return "bg-orange-500";
  return "bg-slate-500";
};

export function DocumentDetailsHeader({ document }: { document: DocItem }) {
  return (
    <SheetHeader className="px-6 py-4 border-b">
      <div className="flex items-center justify-between mt-6">
        <div>
          <SheetTitle className="font-semibold text-foreground">
            {document.nombre}
          </SheetTitle>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-foreground">
              Versión:{" "}
              <span className="text-muted-foreground">{document.revision}</span>
            </span>
            <span className="text-xs text-foreground">
              Vigencia:{" "}
              <span className="text-muted-foreground">
                {formatDate(document.fechaVenc)}
              </span>
            </span>
          </div>
        </div>
        <span
          className={`${getFileTypeColor(document.tipo)} text-xs text-white font-bold px-2 py-0.5 rounded-full uppercase`}
        >
          {document.tipo}
        </span>
      </div>
    </SheetHeader>
  );
}
