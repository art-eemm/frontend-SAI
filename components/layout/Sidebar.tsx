"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MoreVertical, LogOut, Moon, Sun } from "lucide-react";
import { Switch } from "../ui/switch";
import { adminMenu, responsableMenu } from "@/lib/menuConfig";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const { state } = useSidebar();

  const [mounted, setMounted] = useState(false);

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
    <Sidebar collapsible="icon" className="border-r border-border bg-accent">
      <SidebarHeader className="p-4 border-b-2 border-border">
        <Link href={"/dashboard"} className="flex items-center gap-3">
          <div className="shrink-0">
            <Image
              src={"/images/DragonPropy.svg"}
              alt="Logo SAI"
              width={state === "collapsed" ? 40 : 80}
              height={40}
              className="object-contain dark:hidden transition-all duration-200"
              priority
            />
            <Image
              src={"/images/DragonPropy_BlackMode.png"}
              alt="Logo SAI"
              width={state === "collapsed" ? 40 : 80}
              height={40}
              className="object-contain hidden dark:block transition-all duration-200"
              priority
            />
          </div>
          {state === "expanded" && (
            <h1 className="text-4xl font-bold italic transition-opacity">
              SAI
            </h1>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="no-scrollbar">
        {currentMenu.map((section, index) => (
          <SidebarGroup key={index}>
            {section.label && (
              <SidebarGroupLabel className="text-xs uppercase text-muted-foreground font-semibold">
                {section.label}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  const isActive =
                    item.route === "/dashboard"
                      ? pathname === item.route
                      : pathname.startsWith(item.route);

                  const Icon = item.icon;

                  return (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.name}
                        className={`transition-all mx-auto ${
                          isActive
                            ? "bg-brand-green/80! font-medium"
                            : "hover:bg-background"
                        }`}
                      >
                        <Link href={item.route}>
                          <Icon />
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-2 bg-accent w-full">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size={"lg"}
              className="w-full justify-between data-[state=open]:bg-background/50"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <Avatar className="border">
                  <AvatarFallback>{userData.initials}</AvatarFallback>
                </Avatar>
                {state === "expanded" && (
                  <span className="text-sm text-muted-foreground font-medium truncate">
                    {userData.name}
                  </span>
                )}
              </div>
              {state === "expanded" && (
                <MoreVertical size={16} className="text-muted-foreground" />
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            side="top"
            align="end"
            className="w-56 bg-accent border-2 border-border"
          >
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              onClick={handleThemeChange}
              className="flex justify-between items-center cursor-pointer py-3"
            >
              <div className="flex items-center gap-2 text-foreground">
                {mounted && resolvedTheme === "dark" ? (
                  <>
                    <Sun size={16} /> Claro
                  </>
                ) : (
                  <>
                    <Moon size={16} /> Oscuro
                  </>
                )}
              </div>
              <Switch
                checked={mounted && resolvedTheme === "dark"}
                className="pointer-events-none"
              />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={handleLogout}>
              <LogOut size={16} className="mr-2" />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
