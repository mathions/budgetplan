import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import Breadcrumbs from "@/components/breadcrumbs";
import { Suspense } from "react";
import { SuspensePage } from "./_components/suspense-page";
import { CardSkeleton } from "./_components/skeleton";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-10 py-8">
      <Breadcrumbs
        breadcrumbs={[{ label: "Dashboard", href: "/admin", active: true }]}
      />
      <h3>Dashboard</h3>
      <div className="my-6">
        <Suspense fallback={<CardSkeleton />}>
          <SuspensePage />
        </Suspense>
      </div>
    </div>
  );
}
