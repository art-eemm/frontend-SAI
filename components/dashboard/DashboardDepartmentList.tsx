"use client";

import Link from "next/link";
import { ChevronRight, Folder } from "lucide-react";

type DeptOption = {
  title: string;
  description: string;
  href: string;
};

export default function DashboardDepartmentList({
  title,
  options,
}: {
  title: string;
  options: DeptOption[];
}) {
  const half = Math.ceil(options.length / 2);
  const leftColumn = options.slice(0, half);
  const rightColumn = options.slice(half);

  const renderOption = (option: DeptOption, index: number) => {
    return (
      <Link
        key={index}
        href={option.href}
        className="flex items-center justify-between p-4 rounded-xl transition-all group hover:bg-brand-green/50"
      >
        <div className="flex items-center gap-4">
          <Folder
            className="w-5 h-5 text-muted-foreground group-hover:text-foreground shrink-0"
            strokeWidth={1.5}
          />
          <div className="hover:text-foreground">
            <h3 className="text-sm font-semibold text-foreground">
              {option.title}
            </h3>
            <p className="text-xs mt-2 text-muted-foreground">
              {option.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100" />
        </div>
      </Link>
    );
  };

  return (
    <div className="bg-accent rounded-2xl shadow-sm border border-border p-6 mt-6">
      <h2 className="text-lg font-bold text-foreground mb-6 px-2">{title}</h2>

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-x-8">
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2"></div>

        <div className="flex flex-col gap-1">
          {leftColumn.map((option, index) => renderOption(option, index))}
        </div>

        <div className="flex flex-col gap-1">
          {rightColumn.map((option, index) => renderOption(option, index))}
        </div>
      </div>
    </div>
  );
}
