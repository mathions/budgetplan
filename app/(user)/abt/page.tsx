import { getServerSession } from "next-auth"
import { authOptions }from "@/app/api/auth/[...nextauth]/route"
import { columns } from "../../../components/user/abt/components/column"
import { DataTable } from "../../../components/user/abt/components/data-table"
import Breadcrumbs from "@/components/breadcrumbs"

type Data = {
  no_urut: string
  status: string
  slug: string
  office: string
  perihal: string
  created_at: string
}

async function getAbt(token:string): Promise<Data[]>  {
  const res = await fetch('http://localhost/skripsi/public/api/abt', {
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