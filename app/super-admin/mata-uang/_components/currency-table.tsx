import { columns } from "./table/column";
import { getCurrency } from "@/services/super-admin";
import { DataTable } from "./table/data-table";

export async function CurrencyTable ({ token } : { token:string }) {
  const data = await getCurrency(token)
  return (
    <DataTable columns={columns} data={data} />
  )
}