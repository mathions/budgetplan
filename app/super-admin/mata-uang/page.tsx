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
  const tkn =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3OGQyMzUyMi02YTQ4LTRjNGEtYjI3Yi05YmM2M2RhYTYzNDYiLCJ1c2VybmFtZSI6InVtdW0iLCJ1c2VyUm9sZSI6ImFkbWluIiwiaWF0IjoxNzE1OTkzNDQ0LCJleHAiOjE3MTYwNzk4NDR9.OFVl9xqRUWP8HwUU7w1xM-mSQ_i-74AsdLw9m9gKzwA";

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
