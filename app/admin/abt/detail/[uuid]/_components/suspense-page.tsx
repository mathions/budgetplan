import { Card } from "@/components/ui/card"
import { getFilesAbt, getDetailAbt } from "@/lib/service-admin";
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
      <div className="space-y-4">
        <div>
          <div className="text-textweak">Perihal</div>
          <h3>{detail?.perihal}</h3>
        </div>
        <div className="flex gap-20">
          <div>
            <div className="text-textweak">Perwakilan</div>
            <div className="font-semibold">{detail?.office}</div>
          </div>
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
