import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Breadcrumbs from "@/components/breadcrumbs";
import { Suspense } from "react";
import { UserTable } from "./_components/user-table"
import { UserTableSkeleteon } from "./_components/skeleton";

export default async function AkunPengguna() {
  const session: any = await getServerSession(authOptions);
  const token = session?.user?.token;

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-10 py-8">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Beranda", href: "/super-admin" },
          { label: "Akun Pengguna", href: "/super-admin/akun-pengguna", active: true },
        ]}
      />
      <div className="flex flex-col md:flex-row gap-4 md:justify-between md:items-end">
        <h3>Akun Pengguna</h3>
        {/* <MulaiPengusulan /> */}
      </div>
      <div className="py-6">
        <Suspense fallback={<UserTableSkeleteon/>}>
          <UserTable token={token} />
        </Suspense>
      </div>
    </div>
  );
}




