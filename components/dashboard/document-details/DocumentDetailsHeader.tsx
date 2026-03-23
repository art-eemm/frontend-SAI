import { SheetHeader } from "@/components/ui/sheet";
import { DocItem } from "@/lib/services/documents";
import { formatDate } from "@/lib/utils";

export function DocumentDetailsHeader({ document }: { document: DocItem }) {
  return (
    <SheetHeader className="px-6 py-4 border-b">
      <div className="flex items-center justify-between mt-6">
        <div>
          <p className="font-semibold text-foreground">{document.nombre}</p>
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
        <span className="text-xs bg-red-500 text-white font-bold px-2 py-0.5 rounded-full uppercase">
          {document.tipo}
        </span>
      </div>
    </SheetHeader>
  );
}
