import OptionGrid from "@/components/shared/OptionGrid";
import { CustomBreadcrumbs } from "@/components/shared/CustomBreadcrumbs";
import { APP_CONFIG } from "@/lib/constants";

export default async function ModulePage({
  params,
}: {
  params: Promise<{ module: string }>;
}) {
  const resolvedParams = await params;

  const moduleSlug = resolvedParams.module.toLowerCase();
  const currentModule = APP_CONFIG[moduleSlug];

  if (!currentModule) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-10">
        <CustomBreadcrumbs />
        <h1 className="text-2xl font-semibold text-foreground mb-8 capitalize">
          {moduleSlug.replace(/-/g, "")}
        </h1>
        <div className="bg-background p-6 rounded-xl border border-border">
          <p className="text-muted-foreground">
            Las opciones para este módulo aún no han sido configuradas.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <CustomBreadcrumbs />
      <h1 className="text-2xl font-semibold text-foreground mb-8">
        {currentModule.title}
      </h1>

      <OptionGrid options={currentModule.options} />
    </main>
  );
}
