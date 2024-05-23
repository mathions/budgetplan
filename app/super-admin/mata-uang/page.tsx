import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Breadcrumbs from "@/components/breadcrumbs";
import { Suspense } from "react";
import { CurrencyTable } from "./_components/currency-table";
import { TableSkeleteon } from "./_components/skeleton";
import { AddCurrency } from "./_components/add-currency";

export default async function MataUang() {
  const session: any = await getServerSession(authOptions);
  const token = session?.user?.token;
  
  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-10 py-8">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Beranda", href: "/super-admin" },
          { label: "Mata Uang", href: "/super-admin/mata-uang", active: true },
        ]}
      />
      <h3>Mata Uang</h3>
      <div className="py-6">
        <Suspense fallback={<TableSkeleteon />}>
          <CurrencyTable token={token} />
        </Suspense>
      </div>
    </div>
  );
}
