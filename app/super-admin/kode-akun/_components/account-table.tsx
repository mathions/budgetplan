
import { columns } from "./table/column";
import { getAccount } from "@/lib/service-super-admin";
import { DataTable } from "./table/data-table";

export async function AccountTable ({ token } : { token:string }) {
  const data = await getAccount(token)

  return (
    <DataTable columns={columns} data={data} />
  )
}