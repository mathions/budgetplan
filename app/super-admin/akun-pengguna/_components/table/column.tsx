"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { User } from "@/lib/definitions"
import { DeleteUser } from "../delete_user"
import { UpdateUser } from "../update_user"

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    size: 200,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama" />
    ),
    cell: ({ row }) => <div className="ml-4">{row.getValue("name")}</div>
  },
  {
    accessorKey: "username",
    size: 200,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
      ),
    cell: ({ row }) => <div className="ml-4">{row.getValue("username")}</div>
  },
  {
    accessorKey: "office",
    size: 200,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Perwakilan" />
      ),
    cell: ({ row }) => <div className="ml-4">{row.getValue("office")}</div>
  },
  {
    accessorKey: "office_code",
    size: 200,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kode" />
      ),
    cell: ({ row }) => <div className="ml-4">{row.getValue("office_code")}</div>
  },
  {
    accessorKey: "country",
    size: 200,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Negara" />
      ),
    cell: ({ row }) => <div className="ml-4">{row.getValue("country")}</div>
  },
  {
    accessorKey: "area",
    size: 200,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Wilayah" />
    ),
    cell: ({ row }) => <div className="ml-4">{row.getValue("area")}</div>,
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
    size: 150,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title=""/>
    ),
    cell: ({ row }) => 
      <div className="flex w-full justify-center gap-4">
        <UpdateUser key={row.getValue("uuid")} username1={row.getValue("username")} role1={row.getValue("role")} name1={row.getValue("name")} office1={row.getValue("office")} office_code1={row.getValue("office_code")} country1={row.getValue("country")} area1={row.getValue("area")} uuid={row.getValue("uuid")}/>
        <DeleteUser uuid={row.getValue("uuid")}/>
      </div>,
    enableSorting: false,
  },
]
