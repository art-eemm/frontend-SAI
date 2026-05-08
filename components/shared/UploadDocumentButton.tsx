"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import UploadDocumentModal from "./UploadDocumentModal";

interface UploadDocumentButtonProps {
  category: string;
  onSuccess?: () => void;
}

export default function UploadDocumentButton({
  category,
  onSuccess,
}: UploadDocumentButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-brand-green text-foreground hover:bg-brand-green/80 flex items-center gap-2 cursor-pointer"
      >
        <Plus className="h-4 w-4" />
        Nuevo documento
      </Button>

      <UploadDocumentModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        category={category}
        onSuccess={onSuccess}
      />
    </>
  );
}
