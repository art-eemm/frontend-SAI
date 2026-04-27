import { useEffect, useState } from "react";
import {
  ApiDocument,
  DashboardKpis,
  User,
  RecentActivityItem,
} from "@/lib/types";

export const useResponsableData = () => {
  const [documents, setDocuments] = useState<ApiDocument[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [departmentPrefix, setDepartmentPrefix] = useState<string>("Área");

  const [kpis, setKpis] = useState<DashboardKpis>({
    total: 0,
    recents: 0,
    myUploads: 0,
    expired: 0,
  });

  const [recentDocs, setRecentDocs] = useState<RecentActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userStorage = localStorage.getItem("sai_user");
        const currentUserStorage = userStorage ? JSON.parse(userStorage) : null;

        let deptPrefix = "";

        if (currentUserStorage) {
          setCurrentUser(currentUserStorage);
          deptPrefix = currentUserStorage.code || "N/A";
          setDepartmentPrefix(deptPrefix);
        }

        const response = await fetch("http://localhost:4000/api/documents");
        if (!response.ok) throw new Error("Error en la petición");

        const allDocuments: ApiDocument[] = await response.json();

        const deptDocuments = allDocuments.filter(
          (doc) =>
            doc.origin_code &&
            doc.origin_code.toUpperCase().includes(deptPrefix.toUpperCase()),
        );

        setDocuments(deptDocuments);

        const totalDocs = deptDocuments.length;

        const actualizados = deptDocuments.filter(
          (doc) => doc.status && doc.status.toLowerCase() === "vigente",
        ).length;

        const vencidos = deptDocuments.filter(
          (doc) => doc.status && doc.status.toLowerCase() === "vencido",
        ).length;

        // Corregir el estado de los archivos
        setKpis({
          total: totalDocs,
          recents: actualizados,
          expired: vencidos,
          myUploads: vencidos,
        });

        const sortedDocs = [...deptDocuments].sort(
          (a: ApiDocument, b: ApiDocument) => {
            const dateA = new Date(a.created_at).getTime();
            const dateB = new Date(b.created_at).getTime();
            return dateB - dateA;
          },
        );

        const top10Docs = sortedDocs.slice(0, 10);

        const docsWithRevisionPromises = top10Docs.map(
          async (doc: ApiDocument) => {
            const docId = doc.id;
            let currentRevision = 1;

            if (docId) {
              try {
                const detailRes = await fetch(
                  `http://localhost:4000/api/documents/${docId}`,
                );

                if (detailRes.ok) {
                  const detailData = await detailRes.json();
                  if (detailData.versions && detailData.versions.length > 0) {
                    currentRevision = Math.max(
                      ...detailData.versions.map(
                        (v: { revision_number: number }) => v.revision_number,
                      ),
                    );
                  }
                }
              } catch (error) {
                console.error(`Error detalle doc ${docId}:`, error);
              }
            }

            const dateObj = new Date(doc.created_at);
            const formattedDate = !isNaN(dateObj.getTime())
              ? dateObj
                  .toLocaleDateString("es-Mx", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                  .toUpperCase()
              : "Sin fecha";

            return {
              id: doc.id,
              proc: doc.origin_code,
              name: doc.title,
              date: formattedDate,
              rev: currentRevision.toString(),
              user: doc.uploaded_by || currentUserStorage?.name || "N/A",
              status: doc.status || "Vigente",
            };
          },
        );

        const latestDocs = await Promise.all(docsWithRevisionPromises);
        setRecentDocs(latestDocs);
      } catch (error) {
        console.error("Error al cargar los documentos del área:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { kpis, recentDocs, loading, currentUser, departmentPrefix };
};
