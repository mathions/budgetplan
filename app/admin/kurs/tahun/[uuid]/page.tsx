import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Breadcrumbs from "@/components/breadcrumbs";
import { Suspense } from "react";
import { KursTable } from "./_components/kurs-table";
import { YearTableSkeleteon } from "./_components/skeleton";
import { getCurrency } from "@/lib/service-admin";
import { AddKurs } from "./_components/add-kurs"

export default async function KursTahun({ params }: {params: { uuid: string } }) {
  const session: any = await getServerSession(authOptions);
  const token = session?.user?.token;
  const uuid = params.uuid;
  const currency = await getCurrency(token);

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-10 py-8">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Kurs", href: "/admin/kurs", active: true },
        ]}
      />
      <div className="flex flex-col md:flex-row gap-4 md:justify-between md:items-end">
        <h3>Kurs</h3>
        <AddKurs token={token} currency={currency} />
      </div>
      <div className="py-6">
        <Suspense fallback={<YearTableSkeleteon/>}>
          <KursTable token={token} uuid={uuid} />
        </Suspense>
      </div>
    </div>
  );
}




