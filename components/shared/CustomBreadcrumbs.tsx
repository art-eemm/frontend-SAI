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
import React, { useEffect, useState } from "react";
import { getFormattedName } from "@/lib/utils";

export function CustomBreadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((item) => item !== "");
  const isDashboard = segments[0] === "dashboard";

  const [userRole, setUserRole] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const initializedBreadcrumbs = async () => {
      const storedUser = localStorage.getItem("sai_user");
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          const rawRole = user?.role;
          setUserRole(rawRole.trim().toUpperCase());
        } catch (error) {
          console.error("Error parseando usuario en breadcrumbs", error);
        }
      }
      setIsMounted(true);
    };
    initializedBreadcrumbs();
  }, []);

  if (!isMounted) return null;

  if (userRole === "RESPONSABLE") {
    return null;
  }

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
