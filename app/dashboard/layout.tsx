"use client";

import AppSidebar from "@/components/layout/Sidebar";
import AuthGuard from "@/components/shared/AuthGuard";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { HeaderProvider } from "@/lib/contexts/HeaderContext";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HeaderProvider>
      <AuthGuard>
        <div className="flex h-screen bg-background text-foreground overflow-hidden">
          <SidebarProvider>
            <AppSidebar />

            <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">
              <DashboardHeader />
              {children}
            </div>
          </SidebarProvider>
        </div>
      </AuthGuard>
    </HeaderProvider>
  );
}
