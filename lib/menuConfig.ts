import {
  Home,
  ClipboardList,
  Target,
  FileText,
  Info,
  TrendingUp,
  Network,
  Folder,
  FileSearch,
  MessageSquare,
  XCircle,
  Settings,
  FileEdit,
} from "lucide-react";

export const adminMenu = [
  { label: null, items: [{ name: "Inicio", route: "/dashboard", icon: Home }] },
  {
    label: "Documentos",
    items: [
      {
        name: "Planeación estratégica",
        route: "/dashboard/planeacion",
        icon: ClipboardList,
      },
      { name: "Objetivos", route: "/dashboard/objetivos", icon: Target },
      {
        name: "Documentación",
        route: "/dashboard/documentacion",
        icon: FileText,
      },
      { name: "Aspectos relevantes", route: "/dashboard/aspectos", icon: Info },
      {
        name: "Indicadores de proceso",
        route: "/dashboard/indicadores",
        icon: TrendingUp,
      },
      {
        name: "Estructura organizacional",
        route: "/dashboard/estructura",
        icon: Network,
      },
      { name: "Programas", route: "/dashboard/programas", icon: Folder },
      { name: "Auditorias", route: "/dashboard/auditorias", icon: FileSearch },
      {
        name: "Comunicación",
        route: "/dashboard/comunicacion",
        icon: MessageSquare,
      },
    ],
  },
  {
    label: "Revisiones",
    items: [{ name: "Vencidos", route: "/dashboard/vencidos", icon: XCircle }],
  },
];

export const responsableMenu = [
  {
    label: null,
    items: [{ name: "Inicio", route: "/dashboard", icon: Home }],
  },
  {
    label: "Mis Documentos",
    items: [
      {
        name: "Manuales",
        route: "/dashboard/documentacion/manuales",
        icon: Folder,
      },
      {
        name: "Procedimientos",
        route: "/dashboard/documentacion/procedimientos",
        icon: Settings,
      },
      {
        name: "Formatos",
        route: "/dashboard/documentacion/formatos",
        icon: FileText,
      },
      {
        name: "Instructivos",
        route: "/dashboard/documentacion/instructivos",
        icon: FileEdit,
      },
      {
        name: "Indicadores",
        route: "/dashboard/documentacion/instructivos",
        icon: TrendingUp,
      },
    ],
  },
];
