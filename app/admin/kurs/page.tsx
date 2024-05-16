import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Breadcrumbs from "@/components/breadcrumbs";
import { Suspense } from "react";
import { YearTable } from "./_components/year-table";
import { YearTableSkeleteon } from "./_components/skeleton";

export default async function Kurs() {
  const session: any = await getServerSession(authOptions);
  const token = session?.user?.token;

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
        {/* <MulaiPengusulan /> */}
      </div>
      <div className="py-6">
        <Suspense fallback={<YearTableSkeleteon/>}>
          <YearTable token={token} />
        </Suspense>
      </div>
    </div>
  );
}




