"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import React from "react";
import { getFormattedName } from "@/lib/utils";

export function CustomBreadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((item) => item !== "");
  const isDashboard = segments[0] === "dashboard";

  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        {!isDashboard && (
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
          </BreadcrumbItem>
        )}

        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;

          const showSeparator = !isDashboard || index > 0;

          return (
            <React.Fragment key={href}>
              {showSeparator && <BreadcrumbSeparator />}

              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="capitalize">
                    {getFormattedName(segment)}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href} className="capitalize">
                    {getFormattedName(segment)}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
