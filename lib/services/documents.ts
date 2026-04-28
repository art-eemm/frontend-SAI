import { ApiDocument, ApiDocumentDetail } from "../types";

export interface DocVersion {
  revision: string | number;
  fecha: string;
  url: string;
  usuario: string;
}

export interface DocItem {
  id: string;
  procedencia: string;
  nombre: string;
  categoria: string;
  fechaRev: string;
  fechaVenc: string | null;
  revision: string;
  tipo: string;
  estado: string;
  url: string;
  versiones: DocVersion[];
  comentarioRechazo?: string;
}

export async function fetchDocuments(
  category?: string,
  dept?: string,
  isPublicView: boolean = false,
): Promise<DocItem[]> {
  try {
    const res = await fetch("http://localhost:4000/api/documents", {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Error al obtener los documentos");
    const allDocs: ApiDocument[] = await res.json();

    let filteredDocs = allDocs;

    if (isPublicView) {
      filteredDocs = filteredDocs.filter((doc) => doc.status === "VIGENTE");
    }

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

        const mappedVersions: DocVersion[] = (detail.versions || [])
          .map((v) => {
            const cleanUrl = v.file_url?.replace(/\\/g, "/") || "";
            return {
              revision: Number(v.revision_number ?? 0),
              fecha: v.revision_date || doc.created_at,
              url: cleanUrl ? `http://localhost:4000/${cleanUrl}` : "/SAI.pdf",
              usuario: doc.uploaded_by,
            };
          })
          .sort((a, b) => b.revision - a.revision);

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
          categoria: doc.category,
          fechaRev: lastestVersion?.revision_date || doc.created_at,
          fechaVenc: doc.expiration_date,
          revision: `${currentRevisionNumber}`,
          tipo: lastestVersion?.file_type || "PDF",
          estado: doc.status,
          comentarioRechazo: (detail as any).latest_review,
          url: finalUrl,
          versiones: mappedVersions,
        };
      }),
    );

    return enrichedDocs;
  } catch (error) {
    console.error("Error fetching docs:", error);
    return [];
  }
}

export async function uploadNewDocument(formData: FormData): Promise<void> {
  const token = localStorage.getItem("sai_token");

  const res = await fetch("http://localhost:4000/api/documents/upload", {
    method: "POST",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });

  if (!res.ok) {
    const errorText = await res.text();
    let errorMessage = "Error al subir el documento";
    try {
      const errorJson = JSON.parse(errorText);
      errorMessage = errorJson.message || errorJson.error || errorMessage;
      if (Array.isArray(errorJson.message)) {
        errorMessage = errorJson.message.join(", ");
      }
    } catch (e) {}
    throw new Error(errorMessage);
  }
}

export async function compareDocumentVersions(
  documentId: string,
  revA: string,
  revB: string,
) {
  const token = localStorage.getItem("sai_token");

  const res = await fetch(
    `http://localhost:4000/api/documents/${documentId}/compare?revA=${revA}&revB=${revB}`,
    {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    },
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.error || "Error al comparar versiones");
  }

  return res.json();
}

export async function sendDocumentToReview(
  documentId: string,
): Promise<Record<string, unknown>> {
  const token = localStorage.getItem("sai_token");

  const res = await fetch(
    `http://localhost:4000/api/documents/${documentId}/send-to-review`,
    {
      method: "POST",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    },
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.error || "Error al enviar a revisión");
  }
  return res.json();
}

export async function approveDocument(documentId: string) {
  const token = localStorage.getItem("sai_token");
  const res = await fetch(
    `http://localhost:4000/api/documents/${documentId}/approve`,
    {
      method: "POST",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    },
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.error || "Error al aprobar el documento");
  }
  return res.json();
}

export async function rejectDocument(documentId: string, comments: string) {
  const token = localStorage.getItem("sai_token");
  const res = await fetch(
    `http://localhost:4000/api/documents/${documentId}/reject`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ comments }),
    },
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.error || "Error al rechazar el documento");
  }
  return res.json();
}

export async function publishSignedDocument(
  documentId: string,
  formData: FormData,
) {
  const token = localStorage.getItem("sai_token");
  const res = await fetch(
    `http://localhost:4000/api/documents/${documentId}/publish-signed`,
    {
      method: "POST",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    },
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.error || "Error al publicar la versión firmada");
  }
  return res.json();
}
