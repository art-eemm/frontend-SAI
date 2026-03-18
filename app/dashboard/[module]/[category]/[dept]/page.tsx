import { APP_CONFIG } from "@/lib/constants";
import DashboardDocumentTable from "@/components/dashboard/DashboardDocumentTable";
import { CustomBreadcrumbs } from "@/components/shared/CustomBreadcrumbs";
import { DepartmentItem } from "@/lib/types";
import { fetchDocuments } from "@/lib/services/documents";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default async function DashboardDepartmenPage({
  params,
}: {
  params: Promise<{ module: string; category: string; dept: string }>;
}) {
  const resolvedParams = await params;
  const moduleSlug = resolvedParams.module.toLowerCase();
  const categorySlug = resolvedParams.category.toLowerCase();
  const deptSlug = resolvedParams.dept.toLowerCase();

  const currentModule = APP_CONFIG[moduleSlug];

  if (!currentModule) {
    return (
      <div className="w-full">
        <p className="text-muted-foreground">Este módulo no existe</p>
      </div>
    );
  }

  const currentDept = Array.isArray(currentModule.departments)
    ? currentModule.departments.find(
        (d: DepartmentItem) => d.title.toLowerCase() === deptSlug,
      )
    : undefined;

  const tableTitle = `${currentDept?.description || deptSlug.toUpperCase()}`;

  const tableData = await fetchDocuments(categorySlug, deptSlug);

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <CustomBreadcrumbs />

        <Button className="bg-brand-green text-gray-900 hover:bg-brand-green/80 flex items-center gap-2 cursor-pointer">
          <Plus className="h-4 w-4" />
          Nuevo documento
        </Button>
      </div>

      <DashboardDocumentTable title={tableTitle} data={tableData} />
    </div>
  );
}
