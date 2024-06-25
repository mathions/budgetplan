import { Card } from "@/components/ui/card";
import { getDetailAbt } from "@/services/admin";
import { PdfViewer } from "./pdf-viewer";
import { StatusAbt } from "@/components/status";

export default async function SuspensePage({ uuid, token, }: { uuid: string; token: string; }) {
  const detail = await getDetailAbt(token, uuid)

  return (
    <div className="space-y-12">
      <div className="border-t border-border h-[1px]"></div>
      <div className="space-y-6">
        <h4>Detail</h4>
        <Card className="p-8 space-y-2">
          <div className="space-y-1 mb-3">
            <p className="text-textweak">Perihal</p>
            <h5 className="font-semibold">{detail?.perihal}</h5>
          </div>
          <div className="grid grid-cols-3">
            <div className="col-span-1 space-y-1">
              <p className="text-textweak">Satuan Kerja</p>
              <p className="font-semibold">{detail?.office}</p>
            </div>
            <div className="col-span-1 space-y-1">
              <p className="text-textweak">Tanggal Pengajuan</p>
              <p className="font-semibold">{detail?.created_at}</p>
            </div>
            <div className="col-span-1 space-y-1">
              <p className="text-textweak">Status</p>
              <div className="flex"><StatusAbt statuss={detail?.status}/></div>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-textweak">Catatan</p>
            <p className="font-semibold">{detail?.note}</p>
          </div>
        </Card>
      </div>
      <div className="border-t border-border h-[1px]"></div>
      <div className="space-y-6">
        <h4>Dokumen Brafaks</h4>
        <Card className="p-8">
          <PdfViewer uuid={uuid} token={token} />
        </Card>
      </div>
    </div>
  );
}
