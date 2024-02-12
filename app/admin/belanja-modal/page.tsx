import { Data, columns } from "./components/column"
import { DataTable } from "./components/data-table"
import { ChevronRightIcon } from "@radix-ui/react-icons"
import { getServerSession } from "next-auth"
import { authOptions }from "@/app/api/auth/[...nextauth]/route"

async function getProposal(token:string): Promise<Data[]>  {
  const res = await fetch('http://localhost/skripsi/public/api/admin/proposal', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
    }
  });
  const jsonResponse = await res.json();
  if (res.status === 200) {
    return jsonResponse.data;
  } else {
    return res.json();
  }
}

export default async function BelanjaModal() {
  const session: any = await getServerSession(authOptions)
  const token = session?.user?.token;

  const data = await getProposal(token)

  return (
    <>
      <div className="flex items-center space-x-2 mb-4">
        <div className="text-foreground/70 text-[14px]">Dashboard</div>
        <div className="text-foreground/70 "><ChevronRightIcon/></div>
        <div className="text-[14px]">Belanja Modal</div>
      </div>
      <h2 className="text-3xl font-bold tracking-tight"> Belanja Modal</h2>
      <div className="py-6">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  )
}
