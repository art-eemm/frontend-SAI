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
    <div className="flex items-center justify-between border-b border-gray-300 pb-4 mb-6">
      <div className="flex items-start gap-3">
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2 rounded-md hover:bg-gray-200 transition">
                <Menu size={20} />
              </button>
            </SheetTrigger>

            <SheetContent side="left" className="w-70 p-0 bg-white">
              <Sidebar />
            </SheetContent>
          </Sheet>
        </div>

        <div>
          <h1 className="text-md sm:text-lg font-semibold text-gray-900">
            {title}
          </h1>
          <p className="text-xs md:text-sm text-gray-500 mt-1">{description}</p>
        </div>
      </div>

      <button className="relative p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:cursor-pointer hover:bg-gray-100">
        <Bell className="w-4 h-4 text-gray-600" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>
    </div>
  );
}
