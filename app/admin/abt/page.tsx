import { getServerSession } from "next-auth"
import { authOptions }from "@/app/api/auth/[...nextauth]/route"
import Breadcrumbs from "@/components/breadcrumbs"
import { DataTable } from "@/components/admin/abt/components/data-table"
import { columns } from "@/components/admin/abt/components/column"
import { getAbt } from "@/lib/service-admin"

export default async function Abt () {
  const session: any = await getServerSession(authOptions)
  const token = session?.user?.token;
  const data = await getAbt(token)

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Dashboard', href: '/admin' },
          { label: 'ABT', href: '/admin/abt', active: true },
        ]}
      />
      <h2 className="text-3xl font-bold tracking-tight">ABT</h2>

      <div className="my-6">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  )
}