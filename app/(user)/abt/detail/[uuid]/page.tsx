import { getServerSession } from "next-auth"
import { authOptions }from "@/app/api/auth/[...nextauth]/route"
import Breadcrumbs from "@/components/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getDetailAbt } from "@/lib/service";
import { Label } from "@/components/ui/label";
import DownloadAbt from "@/components/user/abt/detail/download-abt";

export default async function Detail({ params }: {params: { uuid: string } }) {
  const uuid = params.uuid;
  const session: any = await getServerSession(authOptions)
  const token = session?.user?.token;
  const perihal = await getDetailAbt(token, uuid)
  const path = perihal?.path
  console.log(perihal)
  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Beranda', href: '/beranda' },
          { label: 'ABT', href: '/abt' },
          { label: 'Detail', href: `/abt/detail/${uuid}`, active: true }
        ]}
      />
      <h1 className="text-3xl font-bold tracking-tight">Detail Pengajuan ABT</h1>
      <div className="my-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>{perihal?.office}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold leading-none">
                Perihal
              </p>
              <p className="">
                {perihal?.perihal}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold leading-none">
                Tanggal Pengajuan
              </p>
              <p className="">
                {perihal?.created_at}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold leading-none">
                Status
              </p>
              <p className="">
                {perihal?.status}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold leading-none">
                Brafaks
              </p>
              <Label></Label>
            </div>
            </div>
            <DownloadAbt uuid={uuid} token={token} path={path}/>
          </CardContent>
        </Card>  
      </div>
    </>
  );
}
