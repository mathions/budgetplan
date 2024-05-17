"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { User } from "@/lib/definitions"
import { Edit, Trash } from "iconsax-react"

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    size: 200,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mata Uang" />
    ),
    cell: ({ row }) => <div className="ml-4">{row.getValue("name")}</div>
  },
  {
    accessorKey: "initial",
    size: 200,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kode" />
    ),
    cell: ({ row }) => <div className="ml-4">{row.getValue("initial")}</div>
  },
  {
    accessorKey: "value",
    size: 200,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nilai Tukar" />
    ),
    cell: ({ row }) => <div className="ml-4">{row.getValue("value")}</div>
  },
  
  {
    accessorKey: "uuid",
    enableResizing: false,
    size: 200,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title=""/>
    ),
    cell: ({ row }) => 
      <div className="text-xs flex w-full justify-center">
        <Button asChild variant="link">
          <Link href={`/admin/tahun/${row.getValue("uuid")}`} ><Edit className="w-6 h-6"/></Link>
        </Button>
        <Button asChild variant="link">
          <Link href={`/admin/tahun/${row.getValue("uuid")}`} ><Trash className="w-6 h-6"/></Link>
        </Button>
      </div>,
    enableSorting: false,
  },
]
