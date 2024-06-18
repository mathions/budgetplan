import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Breadcrumbs from "@/components/breadcrumbs";
import { Suspense } from "react";
import { ProfilSkeleton } from "@/components/profil/skeleton";
import { SuspensePage } from "@/components/profil/suspense-page";

export default async function ProfilPage () {
  const session: any = await getServerSession(authOptions);
  const token = session?.user?.token;

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-10 py-8">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Profil", href: "/profil", active: true },
        ]}
      />
      <div>
        <h3>Profil</h3>
      </div>
      <div className="py-6">
        <Suspense fallback={<ProfilSkeleton/>}>
          <SuspensePage token={token} />
        </Suspense>
      </div>
    </div>
  );
}