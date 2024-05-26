import { getServerSession } from "next-auth"
import { authOptions }from "@/app/api/auth/[...nextauth]/route"
import Breadcrumbs from "@/components/breadcrumbs";
import { BeriKeputusan } from "./_components/beri-keputusan";
import { Suspense } from "react";
import { CardSkeleton } from "./_components/skeleton";
import SuspensePage from "./_components/suspense-page";

export default async function Detail({ params }: {params: { uuid: string } }) {
  const uuid = params.uuid;
  const session: any = await getServerSession(authOptions)
  const token = session?.user?.token;

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-10 py-8">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Dashboard', href: '/admin' },
          { label: 'ABT', href: '/admin/abt' },
          { label: 'Detail', href: `/admin/abt/detail/${uuid}`, active: true }
        ]}
      />
      <div className="flex flex-col md:flex-row gap-4 md:justify-between md:items-end">
        <h3>Detail Pengajuan ABT</h3>
        <BeriKeputusan token={token} uuid={uuid}/>
      </div>
      <div className="my-6">
        <Suspense fallback={<CardSkeleton />}>
          <SuspensePage uuid={uuid} token={token}/>
        </Suspense>
      </div>
    </div>
  );
}
