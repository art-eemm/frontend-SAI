import { ModuleConfig } from "./types";

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
    options: [
      {
        title: "Manuales",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/documentacion/manuales",
      },
      {
        title: "Procedimientos",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/documentacion/procedimientos",
      },
      {
        title: "Instructivos",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/documentacion/instructivos",
      },
      {
        title: "Formatos",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/documentacion/formatos",
      },
      {
        title: "Complementarios",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/documentacion/complementarios",
      },
    ],
    directCategories: ["manuales"],
    departments: DEPARTAMENTOS,
  },
  planeacion: {
    title: "Planeación Estratégica",
    options: [
      {
        title: "Misión",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/planeacion/mision",
      },
      {
        title: "Visión",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/planeacion/vision",
      },
      {
        title: "Lema",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/planeacion/lema",
      },
      {
        title: "Política de Equipos Críticos",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/planeacion/politica-equipos",
      },
      {
        title: "Política Ambiental",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/planeacion/politica-ambiental",
      },
      {
        title: "Política de Prevención de Riesgos Psicosociales",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/planeacion/politica-prevencion-riesgos",
      },
      {
        title: "Política de Calidad",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/planeacion/politica-calidad",
      },
      {
        title: "Política de Seguridad",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/planeacion/politica-seguridad",
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
    options: [
      {
        title: "Calidad",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/objetivos/calidad",
      },
      {
        title: "Seguridad",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/objetivos/seguridad",
      },
      {
        title: "Medio Ambiente",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/objetivos/medio-ambiente",
      },
    ],
    directCategories: ["calidad", "seguridad", "medio-ambiente"],
    departments: [],
  },
  indicadores: {
    title: "Indicadores",
    options: [
      {
        title: "Mapa de procesos",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/indicadores/mapa-procesos",
      },
      {
        title: "Estratégicos",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/indicadores/estrategicos",
      },
      {
        title: "Proceso",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/indicadores/proceso",
      },
      {
        title: "Apoyo",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/indicadores/apoyo",
      },
    ],
    directCategories: ["mapa-procesos"],
    departments: DEPARTAMENTOS,
  },
  estructura: {
    title: "Estructura Organizacional",
    options: [
      {
        title: "Organigramas",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/estructura/organigramas",
      },
      {
        title: "Perfil y Descripción de Puesto",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/estructura/descripcion-puesto",
      },
      {
        title: "Reglamento Interno de Trabajo",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/estructura/reglamento",
      },
    ],
    directCategories: ["organigramas", "descripcion-puesto", "reglamento"],
    departments: [],
  },
  auditorias: {
    title: "Auditorías",
    options: [
      {
        title: "Calidad",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/auditorias/calidad",
      },
      {
        title: "Seguridad",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/auditorias/seguridad",
      },
      {
        title: "Medio Ambiente",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/auditorias/medio-ambiente",
      },
      {
        title: "Responsabilidad Social",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/auditorias/responsabilidad-social",
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
    options: [
      {
        title: "Minutas",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/comunicacion/minutas",
      },
      {
        title: "Memorandums",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/comunicacion/memorandums",
      },
    ],
    directCategories: ["minutas", "memorandums"],
    departments: [],
  },
  aspectos: {
    title: "Aspectos Relevantes",
    options: [
      {
        title: "Calidad",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/aspectos/calidad",
      },
      {
        title: "Seguridad",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/aspectos/seguridad",
      },
      {
        title: "Medio Ambiente",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/aspectos/medio-ambiente",
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
    options: [
      {
        title: "SAI",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/programas/sai",
      },
      {
        title: "Auditorias",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/programas/auditorias",
      },
      {
        title: "ING",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/programas/ing",
      },
      {
        title: "TRA",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/programas/tra",
      },
      {
        title: "TIC",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/programas/tic",
      },
      {
        title: "MPT",
        description:
          "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
        href: "/programas/mpt",
      },
    ],
    directCategories: ["sai", "auditorias", "ing", "tra", "tic", "mpt"],
    departments: [],
  },
};
