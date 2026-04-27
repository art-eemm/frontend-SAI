"use client";

import { useEffect, use } from "react";
import { APP_CONFIG } from "@/lib/constants";
import DashboardDepartmentList from "@/components/dashboard/DashboardDepartmentList";
import DashboardDocumentTable from "@/components/dashboard/DashboardDocumentTable";
import { CustomBreadcrumbs } from "@/components/shared/CustomBreadcrumbs";
import UploadDocumentButton from "@/components/shared/UploadDocumentButton";
import { useHeader } from "@/lib/contexts/HeaderContext";
import { useCategoryDocuments } from "@/hooks/useCategoryDocuments";
import { Loader2 } from "lucide-react";

export default function DashboardCategoryPage({
  params,
}: {
  params: Promise<{ module: string; category: string }>;
}) {
  const resolvedParams = use(params);
  const moduleSlug = resolvedParams.module.toLowerCase();
  const categorySlug = resolvedParams.category.toLowerCase();

  const currentModule = APP_CONFIG[moduleSlug];

  const { setHeaderState, resetHeader } = useHeader();
  const { documents, loading, userRole } = useCategoryDocuments(categorySlug);

  const currentCategory = currentModule.options.find(
    (opt) => opt.href.split("/").pop() === categorySlug,
  );

  const isDirectCategory =
    currentModule?.directCategories.includes(categorySlug) ||
    userRole === "RESPONSABLE";

  useEffect(() => {
    if (currentModule) {
      setHeaderState({
        title: currentModule?.title || categorySlug,
        subtitle:
          currentModule?.description ||
          `Gestión de la categoría ${categorySlug}`,
      });
    }
    return () => resetHeader();
  }, [currentModule, categorySlug, currentCategory]);

  if (!currentModule) {
    return (
      <div className="min-h-full p-8">
        <p className="text-muted-foreground">
          Este módulo no existe en la configuración.
        </p>
      </div>
    );
  }

  const departmentOptions = Array.isArray(currentModule.departments)
    ? currentModule.departments.map(
        (dept: { title: string; description: string }) => ({
          title: dept.title,
          description: dept.description,
          href: `/dashboard/${moduleSlug}/${categorySlug}/${dept.title.toLowerCase()}`,
        }),
      )
    : [];

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <CustomBreadcrumbs />

        {isDirectCategory && (
          <UploadDocumentButton
            category={currentCategory?.title || categorySlug}
          />
        )}
      </div>

      {isDirectCategory ? (
        loading ? (
          <div className="flex flex-col items-center justify-center h-64 border border-border rounded-xl bg-accent/30">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
            <p className="text-sm font-medium text-muted-foreground">
              Cargando documentos de {currentCategory?.title || categorySlug}...
            </p>
          </div>
        ) : (
          <DashboardDocumentTable
            title={currentCategory?.title || "Documentos"}
            data={documents}
          />
        )
      ) : (
        <DashboardDepartmentList
          title={currentCategory?.title || "Departamentos"}
          options={departmentOptions}
        />
      )}
    </div>
  );
}
