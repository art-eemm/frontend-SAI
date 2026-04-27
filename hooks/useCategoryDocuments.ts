import { useEffect, useState } from "react";
import { DocItem, fetchDocuments } from "@/lib/services/documents";

export const useCategoryDocuments = (categorySlug: string) => {
  const [documents, setDocuments] = useState<DocItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const userStorage = localStorage.getItem("sai_user");
        const currentUser = userStorage ? JSON.parse(userStorage) : null;

        const rawRole = currentUser?.role || currentUser?.rol || "USUARIO";
        const role = rawRole.trim().toUpperCase();

        setUserRole(role);

        const userDept = (currentUser?.code || currentUser?.departamento || "")
          .trim()
          .toUpperCase();

        const isAdmin = role.includes("ADMIN");
        const isResponsable = role.includes("RESPONSABLE");

        const allDocs = await fetchDocuments();

        let filteredDocs = allDocs.filter((doc) => {
          const docCategory = (doc.categoria || doc.tipo || "")
            .trim()
            .toLowerCase();
          const targetCategory = categorySlug.trim().toLowerCase();
          return (
            docCategory.includes(targetCategory) ||
            targetCategory.includes(docCategory)
          );
        });

        if (!isAdmin && isResponsable && userDept !== "") {
          filteredDocs = filteredDocs.filter((doc) => {
            const docDept = (doc.procedencia || "").trim().toUpperCase();
            return docDept.includes(userDept);
          });
        }

        setDocuments(filteredDocs);
      } catch (error) {
        console.error("Error cargando documentos de la categoría:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [categorySlug]);

  return { documents, loading, userRole };
};
