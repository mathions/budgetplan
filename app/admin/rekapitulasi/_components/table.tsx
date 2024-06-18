import { columns } from "./table/column";
import { getRecap } from "@/services/admin";
import { DataTable } from "./table/data-table";

export type Rekapitulasi = {
  year: string;
  office: string;
  code: string;
  volume: string;
  information: string;
  total: string;
};

export async function Table({ token }: { token: string }) {
  const data = await getRecap(token);

  return (
    <DataTable columns={columns} data={data} />
  )
}