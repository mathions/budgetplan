"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { User } from "@/lib/definitions"
import { Rekapitulasi } from "../table"
import { years, offices, codes } from "./data"

export const columns: ColumnDef<Rekapitulasi>[] = [
  {
    accessorKey: "year",
    size: 100,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tahun" />
    ),
    cell: ({ row }) => {
      const year = years.find(
        (year) => year.value === row.getValue("year")
      )

      if (!year) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          <span>{year.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "office",
    size: 100,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Satuan Kerja" />
    ),
    cell: ({ row }) => {
      const office = offices.find(
        (office) => office.value === row.getValue("office")
      )

      if (!office) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          <span>{office.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
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
        <div className="flex w-[100px] items-center">
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
    cell: ({ row }) => <div className="ml-4">{row.getValue("volume")}</div>
  },
  {
    accessorKey: "rincian",
    size: 100,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rincian" />
    ),
    cell: ({ row }) => <div className="ml-4">{row.getValue("rincian")}</div>
  },
  {
    accessorKey: "anggaran",
    size: 100,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Anggaran" />
    ),
    cell: ({ row }) => <div className="ml-4">{row.getValue("anggaran")}</div>
  },
]
