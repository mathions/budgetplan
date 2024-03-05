import { getServerSession } from "next-auth"
import { authOptions }from "@/app/api/auth/[...nextauth]/route"
import Breadcrumbs from "@/components/breadcrumbs"
import { Suspense } from "react";
import ListBelmod from "@/components/admin/belanja-modal/list-belmod";
import { TableBelmodSkeleton } from "@/components/admin/skeletons";

export default async function BelanjaModal() {
  const session: any = await getServerSession(authOptions)
  const token = session?.user?.token;
  
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
        <Suspense fallback={<TableBelmodSkeleton/>}>
          <ListBelmod token={token}/>
        </Suspense>
      </div>
    </>
  )
}
