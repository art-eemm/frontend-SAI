"use client";

import { useEffect, useState } from "react";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import ResponsableDashboard from "@/components/dashboard/ResponsableDashboard";

export default function DashboardPage() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserRole = async () => {
      const storedUser = localStorage.getItem("sai_user");
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          setUserRole(user?.role || null);
        } catch (error) {
          console.error("Error parseando al usuario", error);
        }
      }
      setIsLoading(false);
    };

    loadUserRole();
  }, []);

  if (isLoading) return null;

  if (userRole === "RESPONSABLE") {
    return <ResponsableDashboard />;
  }

  return <AdminDashboard />;
}
