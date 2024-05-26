import { getDetailAbt } from "@/lib/service";
import { PdfViewer } from "./pdf-viewer";
import { Card } from "@/components/ui/card";

export default async function SuspensePage({ uuid, token, }: { uuid: string; token: string; }) {
  const detail = await getDetailAbt(token, uuid)
  console.log(detail)

  return (
    <Card className="p-8 space-y-6 ">
      <div className="space-y-2">
        <div>{detail?.status}</div>
        <h4>{detail?.perihal}</h4>
        <div className="text-textweak">{detail?.created_at}</div>
      </div>
      <PdfViewer uuid={uuid} token={token} />
    </Card>
  );
}
