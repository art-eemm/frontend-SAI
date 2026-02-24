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
  let categoryDepartments: { title: string; description: string }[] = [];

  if (Array.isArray(currentModuleConfig?.departments)) {
    categoryDepartments = currentModuleConfig.departments;
  } else if (currentModuleConfig?.departments) {
    categoryDepartments =
      currentModuleConfig.departments[category.toLowerCase()] || [];
  }

  const normalize = (text: string) => text.toLowerCase().replace(/\s+/g, "-");
  const departmentInfo = categoryDepartments?.find(
    (d) => normalize(d.title) === dept.toLowerCase(),
  );

  let fullTitle = dept.toUpperCase();
  if (departmentInfo) {
    fullTitle =
      departmentInfo.title.length <= 3
        ? departmentInfo.description
        : departmentInfo.title;
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <CustomBreadcrumbs />
      <DocumentTable
        title={fullTitle}
        module={module}
        category={category}
        department={dept}
      />
    </main>
  );
}
