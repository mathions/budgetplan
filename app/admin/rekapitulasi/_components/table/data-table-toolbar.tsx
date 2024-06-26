"use client";

import { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { codes, years } from "./data";
import { Ekspor } from "../ekspor";
interface DataTableToolbarProps<TData> {
  table: Table<TData>
  token: string
  year: any
}

export function DataTableToolbar<TData>({
  table,
  token,
  year,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  console.log(year)
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
        <Ekspor token={token} year={year} />
      </div>
    </div>
  );
}
