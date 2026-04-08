"use client";

import Link from "next/link";
import { ChevronRight, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { Option } from "@/lib/types";
import { APP_CONFIG } from "@/lib/constants";
import { usePathname } from "next/navigation";
import { fetchDocuments } from "@/lib/services/documents";

type DashboardModuleListProps = {
  moduleSlug: string;
};

export default function DashboardModuleList({
  moduleSlug,
}: DashboardModuleListProps) {
  const pathname = usePathname();
  const currentModule = APP_CONFIG[moduleSlug];

  const [dynamicOptions, setDynamicOptions] = useState<Option[]>(
    currentModule?.options || [],
  );

  useEffect(() => {
    if (!currentModule) return;

    const loadRealCounts = async () => {
      try {
        const allDocs = await fetchDocuments();

        const updatedOptions = currentModule.options.map((option) => {
          const docCount = allDocs.filter(
            (doc) =>
              doc.categoria?.toLowerCase() === option.title.toLowerCase(),
          ).length;

          return {
            ...option,
            count: docCount,
          };
        });

        setDynamicOptions(updatedOptions);
      } catch (error) {
        console.error("Error al cargar contadores de documentos:", error);
      }
    };

    loadRealCounts();
  }, [currentModule]);

  if (!currentModule) return null;

  const { title } = currentModule;

  const half = Math.ceil(dynamicOptions.length / 2);
  const leftColumn = dynamicOptions.slice(0, half);
  const rightColumn = dynamicOptions.slice(half);

  const renderOption = (option: Option, index: number) => {
    const dashboardHref = option.href.startsWith("/dashboard")
      ? option.href
      : `/dashboard${option.href}`;
    const Icon = option.icon || FileText;

    return (
      <Link
        key={index}
        href={dashboardHref}
        className="flex items-center justify-between p-4 rounded-xl transition-all group hover:bg-brand-green/50"
      >
        <div className="flex items-center gap-8">
          <Icon className="lg:w-6 lg:h-6 shrink-0" strokeWidth={1.5} />
          <div>
            <h3 className="text-sm font-semibold">{option.title}</h3>
            <p className="text-xs mt-2 text-muted-foreground">
              {option.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm font-medium ml-2">
            ({option.count || 0})
          </span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </Link>
    );
  };

  return (
    <div className="bg-accent rounded-2xl shadow-sm border border-border px-2 py-6 lg:py-6 lg:px-6">
      <h2 className="text-lg font-bold text-foreground mb-6 px-2">{title}</h2>

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-x-8">
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-muted-foreground -translate-x-1/2"></div>

        <div className="flex flex-col gap-1">
          {leftColumn.map((option, index) => renderOption(option, index))}
        </div>

        <div className="flex flex-col gap-1">
          {rightColumn.map((option, index) => renderOption(option, index))}
        </div>
      </div>
    </div>
  );
}
