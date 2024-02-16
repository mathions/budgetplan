import { getServerSession } from "next-auth"
import { authOptions }from "@/app/api/auth/[...nextauth]/route"
import { DataTable } from "@/components/user/abt/components/data-table"
import Breadcrumbs from "@/components/breadcrumbs"
import { columns } from "@/components/user/abt/components/column"

type Data = {
  no_urut: string
  uuid: string
  status: string
  office: string
  perihal: string
  created_at: string
}

async function getAbt(token:string): Promise<Data[]>  {
  const res = await fetch('https://budgetplan.masuk.id/api/v1/abt', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
    }
  });
  const jsonResponse = await res.json();
  console.log(jsonResponse)
  if (res.status === 200) {
    return jsonResponse.data;
  } else {
    return jsonResponse;
  }
}

export default async function Abt () {
  const session: any = await getServerSession(authOptions)
  const token = session?.user?.token;
  const data = await getAbt(token)

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Beranda', href: '/beranda' },
          { label: 'ABT', href: '/abt', active: true },
        ]}
      />
      <h2 className="text-3xl font-bold tracking-tight">ABT</h2>

      <div className="my-6">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  )
}