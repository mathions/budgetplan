
import { columns } from "./table/column";
import { getYear } from "@/lib/service-admin";
import { DataTable } from "./table/data-table";

export async function YearTable ({ token } : { token:string }) {
  const data = await getYear(token)

  return (
    <DataTable columns={columns} data={data} />
  )
}