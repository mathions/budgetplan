import { DataTable } from "@/components/admin/belanja-modal/table/data-table";
import { columns } from "@/components/admin/belanja-modal/table/column";
import { getProposal } from "@/lib/service-admin";

export default async function ListBelmod ({ token } : { token:string }) {
  const data = await getProposal(token)

  return (
    <DataTable columns={columns} data={data} />
  )
}