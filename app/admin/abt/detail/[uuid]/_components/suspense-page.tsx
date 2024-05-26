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
    <Card className="p-8 space-y-6">
      <div className="space-y-2">
        <div>
          <div className="text-textweak">Perihal</div>
          <h4>{detail?.perihal}</h4>
        </div>
        <div>
          <div className="text-textweak">Perwakilan</div>
          <div className="font-semibold text-xl">{detail?.office}</div>
        </div>
        <div className="flex gap-12">
          <div>
            <div className="text-textweak">Status</div>
            <div className="font-semibold">{detail?.status}</div>
          </div>
          <div>
            <div className="text-textweak">Tanggal Pengajuan</div>
            <div className="font-semibold">{detail?.created_at}</div>
          </div>
        </div>
      </div>
      <PdfViewer uuid={uuid} token={token}/>
    </Card>  
  );
}
