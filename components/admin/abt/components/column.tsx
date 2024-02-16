"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Data } from "../data/schema"

import { DataTableColumnHeader } from "./data-table-column-header"
import { statuses } from "../data/data"
import { Button } from "@/components/ui/button"
import Link from "next/link"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Data>[] = [
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tanggal" />
    ),
  },
  {
    accessorKey: "office",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Satuan Kerja" />
    ),
  },
  {
    accessorKey: "perihal",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Perihal" />
    ),
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
        <div className="flex w-[100px] items-center">
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
        <Link href={`/admin/abt/detail/${row.getValue("uuid")}`} className="text-sm">Lihat Detail</Link>
      </Button>
    </div>,
  enableSorting: false,
},
]
