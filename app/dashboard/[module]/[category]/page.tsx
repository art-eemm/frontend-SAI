import { APP_CONFIG } from "@/lib/constants";
import DashboardDepartmentList from "@/components/dashboard/DashboardDepartmentList";
import DashboardDocumentTable from "@/components/dashboard/DashboardDocumentTable";
import { CustomBreadcrumbs } from "@/components/shared/CustomBreadcrumbs";
import { DepartmentItem } from "@/lib/types";
import { DocItem, fetchDocuments } from "@/lib/services/documents";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default async function DashboardCategoryPage({
  params,
}: {
  params: Promise<{ module: string; category: string }>;
}) {
  const resolvedParams = await params;
  const moduleSlug = resolvedParams.module.toLowerCase();
  const categorySlug = resolvedParams.category.toLowerCase();

  const currentModule = APP_CONFIG[moduleSlug];

  if (!currentModule) {
    return (
      <div className="min-h-full">
        <p className="text-muted-foreground">Este módulo no existe.</p>
      </div>
    );
  }

  const currentCategory = currentModule.options.find(
    (opt) => opt.href.split("/").pop() === categorySlug,
  );

  const isDirectCategory =
    currentModule.directCategories.includes(categorySlug);

  let tableData: DocItem[] = [];
  if (isDirectCategory) {
    tableData = await fetchDocuments(categorySlug);
  }

  const departmentOptions = Array.isArray(currentModule.departments)
    ? currentModule.departments?.map((dept: DepartmentItem) => ({
        title: dept.title,
        description: dept.description,
        href: `/dashboard/${moduleSlug}/${categorySlug}/${dept.title.toLowerCase()}`,
      }))
    : [];

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <CustomBreadcrumbs />

        {isDirectCategory && (
          <Button className="bg-brand-green text-foreground hover:bg-brand-green/80 flex items-center gap-2 cursor-pointer">
            <Plus className="h-4 w-4" />
            Nuevo documento
          </Button>
        )}
      </div>

      {isDirectCategory ? (
        <DashboardDocumentTable
          title={currentCategory?.title || "Documentos"}
          data={tableData}
        />
      ) : (
        <DashboardDepartmentList
          title={currentCategory?.title || "Departamentos"}
          options={departmentOptions}
        />
      )}
    </div>
  );
}
