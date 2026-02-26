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
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

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
  const pathname = usePathname();

  if (pathname === "/login" || pathname === "/reset-password") return null;

  return (
    <header className="w-full bg-white relative">
      <div className="flex items-center justify-between gap-2 px-6 py-4">
        <div className="flex items-center gap-2">
          {/* Menu Movil */}
          <div className="lg:hidden flex items-center z-10">
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
                      className={cn(
                        navigationMenuTriggerStyle(),
                        pathname === item.route &&
                          "bg-accent text-accent-foreground",
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                <Link href={"/login"} className="mt-auto w-full">
                  <Button className="mt-auto w-full mb-4 bg-gray-900 text-white hover:bg-gray-800">
                    Iniciar sesión
                  </Button>
                </Link>
              </SheetContent>
            </Sheet>
          </div>

          <Link href={"/"}>
            <Image
              src={"/images/logo.svg"}
              alt="Logotipo de Propysol"
              width={210}
              height={60}
              className="object-contain"
              priority
            />
          </Link>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 hidden md:block z-0 text-right lg:text-center pr-6 lg:p-0 w-full">
          <Link href={"/"}>
            <h1 className="text-xl lg:text-2xl font-semibold tracking-wide text-gray-800 hidden md:block">
              SISTEMA DE ADMINISTRACIÓN INTEGRAL
            </h1>
          </Link>
        </div>

        <Link href={"/login"}>
          <Button className="absolute hidden lg:block right-6 top-6 bg-gray-900 text-white hover:bg-gray-800">
            Iniciar sesión
          </Button>
        </Link>
      </div>

      <div className="hidden lg:flex justify-center py-3 shadow-sm">
        <NavigationMenu>
          <NavigationMenuList className="flex gap-2">
            {MENU_ITEMS.map((item) => (
              <NavigationMenuItem key={item.name}>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    navigationMenuTriggerStyle(),
                    pathname === item.route &&
                      "bg-accent text-accent-foreground",
                  )}
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
