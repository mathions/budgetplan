import { getServerSession } from "next-auth"
import { authOptions }from "@/app/api/auth/[...nextauth]/route"
import Breadcrumbs from "@/components/breadcrumbs";
import { Suspense } from "react";
import SuspensePage from "./_components/suspense-page";
import { CardSkeleton } from "./_components/skeleton";
import { redirect } from "next/navigation";

export default async function Dipa({ params }: {params: { uuid: string } }) {
  const uuid = params.uuid;
  const session: any = await getServerSession(authOptions)
  const token = session?.user?.token;

  if (!session) {
    return redirect("/auth/login");
  }

  return (
    <div className="mx-auto px-4 md:px-20 py-8">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Beranda', href: '/beranda' },
          { label: 'Belanja Modal', href: '/belanja-modal' },
          { label: 'Penyesuaian RAB', href: `/belanja-modal/penyesuaian/${uuid}`, active: true }
        ]}
      />
      <h3>Hasil Penyesuaian RAB</h3>
      <div className="my-6 space-y-4">
        <Suspense fallback={<CardSkeleton />}>
          <SuspensePage uuid={uuid} token={token}/>
        </Suspense>
      </div>
    </div>
  );
}
