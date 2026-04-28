import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  approveDocument,
  publishSignedDocument,
  rejectDocument,
  sendDocumentToReview,
} from "@/lib/services/documents";

export function useDocumentActions(documentId: string | undefined) {
  const router = useRouter();
  const [updateFile, setUpdateFile] = useState<File | null>(null);
  const [signedFile, setSignedFile] = useState<File | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [expYears, setExpYears] = useState("0");
  const [expMonths, setExpMonths] = useState("0");
  const [version, setVersion] = useState("0");

  const resetForm = () => {
    setUpdateFile(null);
    setSignedFile(null);
    setExpYears("0");
    setExpMonths("0");
    setVersion("0");
  };

  const downloadVersion = async (
    fileUrl: string,
    fileName: string,
    revision: string | number,
    extension: string,
  ) => {
    if (!fileUrl) return;
    try {
      const response = await fetch(fileUrl);
      if (!response.ok) throw new Error("Error al obtener el archivo");

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = window.document.createElement("a");
      link.href = downloadUrl;

      const safeName = fileName.replace(/[^a-zA-Z0-9-]/g, "_");
      const safeExtension = extension.toLowerCase() === "pdf" ? "pdf" : "doc";
      link.download = `${safeName}_V${revision}.${safeExtension}`;

      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Fallo la descarga silenciosa:", error);
      window.open(fileUrl, "_blank");
    }
  };

  const handleAction = async (
    actionFn: () => Promise<unknown>,
    successMsg: string,
  ) => {
    setIsUpdating(true);
    const toastId = toast.loading("Procesando...");
    try {
      await actionFn();
      toast.success(successMsg, { id: toastId });
      router.refresh();
      return true;
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Ocurrió un error";
      toast.error(msg, { id: toastId });
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSendToReview = async () => {
    if (!documentId) return;
    return handleAction(
      () => sendDocumentToReview(documentId),
      "Enviando a revisión correctamente",
    );
  };

  const handleUploadCorrection = async () => {
    if (!updateFile || !documentId) return false;

    const formData = new FormData();
    formData.append("pdffile", updateFile);
    formData.append("rev", version);

    setIsUpdating(true);
    const toastId = toast.loading(
      "Subiendo corrección y notificando al SAI...",
    );

    try {
      const token = localStorage.getItem("sai_token");
      const res = await fetch(
        `http://localhost:4000/api/documents/${documentId}/version`,
        {
          method: "POST",
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: formData,
        },
      );

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error || "Error al subir la corrección");
      }

      toast.success("¡Corrección enviada a revisión con éxito!", {
        id: toastId,
      });
      setUpdateFile(null);
      router.refresh();
      return true;
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Error desconocido";
      toast.error(msg, { id: toastId });
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  const hanldeApprove = async () => {
    if (!documentId) return;
    return handleAction(
      () => approveDocument(documentId),
      "Documento aprovado para firma",
    );
  };

  const handleReject = async (comments: string) => {
    if (!documentId || !comments) return;
    return handleAction(
      () => rejectDocument(documentId, comments),
      "Documento rechazado. Se notificó al responsable.",
    );
  };

  const handlePublishSigned = async () => {
    if (!signedFile || !documentId) return false;

    const formData = new FormData();
    formData.append("pdffile", signedFile);
    formData.append("rev", version);

    setIsUpdating(true);
    const toastId = toast.loading("Publicando versión firmada...");
    try {
      await publishSignedDocument(documentId, formData);
      toast.success("Documento vigente y publicado", { id: toastId });
      resetForm();
      router.refresh();
      return true;
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Error al publicar";
      toast.error(msg, { id: toastId });
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  const updateVersion = async () => {
    if (!updateFile || !documentId) return false;

    setIsUpdating(true);
    const toastId = toast.loading("Subiendo nueva versión...");

    try {
      const formData = new FormData();
      formData.append("pdffile", updateFile);
      formData.append("document_id", documentId);
      formData.append("expiration_years", expYears);
      formData.append("expiration_months", expMonths);
      formData.append("rev", version);

      const token = localStorage.getItem("sai_token");

      const res = await fetch(
        `http://localhost:4000/api/documents/${documentId}/version`,
        {
          method: "POST",
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: formData,
        },
      );

      if (!res.ok) {
        const errorText = await res.text();
        let errorMessage = "Error al subir la nueva versión";
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.message || errorJson.error || errorMessage;
          if (Array.isArray(errorJson.message))
            errorMessage = errorJson.message.join(", ");
        } catch (e) {}
        throw new Error(errorMessage);
      }

      toast.success("Nueva versión subida correctamente", { id: toastId });
      resetForm();
      router.refresh();
      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Hubo un problema al subir el archivo";

      toast.error(errorMessage, {
        id: "update-error",
      });
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    updateFile,
    setUpdateFile,
    signedFile,
    setSignedFile,
    isUpdating,
    expYears,
    setExpYears,
    expMonths,
    setExpMonths,
    resetForm,
    downloadVersion,
    updateVersion,
    version,
    setVersion,
    handleSendToReview,
    handleUploadCorrection,
    hanldeApprove,
    handleReject,
    handlePublishSigned,
  };
}
