import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getFilesAbt, getDetailAbt } from "@/lib/service-admin";
import DownloadAbt from "@/components/admin/abt/detail/download-abt";
import { Button } from "@/components/ui/button";
import UbahStatus from "@/components/admin/abt/detail/ubah-status";
import Link from "next/link";
import { PdfViewer } from "./pdf-viewer";

export default async function SuspensePage({
  uuid,
  token,
}: {
  uuid: string;
  token: string;
}) {

  const detail = await getDetailAbt(token, uuid)
  console.log(detail)

  return (
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
          <PdfViewer uuid={uuid} token={token}/>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" className="w-[96px]" asChild><Link href='/admin/abt'>Kembali</Link></Button>
            <UbahStatus uuid={uuid} token={token}/>
          </div>
        </div>
      </CardContent>
    </Card>  
  );
}
