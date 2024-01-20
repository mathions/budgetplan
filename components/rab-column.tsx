"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type RAB = {
  kode: string
  uraian: string
  rincian: string
  harga: string
  jumlah: string
}

export const columns: ColumnDef<RAB>[] = [
  {
    accessorKey: "kode",
    header: "Kode",
  },
  {
    accessorKey: "uraian",
    header: "Uraian",
  },
  {
    accessorKey: "rincian",
    header: "Rincian",
  },
  {
    accessorKey: "harga",
    header: "Harga",
  },
  {
    accessorKey: "jumlah",
    header: "Jumlah",
  },
]
