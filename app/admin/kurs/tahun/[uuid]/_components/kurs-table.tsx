
import { columns } from "./table/column";
import { getKurs } from "@/lib/service-admin";
import { DataTable } from "./table/data-table";

export async function KursTable ({ token, uuid } : { token:string, uuid:string }) {
  const data = await getKurs(token, uuid)
  console.log(uuid)
  return (
    <DataTable columns={columns} data={data} />
  )
}