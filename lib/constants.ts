export interface ModuleConfig {
  directCategories: string[];
  departments: { title: string; description: string }[];
}

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

export const APP_CONFIG: Record<string, ModuleConfig> = {
  documentacion: {
    directCategories: ["manuales"],
    departments: DEPARTAMENTOS,
  },
  planeacion: {
    directCategories: [""],
    departments: [],
  },
  objetivos: {
    directCategories: [""],
    departments: [],
  },
};
