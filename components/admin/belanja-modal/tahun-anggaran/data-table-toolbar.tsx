"use client"

import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { statuses } from "./status"
import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter"
import Link from "next/link"

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
          placeholder="Cari tahun..."
          value={(table.getColumn("year")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("year")?.setFilterValue(event.target.value)
          }
          className="h-10 w-[180px] lg:w-[360px]"
        />
        {table.getColumn("is_active") && (
          <DataTableFacetedFilter
            column={table.getColumn("is_active")}
            title="Status"
            options={statuses}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-10 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      {/* <DataTableViewOptions table={table} /> */}
      <Button asChild variant="outline" className="h-10 lg:flex ml-2">
          <Link href="/admin/belanja-modal/buat">
            {/* <PlusIcon className="mr-2 h-4 w-4"/> */}
            Buat Pengajuan
          </Link>
      </Button>
    </div>
  )
}
