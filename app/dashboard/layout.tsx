"use client";

import Sidebar from "@/components/layout/Sidebar";
import AuthGuard from "@/components/shared/AuthGuard";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { HeaderProvider } from "@/lib/contexts/HeaderContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HeaderProvider>
      <AuthGuard>
        <div className="flex h-screen bg-backgorund text-foreground overflow-hidden">
          <div className="hidden lg:block">
            <Sidebar />
          </div>

          <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">
            <DashboardHeader />
            {children}
          </div>
        </div>
      </AuthGuard>
    </HeaderProvider>
  );
}
