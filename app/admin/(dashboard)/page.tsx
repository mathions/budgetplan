import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getServerSession } from "next-auth"
import { authOptions }from "@/app/api/auth/[...nextauth]/route"

export default async function Dashboard () {
  const session = await getServerSession(authOptions)
  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="my-6 flex-1 space-y-4 ">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Peta Satuan Kerja</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                {/* <Overview /> */}
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Belanja Modal</CardTitle>
                <CardDescription>
                  Jumlah Pengajuan Usulan
                  Pengajuan Belum Diproses
                  Pengajuan Diterima
                  Pengajuan Ditolak
                  Pengajuan Telah Disesuaikan
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* <RecentSales /> */}
              </CardContent>
            </Card>
          </div>
      </div>
    </>
  )
}