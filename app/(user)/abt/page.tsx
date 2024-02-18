import { getServerSession } from "next-auth"
import { authOptions }from "@/app/api/auth/[...nextauth]/route"
import { DataTable } from "@/components/user/abt/components/data-table"
import Breadcrumbs from "@/components/breadcrumbs"
import { columns } from "@/components/user/abt/components/column"
import { getAbt } from "@/lib/service"

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