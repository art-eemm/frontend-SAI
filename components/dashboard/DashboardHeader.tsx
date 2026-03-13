import { Bell, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Sidebar from "../layout/Sidebar";

type DashboardHeaderProps = {
  title?: string;
  description?: string;
};

export default function DashboardHeader({
  title = "Inicio",
  description = "Bienvenido al Sistema de Administración Integral",
}: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b-2 border-border pb-4 mb-6">
      <div className="flex items-start gap-3">
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 rounded-md hover:bg-accent transition">
                <Menu size={20} />
              </button>
            </SheetTrigger>

            <SheetContent side="left" className="w-70 p-0 bg-background">
              <Sidebar />
            </SheetContent>
          </Sheet>
        </div>

        <div>
          <h1 className="text-md sm:text-lg font-semibold text-foreground">
            {title}
          </h1>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">
            {description}
          </p>
        </div>
      </div>

      <button className="relative p-2 rounded-full bg-background border border-border shadow-sm hover:cursor-pointer hover:bg-accent">
        <Bell className="w-4 h-4 text-foreground" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>
    </div>
  );
}
