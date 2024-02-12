import { Data, columns } from "@/components/admin/belanja-modal/components/column"
import { DataTable } from "@/components/admin/belanja-modal/components/data-table"
import { getServerSession } from "next-auth"
import { authOptions }from "@/app/api/auth/[...nextauth]/route"
import Breadcrumbs from "@/components/breadcrumbs"

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
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Dashboard', href: '/admin' },
          { label: 'Belanja Modal', href: '/belanja-modal', active: true },
        ]}
      />
      <h2 className="text-3xl font-bold tracking-tight"> Belanja Modal</h2>
      <div className="py-6">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  )
}
