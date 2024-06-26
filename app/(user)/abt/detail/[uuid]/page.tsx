import { getServerSession } from "next-auth"
import { authOptions }from "@/app/api/auth/[...nextauth]/route"
import Breadcrumbs from "@/components/breadcrumbs";
import { Suspense } from "react";
import SuspensePage from "./_components/suspense-page";
import { CardSkeleton } from "./_components/skeleton";
import { redirect } from "next/navigation";
import Batal from "./_components/batal";

export default async function Detail({ params }: {params: { uuid: string } }) {
  const uuid = params.uuid;
  const session: any = await getServerSession(authOptions)
  const token = session?.user?.token;

  if (!session) {
    return redirect("/auth/login");
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-10 py-8">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Beranda', href: '/beranda' },
          { label: 'ABT', href: '/abt' },
          { label: 'Detail Pengajuan ABT', href: `/abt/detail/${uuid}`, active: true }
        ]}
      />
      
      <div className="flex flex-col md:flex-row gap-4 md:justify-between md:items-end">
        <h3>Detail Pengajuan ABT</h3>
        <Batal uuid={uuid} token={token}/>
      </div>
      <div className="my-6">
        <Suspense fallback={<CardSkeleton />}>
          <SuspensePage uuid={uuid} token={token}/>
        </Suspense>
      </div>
    </div>
  );
}
