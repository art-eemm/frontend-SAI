import { CustomBreadcrumbs } from "@/components/shared/CustomBreadcrumbs";
import DocumentTable, { DocItem } from "@/components/shared/DocumentTable";
import { APP_CONFIG } from "@/lib/constants";
import { ApiDocument, ApiDocumentDetail, DepartmentItem } from "@/lib/types";

async function fetchDocumentsForTable(
  category: string,
  dept: string,
): Promise<DocItem[]> {
  try {
    const res = await fetch("http://localhost:4000/api/documents", {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Error al obtener documentos");
    const allDocs: ApiDocument[] = await res.json();

    const filteredDocs = allDocs.filter(
      (doc: ApiDocument) =>
        doc.category?.toLowerCase() === category?.toLowerCase() &&
        doc.origin_code?.toLowerCase().includes(dept?.toLowerCase()),
    );

    const enrichedDocs = await Promise.all(
      filteredDocs.map(async (doc: ApiDocument) => {
        const detailRes = await fetch(
          `http://localhost:4000/api/documents/${doc.id}`,
        );
        const detail: ApiDocumentDetail = await detailRes.json();

        const latestVersion = detail.versions?.[0];

        const cleanFileUrl = latestVersion?.file_url?.replace(/\\/g, "/");
        const finalUrl = cleanFileUrl
          ? `http://localhost:4000/${cleanFileUrl}`
          : "/SAI.pdf";

        const currentRevisionNumber = latestVersion?.revision_number ?? -1;
        const nextRevision = currentRevisionNumber + 1;

        return {
          id: doc.id,
          procedencia: doc.origin_code || "N/A",
          nombre: doc.title || "Sin título",
          fechaRev: latestVersion?.revision_date || doc.created_at,
          revision: `${nextRevision}`,
          tipo: latestVersion?.file_type || "PDF",
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

export default async function DepartmentPage({
  params,
}: {
  params: Promise<{ module: string; category: string; dept: string }>;
}) {
  const { module, category, dept } = await params;

  const tableData = await fetchDocumentsForTable(category, dept);

  const currentModuleConfig = APP_CONFIG[module.toLowerCase()];
  let departmentFullName = dept.toUpperCase();

  if (currentModuleConfig) {
    let categoryDepartments: DepartmentItem[] = [];

    if (Array.isArray(currentModuleConfig.departments)) {
      categoryDepartments = currentModuleConfig.departments;
    } else if (currentModuleConfig.departments) {
      categoryDepartments =
        currentModuleConfig.departments[category.toLowerCase()] || [];
    }

    const foundDept = categoryDepartments.find(
      (d) => d.title.toLowerCase() === dept.toLowerCase(),
    );

    if (foundDept) {
      departmentFullName = foundDept.description;
    }
  }

  const pageTitle = `${departmentFullName}`;

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <CustomBreadcrumbs />
      <DocumentTable title={pageTitle} data={tableData} />
    </main>
  );
}
