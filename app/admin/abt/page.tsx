import { getServerSession } from "next-auth"
import { authOptions }from "@/app/api/auth/[...nextauth]/route"
import Breadcrumbs from "@/components/breadcrumbs"
import { Suspense } from "react";
import { TableAbtSkeleton } from "@/components/admin/skeletons";
import ListAbt from "@/components/admin/abt/list-abt";


export default async function Abt () {
  const session: any = await getServerSession(authOptions)
  const token = session?.user?.token;

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
        <Suspense fallback={<TableAbtSkeleton/>}>
          <ListAbt token={token}/>
        </Suspense>
      </div>
    </>
  )
}