import { getAbt } from "@/lib/service";
import { columns } from "@/app/(user)/abt/_components/table/column";
import { DataTable } from "@/app/(user)/abt/_components/table/data-table";

export default async function ListAbt({token} : {token: string}) {
  const data = await getAbt(token);
  return <DataTable columns={columns} data={data} />;
}
