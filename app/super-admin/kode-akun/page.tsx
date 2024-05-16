import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Breadcrumbs from "@/components/breadcrumbs";
import { Suspense } from "react";
import { AccountTable } from "./_components/account-table"
import { AccountTableSkeleteon } from "./_components/skeleton";

export default async function KodeAkun() {
  const session: any = await getServerSession(authOptions);
  const token = session?.user?.token;

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-10 py-8">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Beranda", href: "/super-admin" },
          { label: "Kode Akun", href: "/super-admin/kode-akun", active: true },
        ]}
      />
      <div className="flex flex-col md:flex-row gap-4 md:justify-between md:items-end">
        <h3>Kode Akun</h3>
        {/* <MulaiPengusulan /> */}
      </div>
      <div className="py-6">
        <Suspense fallback={<AccountTableSkeleteon/>}>
          <AccountTable token={token} />
        </Suspense>
      </div>
    </div>
  );
}




