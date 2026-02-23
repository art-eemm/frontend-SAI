import OptionGrid from "@/components/shared/OptionGrid";

const DATOS_DOCUMENTACION = [
  {
    title: "Manuales",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
  },
  {
    title: "Procedimientos",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
  },
  {
    title: "Instructivos",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
  },
  {
    title: "Formatos",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
  },
  {
    title: "Complementarios",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing, elit duis nec molestie rutrum feugiat leo, potenti ridiculus.",
  },
];

export default function DocumentacionPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">
        Documentación
      </h1>

      <OptionGrid options={DATOS_DOCUMENTACION} />
    </main>
  );
}
