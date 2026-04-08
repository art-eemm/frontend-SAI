"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Download, FileText, AlertCircle } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface DocumentViewerProps {
  isOpen: boolean;
  onClose: () => void;
  documentUrl: string | null;
  documentName: string;
}

export function DocumentViewer({
  isOpen,
  onClose,
  documentUrl,
  documentName,
}: DocumentViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  if (!documentUrl) return null;

  const isPdf =
    documentUrl.toLowerCase().includes("pdf") ||
    documentName.toLowerCase().includes("pdf");

  const handleDownload = async () => {
    try {
      const response = await fetch(documentUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = documentName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      const link = document.createElement("a");
      link.href = documentUrl;
      link.download = documentName;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[100vw] lg:max-w-[75vw] w-full h-screen md:h-[95vh] flex flex-col">
        <DialogHeader className="flex flex-row items-center justify-between pr-8">
          <DialogTitle>{documentName}</DialogTitle>
          {/* {isPdf && (
            <Button
              variant={"outline"}
              size={"sm"}
              onClick={handleDownload}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Descargar original
            </Button>
          )} */}
        </DialogHeader>

        <div
          className="flex-1 w-full overflow-y-auto bg-slate-100 dark:bg-gray-900 rounded-md py-6 px-2 flex justify-center custom-scrollbar"
          onContextMenu={(e) => e.preventDefault()}
        >
          {isPdf ? (
            <Document
              file={documentUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={
                <div className="flex items-center justify-center h-full text-muted-foreground font-medium">
                  Cargando documento, por favor espera...
                </div>
              }
              className="flex flex-col items-center gap-6"
            >
              {Array.from(new Array(numPages), (el, index) => (
                <div
                  key={`page_${index + 1}`}
                  className="shadow-lg border border-border"
                >
                  <Page
                    pageNumber={index + 1}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    width={Math.min(window.innerWidth * 0.6, 1000)}
                  />
                </div>
              ))}
            </Document>
          ) : (
            <div className="w-full h-full flex flex-col items-center gap-4 relative">
              <div className="w-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 p-3 rounded-md flex items-start gap-3 text-sm">
                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                <p>
                  Si laprevisualización no carga (muy común si estás probando en{" "}
                  <strong>localhost</strong> o si el archivo es privado), te
                  recomendamos descargarlo directamente.
                </p>
              </div>

              <iframe
                src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
                  documentUrl,
                )}`}
                className="w-full h-full border-0 rounded-md shadow-sm bg-white"
                title={documentName}
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
