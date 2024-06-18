import { columns } from "./table/column";
import { getUser } from "@/services/super-admin";
import { DataTable } from "./table/data-table";

export async function UserTable({ token }: { token: string }) {
  const data = await getUser(token);

  return (
    <DataTable columns={columns} data={data} />
  )
}
