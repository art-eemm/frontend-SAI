"use client";

import { usePathname } from "next/navigation";
import { APP_CONFIG } from "@/lib/constants";
import { useHeader } from "@/lib/contexts/HeaderContext";
import { NotificationDropdown } from "../layout/NotificationDropdown";
import { SidebarTrigger } from "../ui/sidebar";

export default function DashboardHeader() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const { headerState } = useHeader();

  let defaultTitle = "Inicio";
  let defaultDescription = "Bienvenido al Sistema de Administración Integral";

  if (segments.length > 1 && segments[0] === "dashboard") {
    const moduleSlug = segments[1].toLowerCase();
    const currentModule = APP_CONFIG[moduleSlug];

    if (currentModule) {
      defaultTitle = currentModule.title || moduleSlug;
      defaultDescription = currentModule.description || defaultDescription;
    } else {
      defaultTitle = "Error";
      defaultDescription = "Módulo no encontrado";
    }
  }

  const displayTitle = headerState.title || defaultTitle;
  const displayDescription = headerState.subtitle || defaultDescription;

  return (
    <div className="flex items-center justify-between border-b-2 border-border pb-4 mb-6">
      <div className="flex items-start gap-3">
        <SidebarTrigger className="shrink-0" size={"icon-lg"} />
        <div>
          <h1 className="text-md sm:text-lg font-semibold text-foreground">
            {displayTitle}
          </h1>
          <div className="text-xs md:text-sm text-muted-foreground mt-1">
            {displayDescription}
          </div>
        </div>
      </div>

      <NotificationDropdown />
    </div>
  );
}
