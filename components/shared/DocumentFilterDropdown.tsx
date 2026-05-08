import React from "react";
import { Button } from "../ui/button";
import { SlidersHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  SortOption,
  DocumentFilterState,
  defaultFilterState,
} from "@/lib/types";

interface DocumentFilterDropdownProps {
  filters: DocumentFilterState;
  setFilters: React.Dispatch<React.SetStateAction<DocumentFilterState>>;
  showStatusFilter?: boolean;
}

export function DocumentFilterDropdown({
  filters,
  setFilters,
  showStatusFilter = true,
}: DocumentFilterDropdownProps) {
  const resetFilters = () => setFilters(defaultFilterState);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"secondary"}
          className="flex items-center gap-2 cursor-pointer border border-border"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filtro
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-48 max-h-80 overflow-y-auto bg-background border-border no-scrollbar"
        align="end"
      >
        <DropdownMenuLabel className="text-xs text-muted-foreground uppercase tracking-wider">
          Ordenar por
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={filters.sort}
          onValueChange={(val) =>
            setFilters({ ...filters, sort: val as SortOption })
          }
        >
          <DropdownMenuRadioItem value="newest" className="cursor-pointer">
            Más recientes
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="oldest" className="cursor-pointer">
            Más antiguos
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="name-asc" className="cursor-pointer">
            Nombre (A - Z)
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="name-desc" className="cursor-pointer">
            Nombre (Z - A)
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>

        {showStatusFilter && (
          <>
            <DropdownMenuSeparator />

            <DropdownMenuLabel className="text-xs text-muted-foreground uppercase tracking-wider">
              Estado
            </DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={filters.status}
              onValueChange={(val) => setFilters({ ...filters, status: val })}
            >
              <DropdownMenuRadioItem value="ALL" className="cursor-pointer">
                Todos
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                value="VIGENTE"
                className="cursor-pointer text-green-600 dark:text-green-400"
              >
                Vigente
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                value="VENCIDO"
                className="cursor-pointer text-red-600 dark:text-red-400"
              >
                Vencido
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                value="EN_REVISION"
                className="cursor-pointer text-yellow-600 dark:text-yellow-400"
              >
                En Revisión
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuLabel className="text-xs text-muted-foreground uppercase tracking-wider">
          Tipo de Archivo
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={filters.type}
          onValueChange={(val) => setFilters({ ...filters, type: val })}
        >
          <DropdownMenuRadioItem value="ALL" className="cursor-pointer">
            Todos
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="PDF" className="cursor-pointer">
            PDF
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="WORD" className="cursor-pointer">
            Word
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="EXCEL" className="cursor-pointer">
            Excel
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator />

        <div>
          <Button
            variant={"ghost"}
            size={"sm"}
            className="w-full text-sm text-muted-foreground hover:text-foreground"
            onClick={(e) => {
              e.preventDefault();
              resetFilters();
            }}
          >
            Limpiar filtros
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
