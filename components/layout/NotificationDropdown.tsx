"use client";

import { Bell, FileText, CheckCircle, AlertCircle, Trash2 } from "lucide-react";
import { useNotifications, AppNotification } from "@/hooks/useNotifications";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function NotificationDropdown() {
  const { notifications, unreadCount, markAsRead, clearAll } =
    useNotifications();
  const router = useRouter();

  const getIcon = (type: string) => {
    if (type.includes("RECHAZADO") || type.includes("OBSERVACIONES"))
      return <AlertCircle className="w-4 h-4 text-red-500" />;
    if (type.includes("APROBADO") || type.includes("PUBLICADO"))
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    return <FileText className="w-4 h-4 text-blue-500" />;
  };

  const handleNotificationClick = (notif: AppNotification) => {
    if (!notif.is_read) {
      markAsRead(notif.id);
    }

    if (notif.category && notif.origin_code) {
      const moduleSlug = "documentacion";
      const catSlug = notif.category
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      const parts = notif.origin_code.split("-");
      const deptSlug = parts.length > 1 ? parts[1].toLowerCase() : "";

      let redirectUrl = `/dashboard/${moduleSlug}/${catSlug}`;

      if (deptSlug && catSlug === "formatos") {
        redirectUrl += `/${deptSlug}`;
      }
      router.push(`${redirectUrl}`);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors focus:outline-none cursor-pointer">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs font-medium flex items-center justify-center rounded-full border-2 border-background">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-80 p-0 overflow-hidden rounded-xl"
      >
        <div className="bg-muted/50 border-b border-border px-4 py-3 flex justify-between items-center">
          <h3 className="font-semibold text-sm text-foreground">
            Notificaciones
          </h3>

          <span className="text-[10px] uppercase bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-bold">
            {unreadCount} nuevas
          </span>
        </div>

        <div className="max-h-[350px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground text-sm flex flex-col items-center">
              <Bell className="w-8 h-8 text-muted-foreground/50 mb-2" />
              No tienes notificaciones
            </div>
          ) : (
            <div className="flex flex-col">
              {notifications.map((notif) => (
                <DropdownMenuItem
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif)}
                  className={`p-4 cursor-pointer flex gap-3 items-start rounded-none border-b border-border/50 focus:bg-accent/50 ${
                    !notif.is_read ? "bg-blue-50/40 dark:bg-blue-900/10" : ""
                  }`}
                >
                  <div className="mt-0.5">{getIcon(notif.type)}</div>
                  <div className="flex-1 space-y-1">
                    <p
                      className={`text-xs leading-tight ${!notif.is_read ? "text-foreground font-medium" : "text-muted-foreground"}`}
                    >
                      {notif.message}
                    </p>
                    {notif.origin_code && (
                      <p className="text-xs text-blue-600 font-semibold mt-1">
                        {notif.origin_code} - {notif.title}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground/70">
                      {new Date(notif.created_at).toLocaleDateString("es-MX", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  {!notif.is_read && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 shrink-0 shadow-[0_0_8px_rgba(37,99,235,0.8)]"></div>
                  )}
                </DropdownMenuItem>
              ))}
              {notifications.length > 0 && (
                <div className="p-1 mt-1">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      clearAll();
                    }}
                    className="w-full flex items-center justify-center px-2 py-2 text-xs font-medium text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-sm transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-2" />
                    Limpiar todo
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
