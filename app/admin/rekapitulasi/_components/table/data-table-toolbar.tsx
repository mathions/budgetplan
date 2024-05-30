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
        <Input
          placeholder="Cari perwakilan..."
          value={(table.getColumn("office")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("office")?.setFilterValue(event.target.value)
          }
          className="h-10 flex flex-1 bg-background"
        />
        {table.getColumn("year") && (
          <DataTableFacetedFilter
            column={table.getColumn("year")}
            title="Tahun"
            options={years}
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
