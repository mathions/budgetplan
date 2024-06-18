import { DataTable } from "@/app/admin/belanja-modal/_components/table/data-table";
import { columns } from "@/app/admin/belanja-modal/_components/table/column";
import { getProposal } from "@/services/admin";

export default async function ListBelmod({ token }: { token: string }) {
  const data = await getProposal(token);

  return <DataTable columns={columns} data={data} />;
}
