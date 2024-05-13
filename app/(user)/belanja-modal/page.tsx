import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Breadcrumbs from "@/components/breadcrumbs";
import { Suspense } from "react";
import BelanjaModalCard from "@/app/(user)/belanja-modal/_components/belanja-modal-card";
import { CardSkeleton } from "./_components/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function BelanjaModal() {
  const session: any = await getServerSession(authOptions);
  const token = session?.user?.token;
  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-10 py-8">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Beranda", href: "/beranda" },
          { label: "Belanja Modal", href: "/belanja-modal", active: true },
        ]}
      />
      <div className="flex justify-between items-end">
        <h3>Belanja Modal</h3>
        <Button variant="link" asChild className="p-0 h-fit">
          <Link href="/belanja-modal/tahun-sebelumnya">Lihat lainnya</Link>
        </Button>
      </div>
      <div className="my-6">
        <Suspense fallback={<CardSkeleton />}>
          <BelanjaModalCard token={token} />
        </Suspense>
      </div>
    </div>
  );
}
