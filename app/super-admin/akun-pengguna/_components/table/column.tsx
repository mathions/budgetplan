"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { User } from "@/lib/definitions"
import { DeleteUser } from "../delete_user"
import { UpdateUser } from "../update_user"

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
      <DataTableColumnHeader column={column} title="Perwakilan" />
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
        {/* <UpdateAccount number={row.getValue("account_code")} name={row.getValue("account_name")} uuid={row.getValue("uuid")} /> */}
        <UpdateUser username1={row.getValue("username")} role1={row.getValue("role")} name1={row.getValue("name")} office1={row.getValue("office")} office_code1={row.getValue("office_code")} area1={row.getValue("area")} uuid={row.getValue("uuid")}/>
        <DeleteUser uuid={row.getValue("uuid")}/>
      </div>,
    enableSorting: false,
  },
]
