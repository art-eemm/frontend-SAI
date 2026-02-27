import { CustomBreadcrumbs } from "@/components/shared/CustomBreadcrumbs";
import OptionGrid from "@/components/shared/OptionGrid";
import DocumentTable, { DocItem } from "@/components/shared/DocumentTable";
import { APP_CONFIG } from "@/lib/constants";
import { getFormattedName } from "@/lib/utils";
import { ApiDocument, ApiDocumentDetail } from "@/lib/types";

async function fetchDocumentsForCategory(category: string): Promise<DocItem[]> {
  try {
    const res = await fetch("http://localhost:4000/api/documents", {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Error al obtener documentos");
    const allDocs: ApiDocument[] = await res.json();

    const filteredDocs = allDocs.filter(
      (doc: ApiDocument) =>
        doc.category.toLowerCase() === category.toLowerCase(),
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

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ module: string; category: string }>;
}) {
  const { module, category } = await params;
  const currentModuleConfig = APP_CONFIG[module.toLowerCase()];
  const pageTitle = getFormattedName(category);
  let categoryDepartments: { title: string; description: string }[] = [];

  if (!currentModuleConfig) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-10 text-center">
        <h1 className="text-2xl font-bold">Módulo no encontrado</h1>
        <p className="text-gray-500 mt-2">
          El módulo {module} no está configurado.
        </p>
      </main>
    );
  }

  if (!currentModuleConfig) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-10 text-center">
        <h1 className="text-2xl font-bold">Módulo no encontrado</h1>
        <p className="text-gray-500 mt-2">
          El módulo {module} no está configurado.
        </p>
      </main>
    );
  }

  if (Array.isArray(currentModuleConfig.departments)) {
    categoryDepartments = currentModuleConfig.departments;
  } else if (currentModuleConfig.departments) {
    categoryDepartments =
      currentModuleConfig.departments[category.toLowerCase()] || [];
  }

  if (currentModuleConfig.directCategories.includes(category.toLowerCase())) {
    const tableData = await fetchDocumentsForCategory(category);

    return (
      <main className="max-w-7xl mx-auto px-4 py-10">
        <CustomBreadcrumbs />
        <DocumentTable title={pageTitle} data={tableData} />
      </main>
    );
  }

  const optionsWithLinks = categoryDepartments.map((dept) => ({
    ...dept,
    href: `/${module}/${category}/${dept.title.toLowerCase().replace(/\s+/g, "-")}`,
  }));

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <CustomBreadcrumbs />
      <h1 className="text-2xl font-bold mb-8 capitalize">
        {category.replace(/-/g, " ")}
      </h1>
      <OptionGrid options={optionsWithLinks} />
    </main>
  );
}
