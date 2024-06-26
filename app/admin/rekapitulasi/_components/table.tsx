import { columns } from "./table/column";
import { getRecap, getYear } from "@/services/admin";
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
  const year = await getYear(token);

  return (
    <DataTable columns={columns} data={data} token={token} year={year} />
  )
}