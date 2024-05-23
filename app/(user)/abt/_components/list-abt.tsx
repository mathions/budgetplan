import { getAbt } from "@/lib/service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { columns } from "@/app/(user)/abt/_components/table/column";
import { DataTable } from "@/app/(user)/abt/_components/table/data-table";

export default async function ListAbt() {
  const session: any = await getServerSession(authOptions);
  const token = session?.user?.token;
  const data = await getAbt(token);

  return <DataTable columns={columns} data={data} />;
}
