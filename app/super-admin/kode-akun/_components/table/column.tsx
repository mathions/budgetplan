"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Account } from "@/lib/definitions"
import { Trash } from "iconsax-react"

export const columns: ColumnDef<Account>[] = [
  {
    accessorKey: "account_code",
    size: 100,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kode Akun" />
    ),
    cell: ({ row }) => <div className="ml-4">{row.getValue("account_code")}</div>
  },
  {
    accessorKey: "account_name",
    size: 300,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Uraian Akun" />
      ),
    cell: ({ row }) => <div className="ml-4">{row.getValue("account_name")}</div>
  },
  {
    accessorKey: "uuid",
    enableResizing: false,
    size: 100,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title=""/>
    ),
    cell: ({ row }) => 
      <div className="flex w-full gap-2 justify-start">
        <Button asChild variant="secondary" size="icon" className="h-10 w-10">
          <Trash className="h-8 w-8 "/>
          {/* <Link href={`/super-admin/akun-pengguna/${row.getValue("uuid")}`} >Detail</Link> */}
        </Button>
      </div>,
    enableSorting: false,
  },
]
