import { Card } from "@/components/ui/card"
import { getDetailAbt } from "@/lib/service-admin";
import { PdfViewer } from "./pdf-viewer";
import { StatusAbt } from "@/components/status";

export default async function SuspensePage({ uuid, token, }: { uuid: string; token: string; }) {
  const detail = await getDetailAbt(token, uuid)

  return (
    <Card className="p-8 space-y-6">
      <div className="space-y-3">
        <div className="flex justify-between">
          <div className="font-semibold text-xl text-textweak">{detail?.office}</div>
          <div className="w-fit"><StatusAbt statuss={detail?.status}/></div>
        </div>
        <h3>{detail?.perihal}</h3>
        <div className="text-textweak text-sm">{detail?.created_at}</div>
      </div>
      <PdfViewer uuid={uuid} token={token}/>
    </Card>  
  );
}
