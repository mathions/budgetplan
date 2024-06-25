import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Breadcrumbs from "@/components/breadcrumbs";
import { Suspense } from "react";
import { KursTable } from "./_components/kurs-table";
import { YearTableSkeleteon } from "./_components/skeleton";
import { getCurrency } from "@/services/admin";
import { AddKurs } from "./_components/add-kurs";

export default async function DetailPage({ params, }: { params: { uuid: string };}) {
  const session: any = await getServerSession(authOptions);
  const token = session?.user?.token;
  const uuid = params.uuid;
  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-10 py-8">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Tahun Anggaran", href: "/admin/tahun-anggaran" },
          { label: "Detail", href: `/admin/tahun-anggaran/detail/${uuid}`, active: true },
        ]}
      />
      <Suspense fallback={<YearTableSkeleteon />}>
        <KursTable token={token} uuid={uuid} />
      </Suspense>
    </div>
  );
}
