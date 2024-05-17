"use client";

import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import Link from "next/link";
import { codes, offices, years } from "./data";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {table.getColumn("year") && (
          <DataTableFacetedFilter
            column={table.getColumn("year")}
            title="Tahun Anggaran"
            options={years}
          />
        )}
        {table.getColumn("office") && (
          <DataTableFacetedFilter
            column={table.getColumn("office")}
            title="Satuan Kerja"
            options={offices}
          />
        )}
        {table.getColumn("code") && (
          <DataTableFacetedFilter
            column={table.getColumn("code")}
            title="Komponen"
            options={codes}
          />
        )}
      </div>
    </div>
  );
}
