
import { columns } from "./table/column";
import { getCurrency, getKurs } from "@/lib/service-admin";
import { DataTable } from "./table/data-table";

export async function KursTable ({ token, uuid } : { token:string, uuid:string }) {
  const data = await getKurs(token, uuid)
  const currency = await getCurrency(token)
  return (
    <DataTable columns={columns} data={data} currency={currency} uuid={uuid}/>
  )
}