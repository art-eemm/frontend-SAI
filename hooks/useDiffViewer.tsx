import { useState, useEffect } from "react";
import { compareDocumentVersions } from "@/lib/services/documents";
import { toast } from "sonner";
import { useHeader } from "@/lib/contexts/HeaderContext";
import { formatDate } from "@/lib/utils";
import { CompareResponse } from "@/lib/types";

interface VersionItem {
  revision_number?: string | number;
  revision?: string | number;
}

export function useDiffViewer(documentId: string) {
  const [availableVersions, setAvailableVersions] = useState<string[]>([]);
  const [revA, setRevA] = useState<string>("");
  const [revB, setRevB] = useState<string>("");
  const [data, setData] = useState<CompareResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setHeaderState, resetHeader } = useHeader();

  // Cargar versiones
  useEffect(() => {
    if (!documentId) return;

    const fetchVersions = async () => {
      try {
        const token = localStorage.getItem("sai_token");
        const res = await fetch(
          `http://localhost:4000/api/documents/${documentId}`,
          {
            headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
          },
        );

        if (!res.ok) return;

        const docData = await res.json();

        const versionsArray: VersionItem[] =
          docData.versions ||
          (docData.document && docData.document.versions) ||
          [];

        if (versionsArray.length > 0) {
          const revs = versionsArray
            .map((v) =>
              v.revision_number !== undefined ? v.revision_number : v.revision,
            )
            .filter((v) => v !== null && v !== undefined)
            .map(String)
            .sort((a: string, b: string) => parseFloat(a) - parseFloat(b));

          const uniqueRevs = Array.from(new Set<string>(revs));
          setAvailableVersions(uniqueRevs);

          if (uniqueRevs.length >= 2) {
            setRevA(uniqueRevs[uniqueRevs.length - 2]);
            setRevB(uniqueRevs[uniqueRevs.length - 1]);
          } else if (uniqueRevs.length === 1) {
            setRevA(uniqueRevs[0]);
            setRevB(uniqueRevs[0]);
          }
        }
      } catch (error) {
        console.error("Error al cargar versiones:", error);
      }
    };

    fetchVersions();
  }, [documentId]);

  useEffect(() => {
    let isMounted = true;

    const loadComparison = async () => {
      if (!revA || !revB) return;

      if (revA === revB) {
        setData(null);
        return;
      }

      try {
        if (isMounted) setIsLoading(true);
        const result: CompareResponse = await compareDocumentVersions(
          documentId,
          revA,
          revB,
        );
        if (isMounted) setData(result);
      } catch (error: any) {
        toast.error(error.message || "Error al comparar versiones");
        if (isMounted) setData(null);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadComparison();

    return () => {
      isMounted = false;
    };
  }, [revA, revB, documentId]);

  useEffect(() => {
    if (data) {
      setHeaderState({
        title: (
          <div className="flex items-center">
            {data.document.title}
            <span className="text-[10px] font-bold bg-red-500 text-white px-2 py-0.5 rounded-full uppercase tracking-wider ml-2">
              PDF
            </span>
          </div>
        ),
        subtitle: (
          <div className="flex items-center flex-wrap gap-2 text-xs mt-1">
            <span>
              Modificado: {formatDate(data.comparison.revB.uploadedAt)}
            </span>
            <span className="text-muted-foreground/70">|</span>
            <span className="text-red-500 bg-red-50 px-1.5 py-0.5 rounded font-medium">
              -{data.stats.removedChars} caracteres
            </span>
            <span className="text-green-600 bg-green-50 px-1.5 py-0.5 rounded font-medium">
              +{data.stats.addedChars} caracteres
            </span>
            <span className="text-muted-foreground/70">|</span>
            <span className="text-blue-600 font-medium">
              {data.stats.changePercent}% de cambio
            </span>
          </div>
        ),
      });
    } else {
      setHeaderState({
        title: "Visualizador de Cambios",
        subtitle: "Selecciona versiones a comparar",
      });
    }
    return () => resetHeader();
  }, [data]);

  return { availableVersions, revA, setRevA, revB, setRevB, data, isLoading };
}
