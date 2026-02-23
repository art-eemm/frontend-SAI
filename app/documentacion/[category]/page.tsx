import { CustomBreadcrumbs } from "@/components/shared/CustomBreadcrumbs";
import OptionGrid from "@/components/shared/OptionGrid";

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

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const resolvedParams = await params;

  const category = resolvedParams.category.toLowerCase();

  if (category === "manuales") {
    return (
      <main className="max-w-7xl mx-auto px-4 py-10">
        <CustomBreadcrumbs />
        <h1 className="text-2xl font-semibold text-gray-900 mb-8 capitalize">
          {category}
        </h1>

        <div className="bg-white p-6 rounded-xl border border-gray-200">
          <p className="text-gray-500">
            Aquí se mostrarán directamente los archivos PDF de los manuales...
          </p>
        </div>
      </main>
    );
  }

  const optionsWithLinks = DEPARTAMENTOS.map((dept) => ({
    ...dept,
    href: `/documentacion/${category}/${dept.title.toLowerCase()}`,
  }));

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <CustomBreadcrumbs />
      <h1 className="text-2xl font-bold mb-8 capitalize">{category}</h1>
      <OptionGrid options={optionsWithLinks} />
    </main>
  );
}
