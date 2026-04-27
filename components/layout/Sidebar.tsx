"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { MoreVertical, LogOut, Moon, Sun } from "lucide-react";
import { Switch } from "../ui/switch";
import { adminMenu, responsableMenu } from "@/lib/menuConfig";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const [userData, setUserData] = useState(() => {
    if (typeof window === "undefined") {
      return { name: "Admin SAI", initials: "AS", role: "ADMIN_SAI" };
    }

    const storedUser = localStorage.getItem("sai_user");

    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        const nameParts = user.name ? user.name.split(" ") : ["Admin", "SAI"];
        const initials =
          nameParts.length > 1
            ? `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
            : "AS";

        return {
          name: user.name || "Admin SAI",
          initials,
          role: user.role,
        };
      } catch {
        return { name: "Admin SAI", initials: "AS", role: "ADMIN_SAI" };
      }
    }
    return { name: "Admin SAI", initials: "AS", role: "ADMIN_SAI" };
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("sai_token");
    localStorage.removeItem("sai_user");
    router.push("/login");
  };

  const handleThemeChange = (e: React.MouseEvent) => {
    const isDark = resolvedTheme === "dark";
    const nextTheme = isDark ? "light" : "dark";

    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = document.startViewTransition(() => {
      setTheme(nextTheme);
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];

      document.documentElement.animate(
        {
          clipPath: clipPath,
        },
        {
          duration: 500,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(theme-change)",
        },
      );
    });
  };

  const currentMenu =
    userData.role === "RESPONSABLE" ? responsableMenu : adminMenu;

  return (
    <aside className="w-70 h-screen bg-accent border-r border-border flex flex-col justify-between">
      <Link href={"/dashboard"}>
        <div className="flex items-center p-6 border-b-2 border-border">
          <Image
            src={"/images/DragonPropy.svg"}
            alt="Logo SAI"
            width={80}
            height={40}
            className="object-contain dark:hidden"
            priority
          />

          <Image
            src={"/images/DragonPropy_BlackMode.png"}
            alt="Logo SAI"
            width={80}
            height={40}
            className="object-contain hidden dark:block"
            priority
          />
          <h1 className="text-5xl font-bold italic">SAI</h1>
        </div>
      </Link>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 no-scrollbar">
        {currentMenu.map((section, index) => (
          <div key={index}>
            {section.label && (
              <p className="text-[12px] font-semibold text-muted-foreground uppercase mb-3 px-3">
                {section.label}
              </p>
            )}

            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive =
                  item.route === "/dashboard"
                    ? pathname === item.route
                    : pathname.startsWith(item.route);
                const Icon = item.icon;

                return (
                  <Link
                    key={item.name}
                    href={item.route}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-[14px] transition-all",
                      isActive
                        ? "bg-brand-green font-medium"
                        : "text-foreground hover:bg-background/50",
                    )}
                  >
                    <Icon size={18} className="text-foreground" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border p-4 bg-accent relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-foreground flex items-center justify-center text-sm font-semibold text-muted">
              {userData.initials}
            </div>

            <span className="text-[14px] text-muted-foreground font-medium truncate">
              {userData.name}
            </span>
          </div>

          <MoreVertical
            size={18}
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="text-muted-foreground cursor-pointer"
          />
        </div>

        <div ref={profileMenuRef}>
          {showProfileMenu && (
            <div className="absolute bottom-16 left-4 right-4 bg-accent border-2 border-border rounded-lg shadow-lg overflow-hidden">
              <div className="w-full flex items-center justify-between px-4 py-3 hover:bg-background border-b border-border transition-colors">
                <div className="text-sm text-foreground">
                  {mounted && resolvedTheme === "dark" ? (
                    <div className="flex gap-2 items-center">
                      <Sun size={16} />
                      Claro
                    </div>
                  ) : (
                    <div className="flex gap-2 items-center">
                      <Moon size={16} />
                      Oscuro
                    </div>
                  )}
                </div>

                <Switch
                  onClick={(e) => {
                    e.stopPropagation();
                    handleThemeChange(e);
                  }}
                  checked={mounted && resolvedTheme === "dark"}
                  className="cursor-pointer"
                />
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-background cursor-pointer"
              >
                <LogOut size={16} />
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
