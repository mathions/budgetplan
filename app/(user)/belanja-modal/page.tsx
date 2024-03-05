
import { getServerSession } from "next-auth"
import { authOptions }from "@/app/api/auth/[...nextauth]/route"
import Breadcrumbs from "@/components/breadcrumbs"
import { Suspense } from "react";
import BelanjaModalCard from "@/components/user/belanja-modal/belanja-modal-card";
import { BelmodCardSkeleton } from "@/components/user/skeletons";


export default async function BelanjaModal () {
  const session: any = await getServerSession(authOptions)
  const token = session?.user?.token;
  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Beranda', href: '/beranda' },
          { label: 'Belanja Modal', href: '/belanja-modal', active: true },
        ]}
      />
      <h1 className="text-3xl font-bold tracking-tight">Belanja Modal</h1>
      <div className="my-6">
        <Suspense fallback={<BelmodCardSkeleton/>}>
          <BelanjaModalCard token={token}/>
        </Suspense>
      </div>
    </>
  )
}