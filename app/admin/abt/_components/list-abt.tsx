import { DataTable } from "@/app/admin/abt/_components/table/data-table";
import { columns } from "@/app/admin/abt/_components/table/column";
import { getAbt } from "@/services/admin";

export default async function ListAbt({ token }: { token: string }) {
  const data = await getAbt(token);

  return <DataTable columns={columns} data={data} />;
}
