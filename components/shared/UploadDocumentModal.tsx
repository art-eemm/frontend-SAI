"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FileUp, FileText, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { uploadNewDocument } from "@/lib/services/documents";
import { Label } from "../ui/label";
import FileUploadDropzone from "./FileUploadDropzone";

interface UploadDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
}

export default function UploadDocumentModal({
  isOpen,
  onClose,
  category,
}: UploadDocumentModalProps) {
  const router = useRouter();
  const [procedencia, setProcedencia] = useState("");
  const [titulo, setTitulo] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [expYears, setExpYears] = useState("0");
  const [expMonths, setExpMonths] = useState("0");
  const [version, setVersion] = useState("0");

  const handleClose = () => {
    setProcedencia("");
    setTitulo("");
    setFile(null);
    setExpYears("0");
    setExpMonths("0");
    setVersion("0");
    onClose();
  };

  const handleUpload = async () => {
    if (!titulo || !procedencia || !file) {
      toast.error(
        "Por favor completa los campos obligatorios y selecciona un archivo",
      );
      return;
    }

    setIsUploading(true);
    const toastId = toast.loading("Subiendo documento...");

    try {
      const formData = new FormData();
      formData.append("title", titulo);
      formData.append("category", category);
      formData.append("origin_code", procedencia.toUpperCase());
      formData.append("pdffile", file);
      formData.append("expiration_years", expYears);
      formData.append("expiration_months", expMonths);
      formData.append("rev", version);

      await uploadNewDocument(formData);

      toast.success("Documento subido exitosamente", {
        id: toastId,
      });

      router.refresh();
      handleClose();
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Hubo un problema al subir el archivo";

      toast.error(errorMessage, {
        id: toastId,
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-150 bg-background border-border p-0 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <DialogHeader className="p-5 border-b bg-accent/30 shrink-0">
          <DialogTitle className="text-base font-semibold text-foreground">
            Agregar nuevo documento
          </DialogTitle>
          <DialogDescription className="text-xs">
            Ingresa los datos del archivo para registrarlo en el sistema
          </DialogDescription>
        </DialogHeader>

        {/* Form */}
        <div className="p-5 space-y-5 overflow-y-auto flex-1 no-scrollbar">
          <div className="space-y-2">
            <FileUploadDropzone selectedFile={file} onFileSelect={setFile} />
          </div>

          <div className=" pt-5 space-y-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="titulo"
                className="text-xs font-semibold text-muted-foreground"
              >
                Nombre <span className="text-red-500">*</span>
              </Label>
              <Input
                id="titulo"
                placeholder="Nombre del documento"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="bg-background"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="procedencia"
                  className="text-xs font-semibold text-muted-foreground"
                >
                  Procedencia <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="procedencia"
                  placeholder="Ej. SAI-MP-001"
                  value={procedencia}
                  onChange={(e) => setProcedencia(e.target.value.toUpperCase())}
                  className="bg-background uppercase"
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="procedencia"
                  className="text-xs font-semibold text-muted-foreground"
                >
                  Versión <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="version"
                  placeholder="Ej. 1"
                  min={"0"}
                  step={0.1}
                  value={version}
                  onChange={(e) => setVersion(e.target.value)}
                  className="bg-background"
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="categoria"
                  className="text-xs font-semibold text-muted-foreground"
                >
                  Categoría
                </Label>
                <Input
                  id="categoria"
                  value={category}
                  disabled
                  className="bg-accent/50 text-muted-foreground cursor-not-allowed capitalize font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 rounded-md">
              <div className="col-span-2 grid grid-cols-2 gap-2">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground">
                    Vigencia (Años)
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    placeholder="AA"
                    value={expYears}
                    onChange={(e) => setExpYears(e.target.value)}
                    className="bg-background h-9"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-muted-foreground">
                    Vigencia (Meses)
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    max="11"
                    placeholder="MM"
                    value={expMonths}
                    onChange={(e) => setExpMonths(e.target.value)}
                    className="bg-background h-9"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t bg-accent/30 flex justify-end gap-2 shrink-0">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isUploading}
            size="sm"
            className="text-foreground"
          >
            Cancelar
          </Button>
          <Button
            className="bg-brand-green text-gray-900 hover:bg-brand-green/90"
            onClick={handleUpload}
            size="sm"
            disabled={!titulo || !procedencia || !file || isUploading}
          >
            {isUploading ? "Subiendo..." : "Subir documento"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
