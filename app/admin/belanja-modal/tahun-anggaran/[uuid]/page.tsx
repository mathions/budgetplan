import { getServerSession } from "next-auth"
import { authOptions }from "@/app/api/auth/[...nextauth]/route"
import { getDetailYear } from "@/lib/service-admin";
import Breadcrumbs from "@/components/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import UnggahDipa from "@/components/admin/belanja-modal/tahun-anggaran/unggah-dipa";

export default async function TahunAnggaran ({ params }: {params: { uuid: string } }) {
  const uuid = params.uuid;
  const session: any = await getServerSession(authOptions)
  const token = session?.user?.token;
  const detail = await getDetailYear(token, uuid)
  console.log(detail)
  let status;
  if(detail?.is_active === '1') {
    status = 'Aktif'
  } else {
    status = 'Selesai'
  }

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Dashboard', href: '/admin' },
          { label: 'Belanja Modal', href: '/admin/belanja-modal'},
          { label: 'Tahun Anggaran', href: `/admin/belanja-modal/tahun-anggaran/${uuid}`, active: true },
        ]}
      />
      <h1 className="text-3xl font-bold tracking-tight">Tahun Anggaran</h1>
      <div className="my-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Tahun Anggaran {detail?.year}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold leading-none">Status</p>
              <p>{status}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold leading-none">Jumlah Pengajuan</p>
              <p className="">{detail?.proposal_count}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold leading-none">Dokumen DIPA</p>
              <p className="">{detail?.dipa_path}</p>
              <UnggahDipa token={token} uuid={uuid} />
            </div>
            </div>
          </CardContent>
        </Card>  
      </div>
    </>
  )
}