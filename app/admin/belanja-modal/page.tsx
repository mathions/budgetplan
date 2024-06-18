import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Breadcrumbs from "@/components/breadcrumbs";
import { Suspense } from "react";
import ListBelmod from "@/app/admin/belanja-modal/_components/list-belmod";
import { TableSkeleton } from "./_components/skeleton";
import { MulaiPengusulan } from "./_components/mulai-pengusulan";

export default async function BelanjaModal() {
  const session: any = await getServerSession(authOptions);
  const token = session?.user?.token;

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-10 py-8">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Belanja Modal", href: "/belanja-modal", active: true },
        ]}
      />
      <div className="flex flex-col md:flex-row gap-4 md:justify-between md:items-end">
        <h3> Belanja Modal</h3>
        <MulaiPengusulan token={token}/>
      </div>
      <div className="py-6">
        <Suspense fallback={<TableSkeleton />}>
          <ListBelmod token={token} />
        </Suspense>
      </div>
    </div>
  );
}
