"use client";

import { use, useRef } from "react";
import { ArrowLeft, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useDiffViewer } from "@/hooks/useDiffViewer";
import { DiffPart } from "@/lib/types";

const DiffPanel = ({
  parts,
  hideType,
  panelRef,
  onScroll,
}: {
  parts: DiffPart[];
  hideType: "added" | "removed";
  panelRef?: React.RefObject<HTMLDivElement | null>;
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
}) => (
  <div
    ref={panelRef}
    onScroll={onScroll}
    className="bg-background border rounded-lg p-5 text-xs text-foreground leading-relaxed font-mono whitespace-pre-wrap wrap-break-word overflow-y-auto h-full shadow-inner no-scrollbar"
  >
    {parts.map((part, index) => {
      if (part.type === hideType) return null;

      if (part.type === "removed") {
        return (
          <span
            key={index}
            className="bg-red-100 text-red-800 px-1 py-0.5 rounded line-through opacity-80"
          >
            {part.value}
          </span>
        );
      }
      if (part.type === "added") {
        return (
          <span
            key={index}
            className="bg-green-100 text-green-800 px-1 py-0.5 rounded font-medium"
          >
            {part.value}
          </span>
        );
      }
      return <span key={index}>{part.value}</span>;
    })}
  </div>
);

export default function DiffViewer({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: documentId } = use(params);
  const router = useRouter();

  const { availableVersions, revA, setRevA, revB, setRevB, data, isLoading } =
    useDiffViewer(documentId);

  const leftPanelRef = useRef<HTMLDivElement | null>(null);
  const rightPanelRef = useRef<HTMLDivElement | null>(null);

  const isSyncingLeft = useRef(false);
  const isSyncingRight = useRef(false);

  const handleLeftScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (isSyncingLeft.current) {
      isSyncingLeft.current = false;
      return;
    }
    isSyncingRight.current = true;
    if (rightPanelRef.current) {
      rightPanelRef.current.scrollTop = e.currentTarget.scrollTop;
      rightPanelRef.current.scrollLeft = e.currentTarget.scrollLeft;
    }
  };

  const handleRightScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (isSyncingRight.current) {
      isSyncingRight.current = false;
      return;
    }
    isSyncingLeft.current = true;
    if (leftPanelRef.current) {
      leftPanelRef.current.scrollTop = e.currentTarget.scrollTop;
      leftPanelRef.current.scrollLeft = e.currentTarget.scrollLeft;
    }
  };

  return (
    <div className="w-full h-[calc(100vh-195px)] flex flex-col">
      <div className="mb-4">
        <button
          onClick={() => router.back()}
          className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors w-max cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Regresar
        </button>
      </div>

      <div className="bg-accent rounded-xl shadow-sm border p-4 w-full flex flex-col flex-1 h-full">
        <div className="flex gap-4 mb-4 shrink-0">
          {!revA || !revB ? (
            <>
              <Select disabled>
                <SelectTrigger className="w-40 text-xs bg-background/50">
                  <SelectValue placeholder="Cargando..." />
                </SelectTrigger>
              </Select>

              <Select disabled>
                <SelectTrigger className="w-40 text-xs bg-background/50">
                  <SelectValue placeholder="Cargando..." />
                </SelectTrigger>
              </Select>
            </>
          ) : (
            <>
              <Select value={revA} onValueChange={setRevA}>
                <SelectTrigger className="w-40 text-xs bg-background/50">
                  <SelectValue placeholder="Revisión Original" />
                </SelectTrigger>
                <SelectContent>
                  {availableVersions.map((v) => (
                    <SelectItem key={`A-${v}`} value={v}>
                      Versión {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={revB} onValueChange={setRevB}>
                <SelectTrigger className="w-40 text-xs bg-background/50">
                  <SelectValue placeholder="Revisión Nueva" />
                </SelectTrigger>
                <SelectContent>
                  {availableVersions.map((v) => (
                    <SelectItem key={`B-${v}`} value={v}>
                      Versión {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          )}
        </div>

        <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-2 gap-4">
          {isLoading ? (
            <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center text-muted-foreground bg-accent border rounded-lg h-full">
              <Loader2 className="w-8 h-8 animate-spin mb-2" />
              <p className="text-sm">Analizando diferencias...</p>
            </div>
          ) : !data ? (
            <div className="col-span-1 md:col-span-2 flex items-center justify-center text-sm text-muted-foreground bg-accent border rounded-lg h-full">
              Selecciona dos versiones distintas para comparar.
            </div>
          ) : (
            <>
              <DiffPanel
                parts={data.inline}
                hideType="added"
                panelRef={leftPanelRef}
                onScroll={handleLeftScroll}
              />
              <DiffPanel
                parts={data.inline}
                hideType="removed"
                panelRef={rightPanelRef}
                onScroll={handleRightScroll}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
