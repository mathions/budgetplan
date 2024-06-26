import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Breadcrumbs from "@/components/breadcrumbs";
import { Suspense } from "react";
import { Table } from "./_components/table";
import { TableSkeleteon } from "./_components/skeleton";
import { Ekspor } from "./_components/ekspor";

export default async function Rekapitulasi () {
  const session: any = await getServerSession(authOptions);
  const token = session?.user?.token;

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-10 py-8">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Rekapitulasi", href: "/admin/rekapitulasi", active: true },
        ]}
      />
      <div className="flex flex-col md:flex-row gap-4 md:justify-between md:items-end">
        <h3>Rekapitulasi</h3>
      </div>
      <div className="py-6">
        <Suspense fallback={<TableSkeleteon/>}>
          <Table token={token} />
        </Suspense>
      </div>
    </div>
  );
}