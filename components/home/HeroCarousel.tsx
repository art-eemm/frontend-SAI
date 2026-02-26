"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const CAROUSEL_SLIDES = [
  {
    id: 1,
    image: "/images/PROPYSOL-HOME-PLANTA-01.jpg",
    title: "Trabajamos unidos por la excelencia",
    description: `Bienvenido al portal del Sistema de Administración Integral
                  (SAI). Esta herramienta refuerza el compromiso de mantener a
                  nuestros asociados informados sobre el desempeño de la
                  organización, facilitando el control y la dirección en materia
                  de Calidad, Medio Ambiente y Seguridad Laboral`,
  },
  {
    id: 2,
    image: "/images/PROPYSOL-HOME-PLANTA-02.jpg",
    title: "Misión",
    description:
      "Producir Propelente Hidrocarburo con calidad, seguridad y compromiso ambiental",
  },
  {
    id: 3,
    image: "/images/PROPYSOL-Flotilla-02.jpg",
    title: "Visión",
    description:
      "Mantener para el año 2025 el liderazgo nacional en la venta de Propelente Hidrocarburo",
  },
  {
    id: 4,
    image: "/images/PROPYSOL-Planta-Drone.jpg",
    title: "Política",
    description: `Propysol S.A. de C.V. está comprometida a producir Propelente Hidrocarburo cumpliento
                    con los requisitos normativos aplicables mediante: 
                    Sistema de Gestión de Calidad, Ambiente, Seguridad y Salud en el Trabajo
                    con un Enfoque Socialmente Respondable`,
  },
];

export default function HeroCarousel() {
  return (
    <section className="w-full max-w-lvw max-h-screen mx-auto px-2 lg:px-6 py-6">
      <Carousel
        className="w-full relative rounded-2xl overflow-hidden"
        opts={{
          loop: true,
        }}
        plugins={[Autoplay({ delay: 8000 })]}
      >
        <CarouselContent>
          {CAROUSEL_SLIDES.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative w-full h-125 lg:h-screen">
                <Image
                  src={slide.image}
                  alt="Planta de Propysol"
                  fill
                  className="object-cover"
                  priority
                />

                <div className="absolute inset-0 bg-black/40"></div>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                  <h2 className="text-white text-3xl lg:text-5xl font-bold tracking-tight mb-4">
                    {slide.title}
                  </h2>
                  <p className="text-white/90 text-sm lg:text-lg max-w-3xl mx-auto">
                    {slide.description}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="hidden lg:flex left-4 text-white border-none bg-black/20 hover:white hover:cursor-pointer" />
        <CarouselNext className="hidden lg:flex right-4 text-white border-none bg-black/20 hover:black/50 hover:cursor-pointer" />
      </Carousel>
    </section>
  );
}
