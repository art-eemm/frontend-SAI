import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FileUploadDropzone from "@/components/shared/FileUploadDropzone";
import { useDocumentActions } from "@/hooks/useDocumentActions";

interface DocumentUpdateFormProps {
  actions: ReturnType<typeof useDocumentActions>;
  onSuccess: () => void;
}

export function DocumentUpdateForm({
  actions,
  onSuccess,
}: DocumentUpdateFormProps) {
  const handleConfirm = async () => {
    const success = await actions.updateVersion();
    if (success) onSuccess();
  };

  return (
    <div>
      <p className="text-sm font-medium text-foreground mb-3">
        Actualizar documento
      </p>
      <FileUploadDropzone
        selectedFile={actions.updateFile}
        onFileSelect={actions.setUpdateFile}
      />

      {actions.updateFile && (
        <div className="mt-4 p-4 bg-accent/30 rounded-lg border border-border animate-in fade-in slide-in-from-top-2">
          <div className="space-y-4 mb-5">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-foreground">
                Nueva versión
              </label>
              <Input
                type="number"
                min="0"
                step={"0.1"}
                placeholder="Ej. 1.1"
                value={actions.version}
                onChange={(e) => actions.setVersion(e.target.value)}
                className="h-8 bg-background"
              />
            </div>
          </div>
          <p className="text-xs font-semibold text-muted-foreground mb-3">
            Vigencia
          </p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-foreground">
                Años
              </label>
              <Input
                type="number"
                min="0"
                value={actions.expYears}
                onChange={(e) => actions.setExpYears(e.target.value)}
                className="h-8 bg-background"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-foreground">
                Meses
              </label>
              <Input
                type="number"
                min="0"
                max="11"
                value={actions.expMonths}
                onChange={(e) => actions.setExpMonths(e.target.value)}
                className="h-8 bg-background"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer"
              onClick={() => actions.setUpdateFile(null)}
              disabled={actions.isUpdating}
            >
              Cancelar
            </Button>
            <Button
              size="sm"
              className="bg-brand-green text-foreground hover:bg-brand-green/80 cursor-pointer"
              disabled={actions.isUpdating}
              onClick={handleConfirm}
            >
              {actions.isUpdating ? "Subiendo..." : "Confirmar actualización"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
