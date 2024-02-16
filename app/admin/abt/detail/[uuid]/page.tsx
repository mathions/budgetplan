import { getServerSession } from "next-auth"
import { authOptions }from "@/app/api/auth/[...nextauth]/route"
import Breadcrumbs from "@/components/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getBrafaksAbt, getDetailAbt } from "@/lib/service-admin";
import DownloadAbt from "@/components/admin/abt/detail/download-abt";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { CopyIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import UbahStatus from "@/components/admin/abt/detail/ubah-status";

export default async function Detail({ params }: {params: { uuid: string } }) {
  const uuid = params.uuid;
  const session: any = await getServerSession(authOptions)
  const token = session?.user?.token;
  const detail = await getDetailAbt(token, uuid)
  const str = detail?.status
  const status = str[0].toUpperCase() + str.slice(1)
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
              <p className="text-sm font-semibold leading-none">
                Perihal
              </p>
              <p className="">
                {detail?.perihal}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold leading-none">
                Tanggal Pengajuan
              </p>
              <p className="">
                {detail?.created_at}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold leading-none">
                Status
              </p>
              <p className="">
                {status}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold leading-none">
                Brafaks
              </p>
              <DownloadAbt uuid={uuid} token={token}/>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" className="w-[96px]">Kembali</Button>
              <UbahStatus/>
            </div>
            </div>
          </CardContent>
        </Card>  
      </div>
    </>
  );
}
