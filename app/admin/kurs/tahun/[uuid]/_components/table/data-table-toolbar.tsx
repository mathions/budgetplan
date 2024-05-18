"use client"

import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter"
import Link from "next/link"
import { AddKurs } from "../add-kurs"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  currency: any
  uuid: string
}

export function DataTableToolbar<TData>({
  table,
  currency,
  uuid,
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
        <AddKurs currency={currency} uuid={uuid}/>
      </div>
    </div>
  )
}
