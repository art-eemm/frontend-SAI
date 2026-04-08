"use client";

import { FileUp, FileText, X } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "../ui/button";

interface FileUploadDropzoneProps {
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
}

export default function FileUploadDropzone({
  onFileSelect,
  selectedFile,
}: FileUploadDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        onFileSelect(e.dataTransfer.files[0]);
      }
    },
    [onFileSelect],
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  if (selectedFile) {
    return (
      <div className="flex items-center gap-3 p-3 border border-border rounded-lg bg-accent/50 animate-in fade-in">
        <div className="p-2 bg-red-100 dark:bg-red-950 rounded-md">
          <FileText className="w-5 h-5 text-red-600 dark:text-red-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p
            className="text-sm font-medium text-foreground truncate"
            title={selectedFile.name}
          >
            {selectedFile.name}
          </p>
          <p className="text-xs text-muted-foreground">
            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
          </p>
        </div>
        <Button
          type="button"
          variant={"ghost"}
          size={"icon"}
          className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full shrink-0"
          onClick={() => onFileSelect(null)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative group border-2 border-dashed rounded-lg h-28 flex flex-col items-center justify-center text-sm transition-colors cursor-pointer overflow-hidden
        ${isDragging ? "border-brand-green bg-brand-green/10" : "border-border hover:border-brand-green/60 hover:bg-brand-green/5"}
      `}
    >
      <input
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        onChange={handleFileInput}
        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
      />

      <FileUp
        className={`w-8 h-8 mb-2 ${isDragging ? "text-brand-green" : "text-muted-foreground group-hover:text-brand-green"}`}
      />
      <p
        className={`font-medium ${isDragging ? "text-brand-green" : "text-muted-foreground group-hover:text-brand-green"}`}
      >
        Elige un archivo o arrástralo aquí
      </p>
      <p className="text-xs text-muted-foreground mt-1">Máximo 10MB</p>
    </div>
  );
}
