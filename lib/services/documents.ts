import { ApiDocument, ApiDocumentDetail } from "../types";

export interface DocItem {
  id: string;
  procedencia: string;
  nombre: string;
  fechaRev: string;
  fechaVenc: string | null;
  revision: string;
  tipo: string;
  estado: string;
  url: string;
}

export async function fetchDocuments(
  category?: string,
  dept?: string,
): Promise<DocItem[]> {
  try {
    const res = await fetch("http://localhost:4000/api/documents", {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Error al obtener los documentos");
    const allDocs: ApiDocument[] = await res.json();

    let filteredDocs = allDocs;

    if (category) {
      filteredDocs = filteredDocs.filter(
        (doc) => doc.category?.toLowerCase() === category.toLowerCase(),
      );
    }

    if (dept) {
      filteredDocs = filteredDocs.filter((doc) =>
        doc.origin_code?.toLowerCase().includes(dept.toLowerCase()),
      );
    }

    const enrichedDocs = await Promise.all(
      filteredDocs.map(async (doc: ApiDocument) => {
        const detailRes = await fetch(
          `http://localhost:4000/api/documents/${doc.id}`,
        );
        const detail: ApiDocumentDetail = await detailRes.json();

        const lastestVersion = detail.versions?.[0];
        const cleanFileUrl = lastestVersion?.file_url?.replace(/\\/g, "/");
        const finalUrl = cleanFileUrl
          ? `http://localhost:4000/${cleanFileUrl}`
          : "/SAI.pdf";

        const currentRevisionNumber = lastestVersion?.revision_number ?? 0;

        return {
          id: doc.id,
          procedencia: doc.origin_code,
          nombre: doc.title,
          fechaRev: lastestVersion?.revision_date || doc.created_at,
          fechaVenc: doc.expiration_date,
          revision: `${currentRevisionNumber}`,
          tipo: lastestVersion?.file_type || "PDF",
          estado: doc.status,
          url: finalUrl,
        };
      }),
    );

    return enrichedDocs;
  } catch (error) {
    console.error("Error fetching docs:", error);
    return [];
  }
}
