import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Breadcrumbs from "@/components/breadcrumbs";
import { redirect } from "next/navigation";
import { CardSkeleton } from "./_components/skeleton";
import { Suspense } from "react";
import SuspensePage from "./_components/suspense-page";
import { Ajukan } from "./_components/ajukan";

export default async function Usulan({ params }: { params: { uuid: string } }) {
  const uuid = params.uuid;
  const session: any = await getServerSession(authOptions);
  const token = session?.user?.token;

  if (!session) {
    return redirect("/auth/login");
  }

  return (
    <div className="mx-auto px-4 md:px-20 py-8">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Beranda", href: "/beranda" },
          { label: "Belanja Modal", href: "/belanja-modal" },
          {
            label: "Penyampaian Usulan",
            href: `/belanja-modal/usulan/${uuid}`,
            active: true,
          },
        ]}
      />
      <div className="flex flex-col md:flex-row gap-4 md:justify-between md:items-end">
        <h3>Penyampaian Usulan</h3>
        <div className="flex gap-4">
          <Ajukan uuid={uuid} token={token} />
        </div>
      </div>
      <div className="my-6 space-y-4">
        <Suspense fallback={<CardSkeleton />}>
          <SuspensePage uuid={uuid} token={token}/>
        </Suspense>
      </div>
    </div>
  );
}
