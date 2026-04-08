import { ModuleConfig } from "./types";
import {
  Award,
  Binoculars,
  BookOpenCheck,
  CircleCheck,
  ClipboardList,
  Cog,
  Compass,
  Contact,
  Cpu,
  Database,
  File,
  FilePen,
  FilePlus,
  Folder,
  Handshake,
  HeartHandshake,
  Leaf,
  Lock,
  Map,
  MessageSquareQuote,
  Network,
  Quote,
  Route,
  SearchCheck,
  Settings,
  ShieldCheck,
  StickyNote,
  Target,
  Workflow,
  Wrench,
} from "lucide-react";

const DEPARTAMENTOS = [
  { title: "CCA", description: "Control de Calidad" },
  { title: "COM", description: "Comercialización" },
  { title: "CPA", description: "Compras" },
  { title: "DEM", description: "Desarrollo de Métodos" },
  { title: "DIR", description: "Dirección" },
  { title: "FIN", description: "Finanzas" },
  { title: "GEM", description: "Gestión Empresarial" },
  { title: "ING", description: "Ingeniería y Servicios" },
  { title: "MPT", description: "Medicina Preventiva del Trabajo" },
  { title: "PER", description: "Personal" },
  { title: "PLA", description: "Planeación" },
  { title: "PRO", description: "Producción" },
  { title: "SAI", description: "Sistema de Administración Integral" },
  {
    title: "TIC",
    description: "Tecnologías de la Información y la Comunicación",
  },
  { title: "TRA", description: "Transporte" },
  { title: "MTO", description: "Mantenimiento" },
];

const ASPECTOS_CALIDAD = [
  {
    title: "FODA",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
  },
  {
    title: "Desviaciones",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
  },
  {
    title: "Proyectos de Mejora",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
  },
];

const ASPECTOS_SEGURIDAD = [
  {
    title: "Trabajos Peligrosos",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
  },
  {
    title: "Accidentes e Incidentes",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
  },
  {
    title: "Análisis de Riesgo",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
  },
  {
    title: "Trabajos Peligrosos",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
  },
];

const ASPECTOS_MA = [
  {
    title: "Aspectos Ambientales Significativos",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
  },
];

export const APP_CONFIG: Record<string, ModuleConfig> = {
  documentacion: {
    title: "Documentación",
    description:
      "Administración de manuales, procedimientos, formatos, planos, etcétera.",
    options: [
      {
        title: "Manuales",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/documentacion/manuales",
        icon: Folder,
      },
      {
        title: "Procedimientos",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/documentacion/procedimientos",
        icon: Settings,
      },
      {
        title: "Instructivos",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/documentacion/instructivos",
        icon: FilePen,
      },
      {
        title: "Formatos",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/documentacion/formatos",
        icon: File,
      },
      {
        title: "Complementarios",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/documentacion/complementarios",
        icon: FilePlus,
      },
    ],
    directCategories: ["manuales"],
    departments: DEPARTAMENTOS,
  },
  planeacion: {
    title: "Planeación Estratégica",
    description:
      "Definición de la estrategia institucional, planes de acción y hoja de ruta para el cumplimiento de metas.",
    options: [
      {
        title: "Misión",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/planeacion/mision",
        icon: Target,
      },
      {
        title: "Visión",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/planeacion/vision",
        icon: Binoculars,
      },
      {
        title: "Lema",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/planeacion/lema",
        icon: MessageSquareQuote,
      },
      {
        title: "Política de Equipos Críticos",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/planeacion/politica-equipos",
        icon: Settings,
      },
      {
        title: "Política Ambiental",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/planeacion/politica-ambiental",
        icon: Leaf,
      },
      {
        title: "Política de Prevención de Riesgos Psicosociales",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/planeacion/politica-prevencion-riesgos",
        icon: HeartHandshake,
      },
      {
        title: "Política de Calidad",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/planeacion/politica-calidad",
        icon: Award,
      },
      {
        title: "Política de Seguridad",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/planeacion/politica-seguridad",
        icon: Lock,
      },
    ],
    directCategories: [
      "mision",
      "vision",
      "lema",
      "politica-equipos",
      "politica-ambiental",
      "politica-prevencion-riesgos",
      "politica-calidad",
      "politica-seguridad",
    ],
    departments: [],
  },
  objetivos: {
    title: "Objetivos",
    description:
      "Establecimiento y seguimiento de metas medibles alineadas con la visión de la organización.",
    options: [
      {
        title: "Calidad",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/objetivos/calidad",
        icon: CircleCheck,
      },
      {
        title: "Seguridad",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/objetivos/seguridad",
        icon: ShieldCheck,
      },
      {
        title: "Medio Ambiente",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/objetivos/medio-ambiente",
        icon: Leaf,
      },
    ],
    directCategories: ["calidad", "seguridad", "medio-ambiente"],
    departments: [],
  },
  indicadores: {
    title: "Indicadores",
    description:
      "Monitoreo del desempeño mediante métricas clave (KPIs) para evaluar la eficacia de los procesos.",
    options: [
      {
        title: "Mapa de procesos",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/indicadores/mapa-procesos",
        icon: Map,
      },
      {
        title: "Estratégicos",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/indicadores/estrategicos",
        icon: Compass,
      },
      {
        title: "Proceso",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/indicadores/proceso",
        icon: Workflow,
      },
      {
        title: "Apoyo",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/indicadores/apoyo",
        icon: Handshake,
      },
    ],
    directCategories: ["mapa-procesos"],
    departments: DEPARTAMENTOS,
  },
  estructura: {
    title: "Estructura Organizacional",
    description:
      "Configuración del organigrama, jerarquías, perfiles de puesto y asignación de responsabilidades.",
    options: [
      {
        title: "Organigramas",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/estructura/organigramas",
        icon: Network,
      },
      {
        title: "Perfil y Descripción de Puesto",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/estructura/descripcion-puesto",
        icon: Contact,
      },
      {
        title: "Reglamento Interno de Trabajo",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/estructura/reglamento",
        icon: BookOpenCheck,
      },
    ],
    directCategories: ["organigramas", "descripcion-puesto", "reglamento"],
    departments: [],
  },
  auditorias: {
    title: "Auditorías",
    description:
      "Evaluación sistemática y verificación del cumplimiento de normas, procesos y estándares internos.",
    options: [
      {
        title: "Calidad",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/auditorias/calidad",
        icon: CircleCheck,
      },
      {
        title: "Seguridad",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/auditorias/seguridad",
        icon: ShieldCheck,
      },
      {
        title: "Medio Ambiente",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/auditorias/medio-ambiente",
        icon: Leaf,
      },
      {
        title: "Responsabilidad Social",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/auditorias/responsabilidad-social",
        icon: HeartHandshake,
      },
    ],
    directCategories: [
      "calidad",
      "seguridad",
      "medio-ambiente",
      "responsabilidad-social",
    ],
    departments: [],
  },
  comunicacion: {
    title: "Comunicación",
    description:
      "Gestión del flujo de información interna y externa para asegurar la transparencia y el alineamiento.",
    options: [
      {
        title: "Minutas",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/comunicacion/minutas",
        icon: ClipboardList,
      },
      {
        title: "Memorandums",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/comunicacion/memorandums",
        icon: StickyNote,
      },
    ],
    directCategories: ["minutas", "memorandums"],
    departments: [],
  },
  aspectos: {
    title: "Aspectos Relevantes",
    description:
      "Identificación y control de factores ambientales, legales o técnicos que impactan en la operación.",
    options: [
      {
        title: "Calidad",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/aspectos/calidad",
        icon: CircleCheck,
      },
      {
        title: "Seguridad",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/aspectos/seguridad",
        icon: ShieldCheck,
      },
      {
        title: "Medio Ambiente",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/aspectos/medio-ambiente",
        icon: Leaf,
      },
    ],
    directCategories: [],
    departments: {
      calidad: ASPECTOS_CALIDAD,
      seguridad: ASPECTOS_SEGURIDAD,
      "medio-ambiente": ASPECTOS_MA,
    },
  },
  programas: {
    title: "Programas",
    description:
      "Ejecución de iniciativas específicas, cronogramas de trabajo y gestión de proyectos especiales.",
    options: [
      {
        title: "SAI",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/programas/sai",
        icon: Database,
      },
      {
        title: "Auditorias",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/programas/auditorias",
        icon: SearchCheck,
      },
      {
        title: "ING",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/programas/ing",
        icon: Cog,
      },
      {
        title: "TRA",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/programas/tra",
        icon: Route,
      },
      {
        title: "TIC",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/programas/tic",
        icon: Cpu,
      },
      {
        title: "MPT",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/programas/mpt",
        icon: Wrench,
      },
    ],
    directCategories: ["sai", "auditorias", "ing", "tra", "tic", "mpt"],
    departments: [],
  },
};
