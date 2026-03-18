import { APP_CONFIG } from "@/lib/constants";
import DashboardModuleList from "@/components/dashboard/DashboardModuleList";
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
        <p className="text-muted-foreground">
          Este modulo aún no ha sido configurado.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <CustomBreadcrumbs />
      </div>

      <DashboardModuleList moduleSlug={moduleSlug} />
    </div>
  );
}
