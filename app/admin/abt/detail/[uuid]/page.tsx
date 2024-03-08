import { getServerSession } from "next-auth"
import { authOptions }from "@/app/api/auth/[...nextauth]/route"
import Breadcrumbs from "@/components/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getFilesAbt, getDetailAbt } from "@/lib/service-admin";
import DownloadAbt from "@/components/admin/abt/detail/download-abt";
import { Button } from "@/components/ui/button";
import UbahStatus from "@/components/admin/abt/detail/ubah-status";
import Link from "next/link";

export default async function Detail({ params }: {params: { uuid: string } }) {
  const uuid = params.uuid;
  const session: any = await getServerSession(authOptions)
  const token = session?.user?.token;
  const detail = await getDetailAbt(token, uuid)
  console.log(detail)
  
  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Dashboard', href: '/admin' },
          { label: 'ABT', href: '/admin/abt' },
          { label: 'Detail', href: `/admin/abt/detail/${uuid}`, active: true }
        ]}
      />
      <h1 className="text-3xl font-bold tracking-tight">Detail Pengajuan ABT</h1>
      <div className="my-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>{detail?.office}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm font-semibold leading-none">Perihal</p>
                <p className="">{detail?.perihal}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold leading-none">Tanggal Pengajuan</p>
                <p className="">{detail?.created_at}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold leading-none">Status</p>
                <p className="">{detail?.status}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold leading-none">Brafaks</p>
                <DownloadAbt uuid={uuid} token={token}/>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" className="w-[96px]" asChild><Link href='/admin/abt'>Kembali</Link></Button>
                <UbahStatus uuid={uuid} token={token}/>
              </div>
            </div>
          </CardContent>
        </Card>  
      </div>
    </>
  );
}
