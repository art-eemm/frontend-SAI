export interface ApiDocument {
  id: string;
  origin_code: string;
  title: string;
  category: string;
  status: string;
  expiration_date: string;
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
}
export interface ModuleConfig {
  title: string;
  options: Option[];
  directCategories: string[];
  departments: DepartmentItem[] | Record<string, DepartmentItem[]>;
}
