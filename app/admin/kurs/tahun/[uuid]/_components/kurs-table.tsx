
import { columns } from "./table/column";
import { getCurrency, getKurs } from "@/lib/service-admin";
import { DataTable } from "./table/data-table";

export async function KursTable ({ token, uuid } : { token:string, uuid:string }) {
  const data = await getKurs(token, uuid)
  const currency = await getCurrency(token)
  console.log(data)
  return (
    <div>
      <h3>Kurs Tahun Anggaran {data?.year}</h3>
      <div className="py-6">
        <DataTable columns={columns} data={data} currency={currency} uuid={uuid}/>
      </div>
    </div>
  )
}