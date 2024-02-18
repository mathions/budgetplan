import { getServerSession } from "next-auth"
import { authOptions }from "@/app/api/auth/[...nextauth]/route"
import Breadcrumbs from "@/components/breadcrumbs"
import { DataTable } from "@/components/admin/belanja-modal/components/data-table";
import { columns } from "@/components/admin/belanja-modal/components/column";
import { getDetailYear, getProposal, getYear } from "@/lib/service-admin";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { columns as yearColumns } from "@/components/admin/belanja-modal/tahun-anggaran/column"
import { DataTable as YearTable } from "@/components/admin/belanja-modal/tahun-anggaran/data-table"

export default async function BelanjaModal() {
  const session: any = await getServerSession(authOptions)
  const token = session?.user?.token;
  const data = await getProposal(token)
  const year = await getYear(token)
  
  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Dashboard', href: '/admin' },
          { label: 'Belanja Modal', href: '/belanja-modal', active: true },
        ]}
      />
      <h2 className="text-3xl font-bold tracking-tight"> Belanja Modal</h2>
      <div className="py-6">
        <Tabs defaultValue="pengajuan" className="w-full">
          <TabsList>
            <TabsTrigger value="pengajuan">Pengajuan</TabsTrigger>
            <TabsTrigger value="tahun-anggaran">Tahun Anggaran</TabsTrigger>
          </TabsList>
          <TabsContent value="pengajuan">
            <div className="py-2">
              <DataTable columns={columns} data={data} />
            </div>
          </TabsContent>
          <TabsContent value="tahun-anggaran">
            <div className="py-2">
              <YearTable columns={yearColumns} data={year} />
            </div>
          </TabsContent>
        </Tabs>
      </div>

    </>
  )
}
