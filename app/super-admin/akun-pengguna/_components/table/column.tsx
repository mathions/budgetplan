"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { User } from "@/lib/definitions"

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    size: 150,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama" />
    ),
    cell: ({ row }) => <div className="ml-4">{row.getValue("name")}</div>
  },
  {
    accessorKey: "username",
    size: 250,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
      ),
    cell: ({ row }) => <div className="ml-4">{row.getValue("username")}</div>
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
    accessorKey: "role",
    size: 150,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Peran" />
      ),
    cell: ({ row }) => <div className="ml-4">{row.getValue("role")}</div>
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
          <Link href={`/super-admin/akun-pengguna/${row.getValue("uuid")}`} >Detail</Link>
        </Button>
      </div>,
    enableSorting: false,
  },
]
