import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Breadcrumbs from "@/components/breadcrumbs";
import { Suspense } from "react";
import { NotifSkeleton } from "@/components/notifikasi/skeleton";
import { SuspensePage } from "@/components/notifikasi/suspense-page";

export default async function NotifikasiPage () {
  const session: any = await getServerSession(authOptions);
  const token = session?.user?.token;

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-10 py-8">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Notifikasi", href: "admin/notifikasi", active: true },
        ]}
      />
      <div>
        <h3>Notifikasi</h3>
      </div>
      <div className="py-6">
        <Suspense fallback={<NotifSkeleton/>}>
          <SuspensePage token={token} />
        </Suspense>
      </div>
    </div>
  );
}