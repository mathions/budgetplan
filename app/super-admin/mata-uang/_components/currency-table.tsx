
import { columns } from "./table/column";
import { getCurrency } from "@/lib/service-super-admin";
import { DataTable } from "./table/data-table";

export async function CurrencyTable ({ token } : { token:string }) {
  const tkn = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3OGQyMzUyMi02YTQ4LTRjNGEtYjI3Yi05YmM2M2RhYTYzNDYiLCJ1c2VybmFtZSI6InVtdW0iLCJ1c2VyUm9sZSI6ImFkbWluIiwiaWF0IjoxNzE1OTkzNDQ0LCJleHAiOjE3MTYwNzk4NDR9.OFVl9xqRUWP8HwUU7w1xM-mSQ_i-74AsdLw9m9gKzwA"
  const data = await getCurrency(tkn)

  return (
    <DataTable columns={columns} data={data} />
  )
}