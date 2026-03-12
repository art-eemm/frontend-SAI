import { ElementType } from "react";

export interface ApiDocument {
  id: string;
  origin_code: string;
  title: string;
  category: string;
  status: string;
  expiration_date: string | null;
  created_at: string;
  uploaded_by: string;
}

export interface ApiDocumentDetail {
  versions?: Array<{
    revision_date?: string;
    revision_number?: number;
    revision_label?: string;
    file_type: string;
    file_url?: string;
  }>;
}

export interface DepartmentItem {
  title: string;
  description: string;
}

export interface Option extends DepartmentItem {
  href: string;
  icon?: ElementType;
  count?: number;
}
export interface ModuleConfig {
  title: string;
  description: string;
  options: Option[];
  directCategories: string[];
  departments: DepartmentItem[] | Record<string, DepartmentItem[]>;
}

export interface DashboardKpis {
  total: number;
  recents: number;
  expired: number;
  myUploads: number;
}
export interface User {
  name: string;
}

export interface RecentActivityItem {
  id: string | number;
  proc: string;
  name: string;
  date: string;
  rev: string;
  user: string;
  status: string;
}
