"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
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
  MoreVertical,
  LogOut,
} from "lucide-react";

const menuSections = [
  {
    label: null,
    items: [{ name: "Inicio", route: "/dashboard", icon: Home }],
  },
  {
    label: "Documentos",
    items: [
      {
        name: "Planeación estratégica",
        route: "/planeacion",
        icon: ClipboardList,
      },
      { name: "Objetivos", route: "/objetivos", icon: Target },
      { name: "Documentación", route: "/documentacion", icon: FileText },
      { name: "Aspectos relevantes", route: "/aspectos", icon: Info },
      {
        name: "Indicadores de proceso",
        route: "/indicadores",
        icon: TrendingUp,
      },
      {
        name: "Estructura organizacional",
        route: "/estructura",
        icon: Network,
      },
      { name: "Programas", route: "/programas", icon: Folder },
      { name: "Auditorias", route: "/auditorias", icon: FileSearch },
      { name: "Comunicación", route: "/comunicacion", icon: MessageSquare },
    ],
  },
  {
    label: "Revisiones",
    items: [{ name: "Vencidos", route: "/vencidos", icon: XCircle }],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userData, setUserData] = useState(() => {
    if (typeof window === "undefined") {
      return { name: "Admin SAI", initials: "AS" };
    }

    const storedUser = localStorage.getItem("sai_user");

    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        const nameParts = user.name ? user.name.spli(" ") : ["Admin", "SAI"];

        const initials =
          nameParts.length > 1
            ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
            : "AS";

        return {
          name: user.name || "Admin SAI",
          initials,
        };
      } catch {
        return { name: "Admin SAI", initials: "AS" };
      }
    }
    return { name: "Admin SAI", initials: "AS" };
  });

  const handleLogout = () => {
    localStorage.removeItem("sai_token");
    localStorage.removeItem("sai_user");
    router.push("/login");
  };

  return (
    <aside className="w-[280px] h-screen bg-gray-100 border-r border-gray-200 flex flex-col justify-between">
      <Link href={"/dashboard"}>
        <div className="flex items-center p-6 border-b border-gray-200">
          <Image
            src={"images/DragonPropy_LightMode.svg"}
            alt="Logo SAI"
            width={80}
            height={40}
            className="object-contain"
            priority
          />
          <h1 className="text-5xl font-bold italic">SAI</h1>
        </div>
      </Link>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 no-scrollbar">
        {menuSections.map((section, index) => (
          <div key={index}>
            {section.label && (
              <p className="text-[12px] font-semibold text-gray-400 uppercase mb-3 px-3">
                {section.label}
              </p>
            )}

            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.route;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.name}
                    href={item.route}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-[14px] transition-all",
                      isActive
                        ? "bg-brand-green font-medium"
                        : "text-gray-900 hover:bg-gray-200",
                    )}
                  >
                    <Icon size={18} className="text-gray-900" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 p-4 bg-[#f5f6f8] relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold text-gray-700">
              {userData.initials}
            </div>

            <span className="text-[14px] text-gray-700 font-medium truncate">
              {userData.name}
            </span>
          </div>

          <MoreVertical
            size={18}
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="text-gray-500 cursor-pointer"
          />
        </div>

        {showProfileMenu && (
          <div className="absolute bottom-16 left-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
            >
              <LogOut size={16} />
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
