"use client"

import { ColumnDef } from "@tanstack/react-table"

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { statuses } from "./status"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AbtTable } from "@/lib/definitions"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<AbtTable>[] = [
  {
    accessorKey: "created_at",
    size: 100,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tanggal" />
    ),
    cell: ({ row }) => <div className="ml-4">{row.getValue("created_at")}</div>
  },
  {
    accessorKey: "office",
    size: 150,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Satuan Kerja" />
    ),
    cell: ({ row }) => <div className="ml-4">{row.getValue("office")}</div>
  },
  {
    accessorKey: "perihal",
    size: 300,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Perihal" />
    ),
    cell: ({ row }) => <div className="ml-4">{row.getValue("perihal")}</div>
  },
  {
    accessorKey: "status",
    size: 150,
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
        <div className="flex w-[150px] items-center ml-4">
          <div className={status.class}>
            {status.icon && (
              <status.icon className={status.classname} />
            )}
            <span>{status.label}</span>
          </div>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
  accessorKey: "uuid",
  size: 150,
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="" />
  ),
  cell: ({ row }) => 
    <div className="text-xs">
      <Button asChild variant="ghost" className="h-8 px-4 py-2 rounded-full bg-pmr/10 text-pmr hover:bg-pmr/20 hover:text-pmr">
        <Link href={`/admin/abt/detail/${row.getValue("uuid")}`} className="text-sm">Lihat Detail</Link>
        </Button>
    </div>,
  enableSorting: false,
},
]
