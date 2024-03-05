import { DataTable } from "@/components/admin/abt/table/data-table"
import { columns } from "@/components/admin/abt/table/column"
import { getAbt } from "@/lib/service-admin"

export default async function ListAbt ({ token } : { token:string }) {
  const data = await getAbt(token)

  return (
    <DataTable columns={columns} data={data} />
  )
}