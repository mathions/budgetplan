"use client"

import { ColumnDef } from "@tanstack/react-table"

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { statuses } from "./status"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { YearTable } from "@/lib/definitions"

export const columns: ColumnDef<YearTable>[] = [
  {
    accessorKey: "year",
    size: 150,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tahun" />
    ),
    cell: ({ row }) => <div className="ml-4">{row.getValue("year")}</div>
  },
  {
    accessorKey: "proposal_count",
    size: 250,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Jumlah Pengajuan" />
      ),
    cell: ({ row }) => <div className="ml-4">{row.getValue("proposal_count")}</div>
  },
  {
    accessorKey: "is_active",
    size: 200,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("is_active")
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex w-[150px] items-center ml-4">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "uuid",
    enableResizing: false,
    size: 200,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title=""/>
    ),
    cell: ({ row }) => 
      <div className="text-xs flex w-fit">
        <Button asChild variant="link">
          <Link href={`/admin/belanja-modal/tahun-anggaran/${row.getValue("uuid")}`} className="text-sm">Lihat Detail</Link>
        </Button>
      </div>,
    enableSorting: false,
  },
]
