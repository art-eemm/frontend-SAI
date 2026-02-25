"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[100vw] lg:max-w-[75vw] w-full h-screen md:h-[95vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{documentName}</DialogTitle>
        </DialogHeader>

        <div
          className="flex-1 w-full overflow-y-auto bg-slate-100 rounded-md py-6 px-2 flex justify-center custom-scrollbar"
          onContextMenu={(e) => e.preventDefault()}
        >
          <Document
            file={documentUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex items-center justify-center h-full text-gray-500 font-medium">
                Cargando documento, por favor espera...
              </div>
            }
            className="flex flex-col items-center gap-6"
          >
            {Array.from(new Array(numPages), (el, index) => (
              <div
                key={`page_${index + 1}`}
                className="shadow-lg border border-gray-200"
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
