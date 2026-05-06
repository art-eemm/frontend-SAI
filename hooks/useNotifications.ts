import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

export interface AppNotification {
  id: number;
  user_id: number;
  document_id: number;
  type: string;
  message: string;
  is_read: boolean;
  created_at: string;
  category?: string;
  origin_code?: string;
  title?: string;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const prevUnreadCount = useRef(0);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("sai_token");
      if (!token) return;

      const res = await fetch(
        "http://localhost:4000/api/documents/notifications",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (res.ok) {
        const data = await res.json();
        setNotifications(data);

        const currentUnread = data.filter(
          (n: AppNotification) => !n.is_read,
        ).length;
        setUnreadCount(currentUnread);

        if (currentUnread > prevUnreadCount.current) {
          const latestNotif = data.find((n: AppNotification) => !n.is_read);
          if (latestNotif) {
            toast.info(latestNotif.message);
          }
        }
        prevUnreadCount.current = currentUnread;
      }
    } catch (error) {
      console.error("Error obteniendo notificaciones", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 15000);
    return () => clearInterval(interval);
  }, []);

  const markAsRead = async (id: number) => {
    try {
      const token = localStorage.getItem("sai_token");
      await fetch(
        `http://localhost:4000/api/documents/notifications/${id}/read`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)),
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Error marcando como leído", error);
    }
  };

  const clearAll = async () => {
    try {
      const token = localStorage.getItem("sai_token");

      const res = await fetch(
        "http://localhost:4000/api/documents/notifications",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.ok) {
        setNotifications([]);
        setUnreadCount(0);
      }
    } catch (error) {
      console.error("Error al limpiar las notificaciones:", error);
    }
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    clearAll,
    fetchNotifications,
  };
}
