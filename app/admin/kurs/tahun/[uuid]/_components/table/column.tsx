"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { User } from "@/lib/definitions"
import { DeleteKurs } from "../delete-kurs"
import { UpdateKurs } from "../update-kurs"

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
      <div className="text-xs flex w-full justify-center gap-2">
        <UpdateKurs name={row.getValue("name")} value={row.getValue("value")} uuid={row.getValue("uuid")}/>
        <DeleteKurs uuid={row.getValue("uuid")}/>
      </div>,
    enableSorting: false,
  },
]