import { CustomBreadcrumbs } from "@/components/shared/CustomBreadcrumbs";
import DocumentTable from "@/components/shared/DocumentTable";
import { APP_CONFIG } from "@/lib/constants";

export default async function DepartmentPage({
  params,
}: {
  params: Promise<{ module: string; category: string; dept: string }>;
}) {
  const { module, category, dept } = await params;

  const currentModuleConfig = APP_CONFIG[module.toLowerCase()];
  const deptCode = dept.toUpperCase();
  const departmentInfo = currentModuleConfig?.departments.find(
    (d) => d.title === deptCode,
  );
  const fullTitle = departmentInfo ? departmentInfo.description : deptCode;

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <CustomBreadcrumbs />
      <DocumentTable
        title={fullTitle}
        module={module}
        category={category}
        department={deptCode}
      />
    </main>
  );
}
