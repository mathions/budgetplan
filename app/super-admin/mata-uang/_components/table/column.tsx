"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { Currency } from "@/lib/definitions"
import { DeleteCurrency } from "../delete-currency"
import { UpdateCurrency } from "../update-currency"

export const columns: ColumnDef<Currency>[] = [
  {
    accessorKey: "name",
    size: 250,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mata Uang" />
    ),
    cell: ({ row }) => <div className="ml-4">{row.getValue("name")}</div>
  },
  {
    accessorKey: "initial",
    size: 150,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kode" />
      ),
    cell: ({ row }) => <div className="ml-4">{row.getValue("initial")}</div>
  },
  {
    accessorKey: "uuid",
    enableResizing: false,
    size: 100,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title=""/>
    ),
    cell: ({ row }) => 
      <div className="flex w-full justify-center gap-4">
        <UpdateCurrency key={row.getValue("uuid")} name1={row.getValue("name")} initial1={row.getValue("initial")} uuid={row.getValue("uuid")}/>
        <DeleteCurrency uuid={row.getValue("uuid")}/>
      </div>,
    enableSorting: false,
  },
]
