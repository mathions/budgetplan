import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Breadcrumbs from "@/components/breadcrumbs";
import { Suspense } from "react";
import { PageSkeleton } from "./_components/skeleton";
import { SuspensePage } from "./_components/suspense-page"

export default async function DetailPage({ params, }: { params: { uuid: string };}) {
  const session: any = await getServerSession(authOptions);
  const token = session?.user?.token;
  const uuid = params.uuid;
  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-10 py-8">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Beranda", href: "/super-admin" },
          { label: "Akun Pengguna", href: "/super-admin/akun-pengguna"},
          { label: "Detail Akun Pengguna", href: "/super-admin/akun-pengguna/detail", active: true },
        ]}
      />
      <h3>Detail Akun Pengguna</h3>
      <div className="py-6">
        <Suspense fallback={<PageSkeleton />}>
          <SuspensePage token={token} uuid={uuid} />
        </Suspense>
      </div>
    </div>
  );
}
