"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import AuthGuard from "@/components/shared/AuthGuard";
import { Menu } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AuthGuard>
      <div className="flex h-screen bg-white overflow-hidden">
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </AuthGuard>
  );
}
