import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import StatusBelmod from "@/app/admin/(dashboard)/_components/status-belmod";
import Rab from "@/app/admin/(dashboard)/_components/rab";
import StatusAbt from "@/app/admin/(dashboard)/_components/status-abt";
import Peta from "@/app/admin/(dashboard)/_components/peta";
import Breadcrumbs from "@/components/breadcrumbs";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-10 py-8">
      <Breadcrumbs
        breadcrumbs={[{ label: "Dashboard", href: "/admin", active: true }]}
      />
      <h3>Dashboard</h3>

      <div className="my-6 flex-1 space-y-4 ">
        <div className="md:grid md:grid-cols-3 gap-6 space-y-6 md:space-y-0">
          <div className="col-span-2">
            <div className="space-y-6">
              <Peta />
              <Rab />
            </div>
          </div>
          <div className="col-span-1 space-y-6">
            <StatusBelmod />
            <StatusAbt />
          </div>
        </div>
      </div>
    </div>
  );
}
