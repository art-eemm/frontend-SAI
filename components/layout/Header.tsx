"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "../ui/sheet";
import Link from "next/link";

type MenuItem = {
  name: string;
  route: string;
};

const MENU_ITEMS: MenuItem[] = [
  { name: "Planeación Estratégica", route: "/planeacion" },
  { name: "Documentación", route: "/documentacion" },
  { name: "Objetivos", route: "/objetivos" },
  { name: "Indicadores", route: "/indicadores" },
  { name: "Estructura Organizacional", route: "/estructura" },
  { name: "Auditorías", route: "/auditorias" },
  { name: "Comunicación", route: "/comunicacion" },
  { name: "Aspectos Relevantes", route: "/aspectos" },
  { name: "Programas", route: "/programas" },
];

export default function Header() {
  return (
    <header className="w-full bg-white relative">
      <div className="flex items-center justify-between lg:justify-center gap-2 px-6 py-4">
        <div className="flex items-center gap-2">
          {/* Menu Movil */}
          <div className="lg:hidden flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant={"ghost"} size={"icon"}>
                  <Menu className="h-7 w-7 text-gray-800" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-75 bg-white px-4">
                <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
                <nav className="flex flex-col gap-4 mt-8">
                  {MENU_ITEMS.map((item) => (
                    <Link
                      key={item.name}
                      href={item.route}
                      className={navigationMenuTriggerStyle()}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                <Button className="mt-auto mb-4 bg-gray-900 text-white hover:bg-gray-800">
                  Iniciar sesión
                </Button>
              </SheetContent>
            </Sheet>
          </div>

          <Image
            src={"/images/logo.svg"}
            alt="Logotipo de Propysol"
            width={210}
            height={60}
            className="object-contain"
            priority
          />
        </div>

        <h1 className="text-xl lg:text-2xl font-semibold tracking-wide text-gray-800 hidden md:block">
          SISTEMA DE ADMINISTRACIÓN INTEGRAL
        </h1>

        <Button className="absolute hidden lg:block right-6 bg-gray-900 text-white hover:bg-gray-800">
          Iniciar sesión
        </Button>
      </div>

      <div className="hidden lg:flex justify-center py-3 shadow-sm">
        <NavigationMenu>
          <NavigationMenuList className="flex gap-2">
            {MENU_ITEMS.map((item) => (
              <NavigationMenuItem key={item.name}>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href={item.route}>{item.name}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
