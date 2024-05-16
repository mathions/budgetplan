"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { User } from "@/lib/definitions"

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "year",
    size: 300,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tahun Anggaran" />
    ),
    cell: ({ row }) => <div className="ml-4">{row.getValue("year")}</div>
  },
  {
    accessorKey: "uuid",
    enableResizing: false,
    size: 200,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title=""/>
    ),
    cell: ({ row }) => 
      <div className="text-xs flex w-full gap-2 justify-start">
        <Button asChild variant="link">
          <Link href={`/admin/kurs/tahun/${row.getValue("uuid")}`} >Detail</Link>
        </Button>
      </div>,
    enableSorting: false,
  },
]
