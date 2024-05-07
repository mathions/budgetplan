import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Breadcrumbs from "@/components/breadcrumbs";
import { Suspense } from "react";
import Table from "@/components/user/abt/list-abt";
import { TableAbtSkeleton } from "@/components/user/skeletons";

export default async function Abt() {
  const session: any = await getServerSession(authOptions);
  const token = session?.user?.token;
  // const data = await getAbt(token)

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Beranda", href: "/beranda" },
          { label: "ABT", href: "/abt", active: true },
        ]}
      />
      <h2 className="text-3xl font-bold tracking-tight">ABT</h2>

      <div className="my-6">
        <Suspense fallback={<TableAbtSkeleton />}>
          <Table token={token} />
        </Suspense>
      </div>
    </>
  );
}
