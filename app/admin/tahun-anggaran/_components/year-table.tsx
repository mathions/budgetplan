import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { columns } from "./table/column";
import { getYear } from "@/services/admin";
import { DataTable } from "./table/data-table";

export async function YearTable() {
  const session: any = await getServerSession(authOptions);
  const token = session?.user?.token;

  const data = await getYear(token);

  return <DataTable columns={columns} data={data} />;
}
