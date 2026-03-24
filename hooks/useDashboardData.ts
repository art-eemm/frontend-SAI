import { useState, useEffect } from "react";
import {
  ApiDocument,
  DashboardKpis,
  User,
  RecentActivityItem,
} from "@/lib/types";

export const useDashboardData = () => {
  const [documents, setDocuments] = useState<ApiDocument[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [kpis, setKpis] = useState<DashboardKpis>({
    total: 0,
    recents: 0,
    myUploads: 0,
    expired: 0,
  });

  const [recentActivity, setRecentActivity] = useState<RecentActivityItem[]>(
    [],
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userStorage = localStorage.getItem("sai_user");
        const currentUserStorage = userStorage ? JSON.parse(userStorage) : null;

        if (currentUserStorage) {
          setCurrentUser(currentUserStorage);
        }

        const response = await fetch("http://localhost:4000/api/documents");
        if (!response.ok) throw new Error("Error en la petición");

        const fetchedDocuments: ApiDocument[] = await response.json();

        setDocuments(fetchedDocuments);
        // KPIs
        const total = fetchedDocuments.length;
        const haceUnaSemana = new Date();
        haceUnaSemana.setDate(haceUnaSemana.getDate() - 7);

        const recents = fetchedDocuments.filter((doc: ApiDocument) => {
          if (!doc.created_at) return false;
          const docDate = new Date(doc.created_at);
          return docDate >= haceUnaSemana;
        }).length;

        const expired = fetchedDocuments.filter((doc: ApiDocument) => {
          const estado = doc.status;
          return estado && estado.toLowerCase() === "vencido";
        }).length;

        let myUploads = 0;
        if (currentUserStorage) {
          myUploads = fetchedDocuments.filter((doc: ApiDocument) => {
            return doc.uploaded_by === currentUserStorage.name;
          }).length;
        }

        setKpis((prev) => ({
          ...prev,
          total: total,
          recents: recents,
          expired: expired,
          myUploads: myUploads,
        }));

        // Actividad reciente
        const sortedDocs = [...fetchedDocuments].sort(
          (a: ApiDocument, b: ApiDocument) => {
            const dateA = new Date(a.created_at).getTime();
            const dateB = new Date(b.created_at).getTime();
            return dateB - dateA;
          },
        );

        const last7Docs = sortedDocs.slice(0, 7);

        const docsWithRevisionPromises = last7Docs.map(
          async (doc: ApiDocument, index: number) => {
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
                    const maxRevision = Math.max(
                      ...detailData.versions.map(
                        (v: { revision_number: number }) => v.revision_number,
                      ),
                    );
                    currentRevision = maxRevision;
                  }
                }
              } catch (error) {
                console.error(
                  `Error al obtener detalle del documento ${docId}:`,
                  error,
                );
              }
            }

            const dateObj = new Date(doc.created_at);
            const formattedDate = !isNaN(dateObj.getTime())
              ? dateObj.toLocaleDateString("es-Mx", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              : "Sin fecha";

            return {
              id: doc.id,
              proc: doc.origin_code,
              name: doc.title,
              date: formattedDate,
              rev: currentRevision.toString(),
              user: doc.uploaded_by,
              status: doc.status,
            };
          },
        );

        const latestDocs = await Promise.all(docsWithRevisionPromises);

        setRecentActivity(latestDocs);
      } catch (error) {
        console.error("Error al cargar los documentos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { kpis, recentActivity, loading, currentUser, documents };
};
