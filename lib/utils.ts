import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { APP_CONFIG } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFormattedName(slug: string): string {
  if (!slug) return "";
  const lowerSlug = slug.toLowerCase();

  if (APP_CONFIG[lowerSlug]) {
    return APP_CONFIG[lowerSlug].title;
  }

  for (const moduleConfig of Object.values(APP_CONFIG)) {
    const categoryMatch = moduleConfig.options.find(
      (opt) => opt.href.split("/").pop() === lowerSlug,
    );
    if (categoryMatch) return categoryMatch.title;

    if (moduleConfig.departments) {
      const deptsArray = Array.isArray(moduleConfig.departments)
        ? moduleConfig.departments
        : Object.values(moduleConfig.departments).flat();

      const deptMatch = deptsArray.find(
        (d) => d.title.toLowerCase().replace(/\s+/g, "-") === lowerSlug,
      );

      if (deptMatch) {
        return deptMatch.title.length <= 3
          ? deptMatch.description
          : deptMatch.title;
      }
    }
  }

  return slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}
