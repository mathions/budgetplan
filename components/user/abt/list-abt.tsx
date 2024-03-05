import { getAbt } from "@/lib/service"
import { columns } from "@/components/user/abt/table/column"
import { DataTable } from "@/components/user/abt/table/data-table"

export default async function ListAbt ({ token } : { token:string }) {
  const data = await getAbt(token)

  return (
    <DataTable columns={columns} data={data} />
  )
}