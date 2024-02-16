"use client"

import { ColumnDef } from "@tanstack/react-table"
// import { Data } from "../data/schema"

import { DataTableRowActions } from "./data-table-row-actions"
import { DataTableColumnHeader } from "./data-table-column-header"
import { statuses } from "../data/data"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export type Data = {
  no_urut: number
  uuid: string
  created_at: string
  office: string
  year: string
  status: string
}

export const columns: ColumnDef<Data>[] = [
  {
    accessorKey: "year",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tahun" />
    ),
    cell: ({ row }) => <div className="ml-4">{row.getValue("year")}</div>
  },
  {
    accessorKey: "office",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Satuan Kerja" />
      ),
    cell: ({ row }) => <div className="ml-4">{row.getValue("office")}</div>
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex w-[150px] items-center">
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
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
  {
    accessorKey: "uuid",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="" />
    ),
    cell: ({ row }) => 
      <div className="text-xs">
        <Button asChild variant="link">
          <Link href={`/admin/belanja-modal/usulan/${row.getValue("uuid")}`} className="text-sm">Lihat Usulan</Link>
        </Button>
        <Button asChild variant="link">
          <Link href={`/admin/belanja-modal/dipa/${row.getValue("uuid")}`}>Lihat DIPA</Link>
        </Button>
      </div>,
    enableSorting: false,
  },
]
