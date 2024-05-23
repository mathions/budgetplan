"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { User } from "@/lib/definitions"
import { DeleteKurs } from "../delete-kurs"
import { UpdateKurs } from "../update-kurs"

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    size: 300,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mata Uang" className="ml-4"/>
    ),
    cell: ({ row }) => <div className="ml-4">{row.getValue("name")}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "initial",
    size: 100,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kode" className="ml-4"/>
    ),
    cell: ({ row }) => <div className="ml-4">{row.getValue("initial")}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "value",
    size: 100,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nilai Tukar" className="text-right"/>
    ),
    cell: ({ row }) => <div className="ml-4 text-right">{row.getValue("value")}</div>,
    enableSorting: false,
  },
  
  {
    accessorKey: "uuid",
    enableResizing: false,
    size: 300,
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
