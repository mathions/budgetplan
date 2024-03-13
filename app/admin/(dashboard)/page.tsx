import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getServerSession } from "next-auth"
import { authOptions }from "@/app/api/auth/[...nextauth]/route"
import StatusBelmod from "@/components/admin/dashboard/status-belmod";
import Rab from "@/components/admin/dashboard/rab";
import StatusAbt from "@/components/admin/dashboard/status-abt";
import Peta from "@/components/admin/dashboard/peta";
import PengajuanAbt from "@/components/admin/dashboard/pengajuan-abt";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
}

export default async function Dashboard () {
  const session = await getServerSession(authOptions)
  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="my-6 flex-1 space-y-4 ">
          <div className="lg:grid lg:grid-cols-3 gap-4 space-y-4 lg:space-y-0">
            <div className="col-span-1">
              <StatusBelmod />
            </div>
            <div className="col-span-2">
              <Peta />
            </div>
            <div className="col-span-3">
              <Rab />
            </div>
            <div className="col-span-1">
              <StatusAbt />
            </div>
            <div className="col-span-2">
              <PengajuanAbt />
            </div>
          </div>
      </div>
    </>
  )
}