import { getServerSession } from "next-auth"
import { authOptions }from "@/app/api/auth/[...nextauth]/route"
import Breadcrumbs from "@/components/breadcrumbs";
import { Suspense } from "react";
import { CardSkeleton } from "./_components/skeleton";
import SuspensePage from "./_components/suspense-page";
import { redirect } from "next/navigation";
import BeriKeputusan from "./_components/beri-keputusan";
import { UbahDeadline } from "./_components/ubah-deadline";

export default async function Usulan({ params }: {params: { uuid: string } }) {
  const uuid = params.uuid;
  const session: any = await getServerSession(authOptions)
  const token = session?.user?.token;

  if(!session){
    redirect('/auth/login')
  }

  return (
    <div className="mx-auto px-4 md:px-20 py-8">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Dashboard', href: '/admin' },
          { label: 'Belanja Modal', href: '/admin/belanja-modal'},
          { label: 'Detail Belanja Modal', href: '/admin/belanja-modal/detail', active: true },
        ]}
      />
      <div className="flex flex-col md:flex-row gap-4 md:justify-between md:items-end">
        <h3>Detail Belanja Modal</h3>
      </div>
      <div className="my-8">
        <Suspense fallback={<CardSkeleton />}>
          <SuspensePage uuid={uuid} token={token}/>
        </Suspense>
      </div>
      </div>
  );
}
