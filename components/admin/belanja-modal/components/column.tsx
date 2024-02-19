"use client"

import { ColumnDef } from "@tanstack/react-table"

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { statuses } from "./status"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BelmodTable } from "@/lib/definitions"

export const columns: ColumnDef<BelmodTable>[] = [
  {
    accessorKey: "year",
    size: 150,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tahun" />
    ),
    cell: ({ row }) => <div className="ml-4">{row.getValue("year")}</div>
  },
  {
    accessorKey: "office",
    size: 250,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Satuan Kerja" />
      ),
    cell: ({ row }) => <div className="ml-4">{row.getValue("office")}</div>
  },
  {
    accessorKey: "status",
    size: 200,
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
          {status.icon && (
            <status.icon className={status.classname} />
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
          <Link href={`/admin/belanja-modal/usulan/${row.getValue("uuid")}`} className="text-sm">Lihat Usulan</Link>
        </Button>
        <Button asChild variant="link">
          <Link href={`/admin/belanja-modal/dipa/${row.getValue("uuid")}`}>Lihat DIPA</Link>
        </Button>
      </div>,
    enableSorting: false,
  },
]
