import { CustomBreadcrumbs } from "@/components/shared/CustomBreadcrumbs";
import OptionGrid from "@/components/shared/OptionGrid";
import DocumentTable from "@/components/shared/DocumentTable";
import { APP_CONFIG } from "@/lib/constants";
import { getFormattedName } from "@/lib/utils";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ module: string; category: string }>;
}) {
  const { module, category } = await params;
  const currentModuleConfig = APP_CONFIG[module.toLowerCase()];
  const pageTitle = getFormattedName(category);
  let categoryDepartments: { title: string; description: string }[] = [];

  if (Array.isArray(currentModuleConfig.departments)) {
    categoryDepartments = currentModuleConfig.departments;
  } else if (currentModuleConfig.departments) {
    categoryDepartments =
      currentModuleConfig.departments[category.toLowerCase()] || [];
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

  if (currentModuleConfig.directCategories.includes(category.toLowerCase())) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-10">
        <CustomBreadcrumbs />
        <DocumentTable title={pageTitle} module={module} category={category} />
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
