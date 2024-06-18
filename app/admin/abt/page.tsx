import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Breadcrumbs from "@/components/breadcrumbs";
import { Suspense } from "react";
import { TableSkeleton } from "./_components/skeleton";
import ListAbt from "@/app/admin/abt/_components/list-abt";

export default async function Abt() {
  const session: any = await getServerSession(authOptions);
  const token = session?.user?.token;

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-10 py-8">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "ABT", href: "/admin/abt", active: true },
        ]}
      />
      <h3>ABT</h3>
      <div className="my-6">
        <Suspense fallback={<TableSkeleton />}>
          <ListAbt token={token} />
        </Suspense>
      </div>
    </div>
  );
}
