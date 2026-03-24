import { CustomBreadcrumbs } from "@/components/shared/CustomBreadcrumbs";
import DocumentTable from "@/components/shared/DocumentTable";
import { APP_CONFIG } from "@/lib/constants";
import { DepartmentItem } from "@/lib/types";
import { fetchDocuments } from "@/lib/services/documents";

export default async function DepartmentPage({
  params,
}: {
  params: Promise<{ module: string; category: string; dept: string }>;
}) {
  const { module, category, dept } = await params;

  const tableData = await fetchDocuments(category, dept);

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
