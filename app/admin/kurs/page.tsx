import Breadcrumbs from "@/components/breadcrumbs";
import { Suspense } from "react";
import { YearTable } from "./_components/year-table";
import { YearTableSkeleteon } from "./_components/skeleton";

export default async function Kurs() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-10 py-8">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Kurs", href: "/admin/kurs", active: true },
        ]}
      />
      <h3>Kurs</h3>
      <div className="py-6">
        <Suspense fallback={<YearTableSkeleteon />}>
          <YearTable />
        </Suspense>
      </div>
    </div>
  );
}
