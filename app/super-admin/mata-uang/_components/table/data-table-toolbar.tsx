"use client"

import { Table } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"

import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter"
import { AddCurrency } from "../add-currency"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Cari mata uang..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-10 flex flex-1 bg-background"
        />
        {/* {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )} */}
        <AddCurrency />
      </div>
    </div>
  )
}
