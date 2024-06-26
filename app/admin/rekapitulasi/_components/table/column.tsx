"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { Rekapitulasi } from "../table"
import { years, codes } from "./data"

export const columns: ColumnDef<Rekapitulasi>[] = [
  {
    accessorKey: "year",
    size: 70,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tahun" />
    ),
    cell: ({ row }) => <div className="ml-4">{row.getValue("year")}</div>
  },
  {
    accessorKey: "office",
    size: 100,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Perwakilan" />
    ),
    cell: ({ row }) => <div className="ml-4">{row.getValue("office")}</div>
  },
  {
    accessorKey: "code",
    size: 100,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Komponen" />
    ),
    cell: ({ row }) => {
      const code = codes.find(
        (code) => code.value === row.getValue("code")
      )
      if (!code) {
        return null
      }
      return (
        <div className="ml-4">
          <span>{code.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "volume",
    size: 100,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Volume" />
    ),
    cell: ({ row }) => <div className="ml-4 ">{row.getValue("volume")}</div>
  },
  {
    accessorKey: "information",
    size: 200,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rincian" />
    ),
    cell: ({ row }) => <div className="ml-4">{row.getValue("information")}</div>
  },
  {
    accessorKey: "total",
    size: 100,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Anggaran" />
    ),
    cell: ({ row }) => <div className="text-right mr-4">Rp {(row.getValue("total") as number).toLocaleString("id-ID")}</div>
  },
]
