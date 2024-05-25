import Breadcrumbs from "@/components/breadcrumbs";
import { Suspense } from "react";
import Table from "@/app/(user)/abt/_components/list-abt";
import { TableAbtSkeleton } from "@/components/user/skeletons";
import { CreateABT } from "./_components/create-abt";

export default function Abt() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-10 py-8">
      <Breadcrumbs
        breadcrumbs={[
          { label: "Beranda", href: "/beranda" },
          { label: "ABT", href: "/abt", active: true },
        ]}
      />
      <div className="flex flex-col md:flex-row gap-4 md:justify-between md:items-end">
        <h3>Anggaran Biaya Tambahan</h3>
        <CreateABT/>
      </div>

      <div className="my-6">
        <Suspense fallback={<TableAbtSkeleton />}>
          <Table/>
        </Suspense>
      </div>
    </div>
  );
}
