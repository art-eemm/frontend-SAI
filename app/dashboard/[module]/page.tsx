import { APP_CONFIG } from "@/lib/constants";
import DashboardModuleList from "@/components/dashboard/DashboardModuleList";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { CustomBreadcrumbs } from "@/components/shared/CustomBreadcrumbs";

export default async function DashboardModulePage({
  params,
}: {
  params: Promise<{ module: string }>;
}) {
  const resolvedParams = await params;
  const moduleSlug = resolvedParams.module.toLowerCase();
  const currentModule = APP_CONFIG[moduleSlug];

  if (!currentModule) {
    return (
      <div className="p-6">
        <DashboardHeader
          title={moduleSlug.replace(/-/g, " ")}
          description="Este módulo aún no ha sido configurado."
        />
      </div>
    );
  }

  return (
    <div className="px-2 lg:px-6 py-6 min-h-screen">
      <DashboardHeader
        title={currentModule.title}
        description={
          currentModule.description || "Gestión y administración del módulo"
        }
      />

      <div className="mb-6">
        <CustomBreadcrumbs />
      </div>

      <DashboardModuleList moduleSlug={moduleSlug} />
    </div>
  );
}
